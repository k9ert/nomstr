
from flask import Flask
import json
from strawberry.flask.views import GraphQLView
from flask_cors import CORS
import logging


logger = logging.getLogger(__name__)

def test_tag_by_name(app_for_db):
    from ..db.tag_queries import tags_by_name
    logger.info("Test started")
    query = tags_by_name("no_tag")
    assert query.count() == 1

    
def test_tag_by_min_count():
    from ..db.tag_queries import tags_by_min_count
    logger.info("Test started")
    query = tags_by_min_count(100)
    assert query.count() >= 10

def test_tag_by_both():
    from ..db.tag_queries import tags_by_name, tags_by_min_count
    logger.info("Test started")
    query = tags_by_min_count(100)
    query = tags_by_name("bla",query=query)
    assert query.count() == 0