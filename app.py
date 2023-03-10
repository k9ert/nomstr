from flask import Flask
import json
from strawberry.flask.views import GraphQLView
from flask_cors import CORS
import logging
from flask_sqlalchemy import SQLAlchemy

logging.basicConfig(encoding="utf-8", level=logging.DEBUG)

logger = logging.getLogger(__name__)

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:3000"}})


app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///test.db"
app.db = SQLAlchemy()


with app.app_context():
    app.db.init_app(app)
    from nomstr.db import Tag, Bookmark, fill_database

    app.db.create_all()
    if not Bookmark.query.all():
        with open("data.json", "r") as f:
            data = json.load(f)
        fill_database(app.db.session, data)
    from nomstr.schema import *

    schema = strawberry.Schema(query=Query, mutation=Mutation)

app.add_url_rule(
    "/graphql",
    view_func=GraphQLView.as_view("graphql_view", schema=schema),
)


if __name__ == "__main__":
    app.run()
