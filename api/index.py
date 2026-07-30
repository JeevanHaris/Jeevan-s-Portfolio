import os
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS

# ---------------------------------------------------------------------------
# App setup
# ---------------------------------------------------------------------------

app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": "*"}})

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

APP_NAME = "Jeevan Haris Portfolio API"
APP_VERSION = "1.0.0"
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")

# ---------------------------------------------------------------------------
# Data
# ---------------------------------------------------------------------------

PROFILE = {
    "name": "Jeevan Haris",
    "title": "Computer Science Engineering Student & Full-Stack AI Developer",
    "bio": (
        "Third-year Computer Science Engineering student with hands-on experience across "
        "Flask, FastAPI, and full-stack web development. Passionate about building AI-integrated tools, "
        "health-tech systems, and data dashboards."
    ),
    "achievements": [
        "2nd Prize – Code Hunt, NIT",
        "Top 5 – CKD Care Planner Hackathon",
        "CCNA Certified",
        "IBM AI Foundations",
    ],
    "socials": {
        "linkedin": "https://www.linkedin.com/in/jeevanharis",
        "github": "https://github.com/JeevanHaris",
        "instagram": "https://www.instagram.com/jeevan_haris",
    },
}

PROJECTS = [
    {
        "id": "aria-assistant",
        "num": "01",
        "title": "ARIA – AI Voice Desktop Assistant",
        "category": "AI Assistant",
        "desc": (
            "A local-first, voice-controlled desktop assistant with speech recognition and "
            "text-to-speech. Runs a hybrid command engine with 54+ regex-matched commands "
            "and an AI fallback powered by the Groq API."
        ),
        "tech": "Python • Flask • JavaScript • Web Speech API • Groq API",
        "github_url": "https://github.com/JeevanHaris",
        "live_url": None,
        "gradientClass": "from-[#4A00E0] to-[#8E2DE2]",
    },
    {
        "id": "dialysis-system",
        "num": "02",
        "title": "Dialysis Management System",
        "category": "Health-Tech",
        "desc": (
            "A Flask-based web application to manage dialysis patients, treatment records, "
            "and scheduling — with patient-record and session-tracking modules."
        ),
        "tech": "Python • Flask • HTML • CSS • SQLite • JavaScript",
        "github_url": "https://github.com/JeevanHaris",
        "live_url": None,
        "gradientClass": "from-[#00c6ff] to-[#0072ff]",
    },
    {
        "id": "disaster-aggregation",
        "num": "03",
        "title": "Disaster Aggregation System",
        "category": "Social Impact / Data",
        "desc": (
            "A web dashboard that aggregates and displays real-time disaster data from multiple "
            "sources for faster situational awareness during emergencies."
        ),
        "tech": "Python • Flask • HTML • CSS",
        "github_url": "https://github.com/JeevanHaris",
        "live_url": None,
        "gradientClass": "from-[#f12711] to-[#f5af19]",
    },
]

SKILLS = [
    {
        "num": "01",
        "name": "AI & LLM Integration",
        "desc": "Building AI-powered tools with the Groq API, hybrid command engines, and intelligent fallback systems.",
    },
    {
        "num": "02",
        "name": "Full-Stack Web Development",
        "desc": "Responsive, end-to-end applications using Flask, FastAPI, HTML5, CSS3, and JavaScript.",
    },
    {
        "num": "03",
        "name": "Backend & API Development",
        "desc": "REST APIs, SQLite-backed data models, and Postman-tested backend systems.",
    },
    {
        "num": "04",
        "name": "Cross-Stack Problem Solving",
        "desc": "Parallel builds across Python and Java (e.g. Flask vs. Spring Boot), reinforcing adaptable engineering fundamentals.",
    },
    {
        "num": "05",
        "name": "Data Structures & Core CS",
        "desc": "Strong grounding in Data Structures, Algorithms, and Database Management from coursework and competitive coding.",
    },
]

# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

@app.route("/api", methods=["GET"])
def api_root():
    return jsonify({
        "status": "online",
        "message": f"Welcome to {APP_NAME}",
        "version": APP_VERSION,
    })


@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({
        "status": "online",
        "app_name": APP_NAME,
        "version": APP_VERSION,
        "environment": ENVIRONMENT,
    })


@app.route("/api/profile", methods=["GET"])
def get_profile():
    return jsonify(PROFILE)


@app.route("/api/profiles", methods=["GET"])
def get_profiles():
    """Backward-compatible endpoint returning social links."""
    return jsonify(PROFILE["socials"])


@app.route("/api/projects", methods=["GET"])
def get_projects():
    return jsonify(PROJECTS)


@app.route("/api/projects/<project_id>", methods=["GET"])
def get_project(project_id):
    for project in PROJECTS:
        if project["id"] == project_id:
            return jsonify(project)
    # fallback to first project
    return jsonify(PROJECTS[0])


@app.route("/api/skills", methods=["GET"])
def get_skills():
    return jsonify(SKILLS)


@app.route("/api/contact", methods=["POST"])
def send_contact_message():
    data = request.get_json(silent=True) or {}

    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    subject = (data.get("subject") or "Portfolio Inquiry").strip()
    message = (data.get("message") or "").strip()

    # Basic validation
    errors = {}
    if len(name) < 2:
        errors["name"] = "Name must be at least 2 characters."
    if not email or "@" not in email:
        errors["email"] = "A valid email address is required."
    if len(message) < 5:
        errors["message"] = "Message must be at least 5 characters."

    if errors:
        return jsonify({"success": False, "errors": errors}), 400

    logger.info("Contact form submission from %s (%s): %s", name, email, subject)

    return jsonify({
        "success": True,
        "message": f"Thank you, {name}! Your message has been received successfully.",
        "data": {
            "name": name,
            "email": email,
            "subject": subject,
            "message": message,
        },
    }), 201


# ---------------------------------------------------------------------------
# Local dev runner
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    debug = ENVIRONMENT == "development"
    print(f"Starting Flask server on http://0.0.0.0:{port} …")
    app.run(host="0.0.0.0", port=port, debug=debug)
