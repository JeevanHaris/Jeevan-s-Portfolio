import os
import uvicorn

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    reload = os.getenv("ENVIRONMENT", "development") == "development"
    
    print(f"Starting FastAPI server on http://{host}:{port}...")
    uvicorn.run("api.index:app", host=host, port=port, reload=reload)
