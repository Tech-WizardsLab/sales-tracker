from db import get_db
from datetime import datetime

def get_all_proposals():
    db = get_db()
    cursor = db.execute("SELECT * FROM proposals ORDER BY date_created DESC")
    rows = cursor.fetchall()
    return [dict(row) for row in rows]


def add_proposal(data):
    db = get_db()

    category = data.get("category")
    proposal_amount = data.get("proposal_amount")
    closing_probability = data.get("closing_probability")
    submitted_date = data.get("date")  # ✅ Date sent from frontend

    # For Speaker category, ignore amount and probability
    if category == "Speaker":
        proposal_amount = None
        closing_probability = None

    # ✅ If frontend sends a date, insert it manually into `date_created`
    if submitted_date:
        db.execute("""
            INSERT INTO proposals (
                company_name, event_name, category,
                proposal_owner, proposal_amount, closing_probability,
                whats_included, status, date_created
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            data.get("company_name"),
            data.get("event_name"),
            category,
            data.get("proposal_owner"),
            proposal_amount,
            closing_probability,
            data.get("whats_included"),
            data.get("status", "New"),
            submitted_date  # ✅ Store the provided date
        ))
    else:
        # ✅ Fallback to automatic timestamp (default CURRENT_TIMESTAMP)
        db.execute("""
            INSERT INTO proposals (
                company_name, event_name, category,
                proposal_owner, proposal_amount, closing_probability,
                whats_included, status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            data.get("company_name"),
            data.get("event_name"),
            category,
            data.get("proposal_owner"),
            proposal_amount,
            closing_probability,
            data.get("whats_included"),
            data.get("status", "New")
        ))

    db.commit()
    return {"message": "Proposal added successfully"}


def update_proposal(proposal_id, data):
    db = get_db()

    category = data.get("category")
    proposal_amount = data.get("proposal_amount")
    closing_probability = data.get("closing_probability")
    updated_date = data.get("date")  # ✅ Optional updated date

    if category == "Speaker":
        proposal_amount = None
        closing_probability = None

    db.execute("""
        UPDATE proposals SET
            company_name = ?,
            event_name = ?,
            category = ?,
            proposal_owner = ?,
            proposal_amount = ?,
            closing_probability = ?,
            whats_included = ?,
            status = ?,
            date_created = ?
        WHERE id = ?
    """, (
        data.get("company_name"),
        data.get("event_name"),
        category,
        data.get("proposal_owner"),
        proposal_amount,
        closing_probability,
        data.get("whats_included"),
        data.get("status", "New"),
        updated_date or datetime.now().strftime("%Y-%m-%d"),  # ✅ Set or refresh date
        proposal_id
    ))

    db.commit()
    return {"message": "Proposal updated successfully"}


def delete_proposal(proposal_id):
    db = get_db()
    db.execute("DELETE FROM proposals WHERE id = ?", (proposal_id,))
    db.commit()
    return {"message": "Proposal deleted successfully"}
