from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.config import settings
from api.routes import health, profile, projects, skills, contact

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="FastAPI Backend for Jeevan Haris Portfolio website",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Routers under both /api and / for maximum deployment flexibility
# (e.g. Vercel Serverless /api/(.*) vs standalone container)
for prefix in ["/api", ""]:
    app.include_router(health.router, prefix=prefix)
    app.include_router(profile.router, prefix=prefix)
    app.include_router(projects.router, prefix=prefix)
    app.include_router(skills.router, prefix=prefix)
    app.include_router(contact.router, prefix=prefix)

@app.get("/")
async def root():
    return {
        "status": "online",
        "message": f"Welcome to {settings.APP_NAME}",
        "docs": "/docs",
        "version": settings.APP_VERSION
    }
