from flask import Blueprint, request, jsonify
from db import get_db
from controllers.proposal_controller import (
    get_all_proposals,
    add_proposal,
    update_proposal,
    delete_proposal
)

proposal_bp = Blueprint("proposal_bp", __name__)

@proposal_bp.route("/", methods=["GET"])
def list_proposals():
    return jsonify(get_all_proposals())

@proposal_bp.route("/", methods=["POST"])
def create_proposal():
    data = request.get_json()
    return jsonify(add_proposal(data))

@proposal_bp.route("/<int:proposal_id>", methods=["PUT"])
def edit_proposal(proposal_id):
    data = request.get_json()
    return jsonify(update_proposal(proposal_id, data))

@proposal_bp.route("/<int:proposal_id>", methods=["DELETE"])
def remove_proposal(proposal_id):
    return jsonify(delete_proposal(proposal_id))
