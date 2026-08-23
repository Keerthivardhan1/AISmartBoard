import time
import uuid
import json
import logging

from fastapi import (
    APIRouter,
    File,
    UploadFile,
    Header,
    Response,
    Request,
    HTTPException,
)

from gemini import invoke_gemini
from utils.dbUtils.storage import upload_image
from utils.dbUtils.db import insert_request_metadata, getAllEquations
from google.genai.errors import ServerError

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/equation")
async def generate_graph(
    request: Request,
    response: Response,
    image: UploadFile = File(...),
    x_user_id: str | None = Header(default=None),
):
    start_time = time.perf_counter()

    try:
        if image is None:
            raise HTTPException(
                status_code=400,
                detail="Image is required."
            )

        logger.info(f"Received request from user: {x_user_id}")
        logger.info(image.filename)
        logger.info(image.content_type)

        image_bytes = await image.read()

        session_id = request.cookies.get("session_id")
        logger.info(f"Session ID from cookie: {session_id}")

        if session_id is None:
            logger.info("No session_id cookie found. Generating a new session_id.")
            session_id = str(uuid.uuid4())

            response.set_cookie(
                key="session_id",
                value=session_id,
                httponly=True,
                max_age=1800,
                samesite="lax",
                secure=False,
            )

        logger.info(
            f"""
            User ID    : {x_user_id}
            Session ID : {session_id}
            """
        )

        image_url = upload_image(
            image_bytes,
            image.content_type,
        )

        # Actual Gemini call
        res = invoke_gemini(image_bytes)

        # res = {
        #     "text": "ok"
        # }

        latency_ms = int((time.perf_counter() - start_time) * 1000)

        insert_request_metadata(
            session_id=session_id,
            endpoint="/equation",
            image_url=image_url,
            request_body={},
            response_body=res,
            status_code=200,
            latency_ms=latency_ms,
        )

        return res

    except ServerError as e:
        # Gracefully handles 503 Overloaded or 500 Google side errors
        logger.warning(f"Gemini service unavailable: {e}")
        insert_request_metadata(
            session_id=session_id if "session_id" in locals() else None,
            endpoint="/equation",
            image_url=None,
            request_body={},
            response_body={"error": str(e)},
            status_code=500,
            latency_ms=latency_ms,
        )
        raise HTTPException(
            status_code=503,
            detail="The AI model is currently experiencing high demand. Please try again shortly."
        )

    except HTTPException:
        raise

    except Exception as e:
        latency_ms = int((time.perf_counter() - start_time) * 1000)

        logger.error(f"Error processing request for user {x_user_id}: {e}")

        insert_request_metadata(
            session_id=session_id if "session_id" in locals() else None,
            endpoint="/equation",
            image_url=None,
            request_body={},
            response_body={"error": str(e)},
            status_code=500,
            latency_ms=latency_ms,
        )

        raise HTTPException(
            status_code=500,
            detail="Internal Server Error",
        )
    
@router.get("/equations")
async def getEquations(x_user_id: str | None = Header(default=None),):
    """
    Docstring for getEquations
    
    :param userid: 

    returns all the equations created/generated userid
    """

    try:
        equations = getAllEquations(x_user_id)
        return equations
    except Exception as e :
        logger.exception(f"Error fetching equations for user_id {x_user_id} : {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Unable to fetch equations : {e.message}"
        )
    


