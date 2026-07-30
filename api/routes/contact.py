import logging
from fastapi import APIRouter, HTTPException, status
from ..models import ContactMessage, ContactResponse

logger = logging.getLogger("uvicorn.error")

router = APIRouter(prefix="/contact", tags=["Contact"])

@router.post("", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
async def send_contact_message(payload: ContactMessage):
    """
    Handle contact form submission.
    Validates name, email, subject, and message using Pydantic.
    """
    try:
        logger.info(f"Received contact message from {payload.name} ({payload.email}): {payload.subject}")
        return ContactResponse(
            success=True,
            message=f"Thank you, {payload.name}! Your message has been received successfully.",
            data=payload
        )
    except Exception as e:
        logger.error(f"Error handling contact submission: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while processing your message."
        )
