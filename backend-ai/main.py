# backend-ai/main.py
from fastapi import FastAPI

app = FastAPI(title="Kyra AI Backend")


@app.get("/")
def read_root():
    return {"message": "Hello dari Otak AI Kyra! 🧠"}
