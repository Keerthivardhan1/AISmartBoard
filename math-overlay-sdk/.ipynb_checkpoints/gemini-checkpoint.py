from google import genai
from google.genai import types

from config import GEMINI_API_KEY
from utils.prompt import load_prompt

client = genai.Client(api_key=GEMINI_API_KEY)


def invoke_gemini(image_bytes: bytes):
    prompt = load_prompt("generateGraph.txt")

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[
            prompt,
            types.Part.from_bytes(
                data=image_bytes,
                mime_type="image/png",
            ),
        ],
        config=types.GenerateContentConfig(
            response_mime_type="application/json"
        ),
    )

    return response.text
