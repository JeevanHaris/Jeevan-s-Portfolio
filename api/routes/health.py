from fastapi import APIRouter
from api.config import settings
from api.models import HealthCheckResponse

router = APIRouter(prefix="/health", tags=["Health"])

@router.get("", response_model=HealthCheckResponse)
async def health_check():
    """Returns the operational status of the FastAPI backend."""
    return HealthCheckResponse(
        status="online",
        app_name=settings.APP_NAME,
        version=settings.APP_VERSION,
        environment=settings.ENVIRONMENT
    )
