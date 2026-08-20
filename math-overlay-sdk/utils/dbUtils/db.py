from supabase import create_client, Client
from dotenv import load_dotenv
import os

load_dotenv()


supabase: Client = create_client(
    os.environ.get("SUPABASE_URL"),
    os.environ.get("SUPABASE_KEY")
)



def insert_user_session(user_id, session_id):
    print(f"Upserting user session: user_id={user_id}, session_id={session_id}")
    supabase.table("Sessions").upsert(
        {
            "user_id": user_id,
            "session_id": session_id,
        },
        on_conflict="user_id,session_id",
    ).execute()

def insert_request_metadata(session_id, endpoint, image_url, request_body, response_body, status_code , latency_ms):
    print(f"Inserting request metadata: session_id={session_id}, endpoint={endpoint}")
    supabase.table("Requests").insert({
        "session_id": session_id,
        "endpoint": endpoint,
        "image_url": image_url,
        "request_body": request_body,
        "response_body": response_body,
        "status_code": status_code,
        "latency_ms": latency_ms,
    }).execute()