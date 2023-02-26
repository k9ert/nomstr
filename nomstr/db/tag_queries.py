from flask import current_app as app
from .definitions import Tag, Bookmark, bookmark_tags
from sqlalchemy import func


def tags_by_name(name: str, query=None):
    if query == None:
        query = app.db.session.query(Tag)
    if name:
        query = query.filter(Tag.name == name)
    return query


def tags_by_min_count(min_count: int, query=None):
    """query all tags which have a min_count of ..."""
    if query == None:
        query = app.db.session.query(Tag)
    tag_count_subquery = (
        app.db.session.query(
            Tag.id, func.count(bookmark_tags.c.bookmark_id).label("bookmark_count")
        )
        .join(bookmark_tags)
        .group_by(Tag.id)
        .subquery()
    )

    query = query.join(tag_count_subquery, tag_count_subquery.c.id == Tag.id).filter(
        tag_count_subquery.c.bookmark_count > min_count
    )
    return query


def tags_after(after, limit, query=None):
    if query == None:
        query = app.db.session.query(Tag)

    # We need:
    # first_cursor
    # last_cursor
    # before_cursor + before_page
    # after_cursor + after_page

    # Before
    query_before = query.filter(Tag.id <= after)
    query_before_count = query.filter(Tag.id <= after).all()[-limit].id

    query_after = query.filter(Tag.id > after).order_by(Tag.id.asc())
    query_after_rslt = query_after.limit(limit + 1).all()

    next_cursor = 0
    before_cursor = 0

    return {"result": query_after.all()}
