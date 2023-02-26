from flask import current_app as app
import math
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


def _first_cursor(query, limit) -> Tag:
    return query.order_by(Tag.id.asc()).limit(limit).first().id


def _last_cursor(query, limit) -> Tag:
    return query.order_by(Tag.id.desc()).limit(limit).all()[-1].id


def _before_cursor(query, after, limit) -> Tag:
    query_result = (
        query.filter(Tag.id < after).order_by(Tag.id.desc()).limit(limit).all()
    )
    if query_result != []:
        return query_result[-1].id  # last element
    else:
        return 1


def _next_cursor(query, after, limit) -> Tag:
    return (
        query.filter(Tag.id >= after)
        .order_by(Tag.id.asc())
        .limit(limit + 1)
        .all()[-1]
        .id
    )


def tags_after(after, limit, query=None):
    if query == None:
        query = app.db.session.query(Tag)
    if after == None:
        after = 1

    query_count = query.count()
    if limit == None:
        limit = query_count

    # first_cursor
    first_cursor = _first_cursor(query, limit)
    first_page = 0

    # last_cursor
    last_cursor = _last_cursor(query, limit)
    last_page = int(query_count / limit)

    # before_cursor
    before_cursor = _before_cursor(query, after, limit)
    before_page = int(query.filter(Tag.id <= after).count() / limit)

    # after_cursor
    after_cursor = after
    after_page = before_page + 1

    # next_cursor
    next_cursor = _next_cursor(query, after, limit)
    next_page = after_page + +1

    return {
        "result": query.filter(Tag.id >= after)
        .order_by(Tag.id.asc())
        .limit(limit)
        .all(),
        "result_count": query_count,
        "first_cursor": first_cursor,
        "first_page": 0,
        "last_cursor": last_cursor,
        "last_page": last_page,
        "before_cursor": before_cursor,
        "before_page": before_page,
        "after_cursor": after_cursor,
        "after_page": after_page,
        "next_cursor": next_cursor,
        "next_page": next_page,
    }
