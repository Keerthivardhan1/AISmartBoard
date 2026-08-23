from supabase import create_client, Client
from dotenv import load_dotenv
import os
import logging
from uuid import UUID

load_dotenv()
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

logger = logging.getLogger(__name__)

supabase: Client = create_client(
    os.environ.get("SUPABASE_URL"),
    os.environ.get("SUPABASE_KEY")
)



def insert_user_session(user_id, session_id):
    logger.info(f"Upserting user session: user_id={user_id}, session_id={session_id}")
    supabase.table("Sessions").upsert(
        {
            "user_id": user_id,
            "session_id": session_id,
        },
        on_conflict="user_id,session_id",
    ).execute()

def insert_request_metadata(session_id, endpoint, image_url, request_body, response_body, status_code , latency_ms):
    logger.info(f"Inserting request metadata: session_id={session_id}, endpoint={endpoint}")
    supabase.table("Requests").insert({
        "session_id": session_id,
        "endpoint": endpoint,
        "image_url": image_url,
        "request_body": request_body,
        "response_body": response_body,
        "status_code": status_code,
        "latency_ms": latency_ms,
    }).execute()

def getAllEquations(user_id):
    """
    Docstring for getAllEquations
    
    :param user_id: Description

    1. get all the section_id using user_id from Sessions table
    2. user those session_ids to fetch all the equations

    """
    logger.info(f"Fetching all the equations created by user : {user_id}")

    logger.info("fectching all the sessions")

    if isinstance(user_id, str):
        user_id = UUID(user_id)

    sessions = (
        supabase.table("Sessions")
        .select("session_id")
        .eq("user_id" , user_id)
        .limit(10)
        .execute()
    )

    session_ids = ([obj['session_id'] for obj in sessions.data])

    logger.info(f"fetched {len(session_ids)} sessions")

    if not session_ids:
        logger.info("Returning [] as there are no sessions")
        return []
    


    response = (
        supabase.table("Requests")
        .select("response_body")
        .in_("session_id" , session_ids)
        .order("id" , desc=True)
        .execute()
    )
    response_bodies = [row["response_body"] for row in response.data]
    equations = [ obj['latex'] for obj in response_bodies if 'latex' in obj]

    logger.info(f"fetched {len(equations)} equations")
    return equations

if __name__ == '__main__':
    user_id = "5fb3252e-24b9-41e8-8e2d-9be5a4651dc7"
    logger.info("Testing getAllEquations")
    equations = getAllEquations(user_id)
    logger.info(f"fetched equations : {equations}")