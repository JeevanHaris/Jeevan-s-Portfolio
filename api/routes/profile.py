from fastapi import APIRouter
from ..models import ProfileInfo, SocialLinks

router = APIRouter(tags=["Profile"])

@router.get("/profile", response_model=ProfileInfo)
async def get_profile():
    """Retrieve full portfolio owner profile details."""
    return ProfileInfo()

@router.get("/profiles", response_model=dict)
async def get_profiles():
    """Backward-compatible endpoint returning social media links dictionary."""
    socials = SocialLinks()
    return {
        "linkedin": socials.linkedin,
        "github": socials.github,
        "instagram": socials.instagram
    }
