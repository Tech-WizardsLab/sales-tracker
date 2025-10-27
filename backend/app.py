# /workspaces/sales-tracker/backend/app.py
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

from routes.proposal_routes import proposal_bp
from db import init_db

# Load environment variables
load_dotenv()

app = Flask(__name__)

# ✅ Configure CORS properly for all valid frontends (Vercel, Render, Codespaces, local)
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "https://sales-tracker-rho.vercel.app",  # ✅ Main Vercel frontend
            "https://sales-tracker-git-main-tech-wizardslabs-projects.vercel.app",  # ✅ Backup Vercel preview
            "https://uncanny-coffin-jjq64jjw9vqx3p5xr-3000.app.github.dev",  # ✅ GitHub Codespaces frontend
            "https://uncanny-coffin-jjq64jjw9vqx3p5xr-5000.app.github.dev",  # ✅ GitHub Codespaces backend
            "http://localhost:3000",  # ✅ Local dev frontend
            "http://127.0.0.1:3000"   # ✅ Local dev alt
        ]
    }
})

# ✅ Register proposal routes under /api/proposals
app.register_blueprint(proposal_bp, url_prefix="/api/proposals")

# ✅ Initialize the database
init_db(app)

@app.route("/")
def home():
    return {"message": "Sales Tracker API is running 🚀"}

if __name__ == "__main__":
    # ✅ Run Flask app on all interfaces (important for Render & Codespaces)
    app.run(host="0.0.0.0", port=5000, debug=True)
