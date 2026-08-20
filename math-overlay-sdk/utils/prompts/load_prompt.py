
def load_prompt(what_prompt):
    with open(f"{what_prompt}.txt", "r", encoding="utf-8") as f:
        return f.read()
    
