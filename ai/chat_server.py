from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

app = FastAPI(title="Indra Personal AI")

# CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
MODEL_NAME = "microsoft/phi-3-mini-4k-instruct"

print("Loading AI model...")
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForCausalLM.from_pretrained(MODEL_NAME)
model.eval()
print("Model loaded successfully.")

# Conversation memory
conversation_history = []

# Request schema
class ChatRequest(BaseModel):
    message: str

# Response schema
class ChatResponse(BaseModel):
    reply: str

@app.get("/")
def root():
    return {"status": "Indra AI Server Running"}

@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    global conversation_history

    user_message = req.message.strip()
    conversation_history.append(f"User: {user_message}")

    # Keep last 6 messages only
    conversation_history = conversation_history[-6:]

    # AI personality prompt
    prompt = (
    "You are Indra AI, a smart, friendly personal assistant for Indrajeet Gangawane.\n"
    "You answer casually, clearly and accurately.\n"
    "You only talk about Indra when asked.\n"
    "You are confident, helpful and modern.\n\n"
)


    inputs = tokenizer(prompt, return_tensors="pt")

    with torch.no_grad():
        outputs = model.generate(
            **inputs,
            max_new_tokens=120,
            do_sample=True,
            temperature=0.7,
            top_p=0.9,
            repetition_penalty=1.2
        )

    decoded = tokenizer.decode(outputs[0], skip_special_tokens=True)

    # Extract only AI reply
    reply = decoded.split("AI:")[-1].strip()

    conversation_history.append(f"AI: {reply}")

    return {"reply": reply}
