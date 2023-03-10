import logging
import pytest
import json
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import pathlib
import os

logger = logging.getLogger(__name__)


@pytest.fixture(scope="session")
def app_for_db():

    logging.basicConfig(encoding="utf-8", level=logging.DEBUG)

    logger = logging.getLogger(__name__)

    app = Flask(__name__)
    pathlib.Path("instance/test_test.db").unlink(missing_ok=True)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///test_test.db"
    app.db = SQLAlchemy()

    with app.app_context():
        app.db.init_app(app)
        from ..db.definitions import Bookmark, fill_database

        app.db.create_all()

        if not Bookmark.query.all():
            with open("nomstr/tests/data.json", "r") as f:
                data = json.load(f)
            fill_database(app.db.session, data)
    return app
