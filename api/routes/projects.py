from typing import List
from fastapi import APIRouter
from ..models import ProjectItem

router = APIRouter(prefix="/projects", tags=["Projects"])

PORTFOLIO_PROJECTS: List[ProjectItem] = [
    ProjectItem(
        id="aria-assistant",
        num="01",
        title="ARIA – AI Voice Desktop Assistant",
        category="AI Assistant",
        desc="A local-first, voice-controlled desktop assistant with speech recognition and text-to-speech. Runs a hybrid command engine with 54+ regex-matched commands and an AI fallback powered by the Groq API.",
        tech="Python • Flask • JavaScript • Web Speech API • Groq API",
        github_url="https://github.com/JeevanHaris",
        gradientClass="from-[#4A00E0] to-[#8E2DE2]"
    ),
    ProjectItem(
        id="dialysis-system",
        num="02",
        title="Dialysis Management System",
        category="Health-Tech",
        desc="A Flask-based web application to manage dialysis patients, treatment records, and scheduling — with patient-record and session-tracking modules.",
        tech="Python • Flask • HTML • CSS • SQLite • JavaScript",
        github_url="https://github.com/JeevanHaris",
        gradientClass="from-[#00c6ff] to-[#0072ff]"
    ),
    ProjectItem(
        id="disaster-aggregation",
        num="03",
        title="Disaster Aggregation System",
        category="Social Impact / Data",
        desc="A web dashboard that aggregates and displays real-time disaster data from multiple sources for faster situational awareness during emergencies.",
        tech="Python • Flask • HTML • CSS",
        github_url="https://github.com/JeevanHaris",
        gradientClass="from-[#f12711] to-[#f5af19]"
    )
]

@router.get("", response_model=List[ProjectItem])
async def get_projects():
    """Retrieve list of portfolio projects."""
    return PORTFOLIO_PROJECTS

@router.get("/{project_id}", response_model=ProjectItem)
async def get_project(project_id: str):
    """Retrieve a specific project by ID."""
    for project in PORTFOLIO_PROJECTS:
        if project.id == project_id:
            return project
    return PORTFOLIO_PROJECTS[0]
