from typing import List
from fastapi import APIRouter
from ..models import SkillItem

router = APIRouter(prefix="/skills", tags=["Skills"])

PORTFOLIO_SKILLS: List[SkillItem] = [
    SkillItem(
        num="01",
        name="AI & LLM Integration",
        desc="Building AI-powered tools with the Groq API, hybrid command engines, and intelligent fallback systems."
    ),
    SkillItem(
        num="02",
        name="Full-Stack Web Development",
        desc="Responsive, end-to-end applications using Flask, FastAPI, HTML5, CSS3, and JavaScript."
    ),
    SkillItem(
        num="03",
        name="Backend & API Development",
        desc="REST APIs, SQLite-backed data models, and Postman-tested backend systems."
    ),
    SkillItem(
        num="04",
        name="Cross-Stack Problem Solving",
        desc="Parallel builds across Python and Java (e.g. Flask vs. Spring Boot), reinforcing adaptable engineering fundamentals."
    ),
    SkillItem(
        num="05",
        name="Data Structures & Core CS",
        desc="Strong grounding in Data Structures, Algorithms, and Database Management from coursework and competitive coding."
    )
]

@router.get("", response_model=List[SkillItem])
async def get_skills():
    """Retrieve list of technical skills."""
    return PORTFOLIO_SKILLS
