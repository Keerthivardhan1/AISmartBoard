from fastapi import (
    FastAPI,
    Header,
    Request,
    Response,
    HTTPException,
)

import uuid

from routers.equation import router
from fastapi.middleware.cors import CORSMiddleware
from utils.dbUtils.db import insert_user_session

SESSION_TIMEOUT_SECONDS = 30 * 60 #30mins

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/start-session")
async def start_user(
    request: Request,
    response: Response,
    x_user_id: str | None = Header(default=None),
):
    """
    This function starts the session 
    
    :param request: Description
    :type request: Request
    :param response: Description
    :type response: Response
    :param x_user_id: user id
    :type x_user_id: str | None


    """
    if x_user_id is None:
        raise HTTPException(
            status_code=400,
            detail="Missing x-user-id header."
        )

    session_id = request.cookies.get("session_id")

    if session_id is None:
        session_id = str(uuid.uuid4())

        response.set_cookie(
            key="session_id",
            value=session_id,
            httponly=True,
            max_age=SESSION_TIMEOUT_SECONDS,
            samesite="lax",
            secure=False,  # set to True in production with HTTPS
        )
    print(f"{x_user_id}:{session_id}")
    insert_user_session(
        user_id=x_user_id,
        session_id=session_id,
    )

    return {
        "message": "Session started",
        "user_id": x_user_id,
        "session_id": session_id,
    }


app.include_router(router)