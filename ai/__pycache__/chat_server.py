from fastapi import FastAPI
from pydantic import BaseModel
from ai.model_config import MODEL_NAME
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

device = "cuda" if torch.cuda.is_available() else "cpu"
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForCausalLM.from_pretrained(
    MODEL_NAME,
    device_map="auto",
    torch_dtype=torch.float16 if device == "cuda" else torch.float32
)
model.eval()


# ----------------------------
# Load Personal Knowledge
# ----------------------------
with open("data/indra_knowledge.txt", "r", encoding="utf-8") as f:
    knowledge = f.read()

# ----------------------------
# Request Schema
# ----------------------------
class ChatRequest(BaseModel):
    message: str

# ----------------------------
# Chat Endpoint
# ----------------------------
@app.post("/chat")
def chat(req: ChatRequest):

    prompt = f"""
You are Indra AI, a personal assistant for Indra.

Use only the information below to answer.

Indra Profile:
{knowledge}

User: {req.message}
AI:
"""

    inputs = tokenizer(prompt, return_tensors="pt").to(device)

    with torch.no_grad():
        output = model.generate(
            **inputs,
            max_new_tokens=180,
            temperature=0.6,
            top_p=0.9,
            do_sample=True,
            repetition_penalty=1.1,
            pad_token_id=tokenizer.eos_token_id
        )

    decoded = tokenizer.decode(output[0], skip_special_tokens=True)

    if "AI:" in decoded:
        answer = decoded.split("AI:")[-1].strip()
    else:
        answer = decoded.strip()

    if len(answer) < 5:
        answer = "I'm Indra's personal AI assistant. Ask me anything about Indra."

    return {"reply": answer}
