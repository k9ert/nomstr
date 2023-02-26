from flask import Flask
import json
from strawberry.flask.views import GraphQLView
from flask_cors import CORS
import logging


logger = logging.getLogger(__name__)


def test_tags_data_structure_asserts(app_for_db):
    from ..db.tag_queries import tags_by_name
    from ..db.definitions import Tag

    with app_for_db.app_context():
        assert tags_by_name(None).count() == 82
        assert tags_by_name(None).first().id == 1
        assert tags_by_name(None).order_by(Tag.id.desc()).first().id == 82


def test_last_cursor(app_for_db):
    from ..db.tag_queries import _last_cursor, tags_by_name

    with app_for_db.app_context():
        print(_last_cursor(tags_by_name(None), limit=5))
        assert _last_cursor(tags_by_name(None), limit=5) == 78
        assert _last_cursor(tags_by_name(None), limit=1) == 82
        assert _last_cursor(tags_by_name(None), limit=10) == 73
        print(tags_by_name("bitcoin").all())


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
        query = tags_by_min_count(2)
        assert query.count() == 6


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
        # query after the 7th element with a limit of 5
        qrst = tags_after(7, 5)
        # allover, we get 5 elements (the limit)
        assert len(qrst["result"]) == 5
        # easy: first_cursor is 1 on the 0th page
        assert (qrst["first_cursor"]) == 1
        assert (qrst["first_page"]) == 0
        # 82 elements overall. 82 as the last element minus 4 (results in the last 5 elements)
        # 78 79 80 81 82
        assert (qrst["last_cursor"]) == 82 - 4
        # 82 / 5 = 16.4
        assert (qrst["last_page"]) == 16
        # 7 - 5
        assert (qrst["before_cursor"]) == 2
        # 1
        assert (qrst["before_page"]) == 1
        # 7 + 5
        assert (qrst["after_cursor"]) == 7
        assert (qrst["after_page"]) == 2
        assert (qrst["next_cursor"]) == 7 + 5
        assert (qrst["next_page"]) == 3
