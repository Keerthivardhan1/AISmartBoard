from pathlib import Path

PROMPT_DIR = Path(__file__).parent


def load_prompt(what_prompt):
    prompt_path = PROMPT_DIR / f"{what_prompt}.txt"
    with open(prompt_path, "r", encoding="utf-8") as f:
        return f.read()
    


if __name__ == "__main__":
    prompt = load_prompt("aiChat")
    print(prompt)