from db import get_db

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

    # For Speaker category, we ignore amount and probability
    if category == "Speaker":
        proposal_amount = None
        closing_probability = None

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
            status = ?
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
        proposal_id
    ))

    db.commit()
    return {"message": "Proposal updated successfully"}

def delete_proposal(proposal_id):
    db = get_db()
    db.execute("DELETE FROM proposals WHERE id = ?", (proposal_id,))
    db.commit()
    return {"message": "Proposal deleted successfully"}
