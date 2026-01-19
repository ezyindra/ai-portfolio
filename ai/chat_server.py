from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForCausalLM
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

model_name = "distilgpt2"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

# Store conversation memory
conversation_history = []

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(req: ChatRequest):
    conversation_history.append(f"User: {req.message}")

    prompt = "You are Indra AI, a personal assistant for Indra.\n"
    prompt += "\n".join(conversation_history[-6:])  # last 6 messages
    prompt += "\nAI:"

    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(**inputs, max_new_tokens=150)
    reply = tokenizer.decode(outputs[0], skip_special_tokens=True)

    conversation_history.append(f"AI: {reply}")

    return {"reply": reply}
