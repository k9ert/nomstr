from flask import Flask
import json
from strawberry.flask.views import GraphQLView
from flask_cors import CORS
import logging


logger = logging.getLogger(__name__)


def test_tags_data_structure_assert():
    pass


def test_tag_by_name(app_for_db):
    from ..db.tag_queries import tags_by_name

    with app_for_db.app_context():
        logger.info("Test started")
        query = tags_by_name("no_tag")
        assert query.count() == 1


def test_tag_by_min_count(app_for_db):
    from ..db.tag_queries import tags_by_min_count

    logger.info("Test started")
    with app_for_db.app_context():
        query = tags_by_min_count(1)
        assert query.count() >= 10


def test_tag_by_both(app_for_db):
    from ..db.tag_queries import tags_by_name, tags_by_min_count

    logger.info("Test started")
    with app_for_db.app_context():
        query = tags_by_min_count(100)
        query = tags_by_name("bla", query=query)
        assert query.count() == 0


def test_tag_after(app_for_db):
    from ..db.tag_queries import tags_after

    logger.info("Test started")
    with app_for_db.app_context():
        query = tags_after(5, 5)
        assert len(query["result"]) == 3090
