from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

app = FastAPI()

model_name = "distilgpt2"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

# Load your personal knowledge
with open("data/indra_knowledge.txt", "r", encoding="utf-8") as f:
    knowledge = f.read()

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(req: ChatRequest):
    prompt = f"""
You are Indra AI, a personal assistant for Indra.

Here is information about Indra:
{knowledge}

User: {req.message}
AI:
"""

    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(
        **inputs,
        max_new_tokens=150,
        temperature=0.7,
        do_sample=True
    )

    reply = tokenizer.decode(outputs[0], skip_special_tokens=True)
    answer = reply.split("AI:")[-1].strip()

    return {"reply": answer}
