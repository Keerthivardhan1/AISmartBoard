import logging
from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import JSONResponse
from google.genai.errors import ServerError, ClientError, APIError
from gemini import invoke_gemini_with_text

logger = logging.getLogger(__name__)
ChatRouter = APIRouter()

@ChatRouter.post("/ask")
async def ask_question(request: Request):
    try:
        logger.info("Received request at /ask endpoint.")
        data = await request.json()
        question = data.get("question")

        logger.info(f"Question received: {question}")

        if not question:
            raise HTTPException(
                status_code=400,
                detail="Missing 'question' in request body."
            )
        
        ai_response = invoke_gemini_with_text(question, "aiChat")

        logger.info(f"AI Response: {ai_response}")
       
        answer = f"This feature is under development.\n{ai_response}"

        return {"answer": answer}

    # except HTTPException:
    #     # Re-raise explicit HTTP exceptions without logging twice
    #     raise         
    except ServerError as e:
        # Gracefully handles 503 Overloaded or 500 Google side errors
        logger.warning(f"Gemini service unavailable: {e}")
        raise HTTPException(
            status_code=503,
            detail="The AI model is currently experiencing high demand. Please try again shortly."
        )
    except ClientError as e:
        # Handles 400 invalid model names or bad parameters
        logger.error(f"Invalid request sent to Gemini API: {e}")
        raise HTTPException(
            status_code=400,
            detail="Invalid request to AI service."
        )
    except Exception as e:
        # Fixed string formatting in logger call
        logger.exception(f"Unexpected error in /ask: {e}")
        raise HTTPException(
            status_code=500,
            detail="Internal server error"
        )