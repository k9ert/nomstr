import logging
import pytest
from flask import Flask
from flask_sqlalchemy import SQLAlchemy


logger = logging.getLogger(__name__)

@pytest.fixture()
def app_for_db():
    logging.basicConfig(encoding='utf-8', level=logging.DEBUG)

    logger = logging.getLogger(__name__)

    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
    app.db = SQLAlchemy()
    app.app_context().push()
    app.db.init_app(app)

    
    app.db.create_all()
    return app