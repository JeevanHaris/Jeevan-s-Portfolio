from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "FastAPI backend is running"}

@app.get("/profiles")
async def profiles():
    return {
        "linkedin": "https://www.linkedin.com/in/jeevanharis",
        "github": "https://github.com/JeevanHaris",
        "instagram": "https://www.instagram.com/jeevan_haris",
    }
