import sqlite3
from flask import g

DATABASE = 'proposals.db'

def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(DATABASE)
        g.db.row_factory = sqlite3.Row
    return g.db

def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()

def init_db(app):
    with app.app_context():
        db = get_db()
        cursor = db.cursor()

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS proposals (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                company_name TEXT NOT NULL,
                event_name TEXT NOT NULL,
                category TEXT NOT NULL,
                proposal_owner TEXT NOT NULL,
                proposal_amount REAL,
                closing_probability INTEGER,
                whats_included TEXT,
                status TEXT DEFAULT 'New',
                date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        db.commit()

    app.teardown_appcontext(close_db)
