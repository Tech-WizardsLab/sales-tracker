from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

from routes.proposal_routes import proposal_bp
from db import init_db

# Load environment variables
load_dotenv()

app = Flask(__name__)

# ✅ Configure CORS properly for GitHub Codespaces
# Replace these URLs with your actual Codespaces URLs if they change
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "https://uncanny-coffin-jjq64jjw9vqx3p5xr-3000.app.github.dev",
            "https://uncanny-coffin-jjq64jjw9vqx3p5xr-5000.app.github.dev"
        ]
    }
})

# Register the proposal routes
app.register_blueprint(proposal_bp, url_prefix="/api/proposals")

# Initialize the database
init_db(app)

@app.route("/")
def home():
    return {"message": "Sales Tracker API is running 🚀"}

if __name__ == "__main__":
    # Run the Flask app on all interfaces (important for Codespaces)
    app.run(host="0.0.0.0", port=5000, debug=True)
