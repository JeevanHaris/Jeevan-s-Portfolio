from typing import List, Optional
from pydantic import BaseModel, EmailStr, Field

class SocialLinks(BaseModel):
    linkedin: str = "https://www.linkedin.com/in/jeevanharis"
    github: str = "https://github.com/JeevanHaris"
    instagram: str = "https://www.instagram.com/jeevan_haris"

class ProfileInfo(BaseModel):
    name: str = "Jeevan Haris"
    title: str = "Computer Science Engineering Student & Full-Stack AI Developer"
    bio: str = (
        "Third-year Computer Science Engineering student with hands-on experience across "
        "Flask, FastAPI, and full-stack web development. Passionate about building AI-integrated tools, "
        "health-tech systems, and data dashboards."
    )
    achievements: List[str] = [
        "2nd Prize – Code Hunt, NIT",
        "Top 5 – CKD Care Planner Hackathon",
        "CCNA Certified",
        "IBM AI Foundations"
    ]
    socials: SocialLinks = Field(default_factory=SocialLinks)

class ProjectItem(BaseModel):
    id: str
    num: str
    title: str
    category: str
    desc: str
    tech: str
    github_url: str = "https://github.com/JeevanHaris"
    live_url: Optional[str] = None
    gradientClass: str

class SkillItem(BaseModel):
    num: str
    name: str
    desc: str

class ContactMessage(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, example="John Doe")
    email: str = Field(..., example="john@example.com")
    subject: Optional[str] = Field("Portfolio Inquiry", max_length=150)
    message: str = Field(..., min_length=5, max_length=2000, example="Hello Jeevan, let's collaborate!")

class ContactResponse(BaseModel):
    success: bool
    message: str
    data: Optional[ContactMessage] = None

class HealthCheckResponse(BaseModel):
    status: str
    app_name: str
    version: str
    environment: str
