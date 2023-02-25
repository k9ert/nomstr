from flask import current_app as app
from .definitions import Tag, Bookmark, bookmark_tags
from sqlalchemy import func


def tags_by_name(name: str, query=None):
    if query == None:
        query = app.db.session.query(Tag)
    return app.db.session.query(Tag).filter(Tag.name == name)


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
