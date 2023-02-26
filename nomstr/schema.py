import json
import logging
import typing
from typing import List, Optional

import strawberry

from .db import Bookmark as AlBookmark
from .db import Tag as AlTag
from .db import bookmark_tags
from .db.tag_queries import tags_by_name, tags_by_min_count, tags_after
from sqlalchemy.orm import aliased
from sqlalchemy import func
from sqlalchemy import desc
from datetime import date


logger = logging.getLogger(__name__)


@strawberry.type
class Tag:
    id: int
    name: str
    count: int


@strawberry.type
class Bookmark:
    url: str
    desc: str
    readlater: str
    annotations: List[str]
    tags: List[Tag]
    comments: List[str]
    user: str
    shared: str
    created_at: date
    updated_at: date
    title: str


@strawberry.type
class PageMeta:
    next_cursor: Optional[int] = strawberry.field(
        description="The next cursor to continue with."
    )
    max_cursor: int = strawberry.field(description="The max cursor")
    result_count: int = strawberry.field(description="The number of result items")


@strawberry.type
class BookmarkResponse:
    bookmarks: List[Bookmark] = strawberry.field(description="The list of bookmarks.")

    page_meta: PageMeta = strawberry.field(description="Metadata to aid in pagination.")


@strawberry.type
class TagResponse:
    tags: List[Tag] = strawberry.field(description="The list of tags.")
    page_meta: PageMeta = strawberry.field(description="Metadata to aid in pagination.")


def get_bookmarks(
    first: int = None,
    after: int = None,
    last: int = None,
    before: int = None,
    tag: str = None,
):
    from flask import current_app as app

    query = app.db.session.query(AlBookmark)
    all_query = app.db.session.query(AlBookmark)
    if tag:
        tag = app.db.session.query(AlTag).filter(AlTag.name == tag).first()
        query = query.join(AlTag.bookmarks).filter(AlTag.id == tag.id)
        all_query = all_query.join(AlTag.bookmarks).filter(AlTag.id == tag.id)
    if after:
        query = query.filter(AlBookmark.id > after).order_by(AlBookmark.id.asc())
    elif before:
        query = query.filter(AlBookmark.id < before).order_by(AlBookmark.id.desc())
    if last:
        query = query.limit(last)
        next_cursor = before - last
    elif first:
        query = query.limit(first)
        next_cursor = after + first
    else:
        next_cursor = 0
    # logger.info(f"query: {query}")
    logger.info(f"first: {first} after: {after} last: {last} before: {before}")
    bookmarks = query.all()
    all_bookmarks_count = all_query.count()
    print(bookmarks)
    listOfBookmarks = []
    bookmark: AlBookmark
    for bookmark in bookmarks:
        b = Bookmark(
            url=bookmark.url,
            desc=bookmark.desc or "",
            readlater=bookmark.readlater or "",
            annotations=[],  # fixme
            tags=[Tag(id=tag.id, name=tag.name, count=None) for tag in bookmark.tags],
            comments=[bookmark.comments or ""],
            user=bookmark.user or "",
            shared=bookmark.shared or "",
            created_at=bookmark.created_at or "",
            updated_at=bookmark.updated_at or "",
            title=bookmark.title or "",
        )
        listOfBookmarks.append(b)
    logger.info(f"Found {len(bookmarks)} bookmarks from {all_bookmarks_count} ")
    page_meta = PageMeta(
        next_cursor=next_cursor,
        max_cursor=all_bookmarks_count,
        result_count=len(bookmarks),
    )
    return BookmarkResponse(bookmarks=listOfBookmarks, page_meta=page_meta)


def get_tags(
    first: int = None,
    after: int = None,
    last: int = None,
    before: int = None,
    min_count: int = None,
):
    from flask import current_app as app

    query = app.db.session.query(AlTag)
    all_query = app.db.session.query(AlTag)

    if min_count:
        query = tags_by_min_count(min_count, query=query)

    qrslt = tags_after(after, first, query)
    list_of_tags = []
    tag: AlTag
    for tag in qrslt["result"]:
        list_of_tags.append(Tag(id=tag.id, name=tag.name, count=len(tag.bookmarks)))
    # print(list_of_tags)
    page_meta = PageMeta(
        next_cursor=qrslt["next_cursor"],
        max_cursor=qrslt["last_cursor"],
        result_count=qrslt["result_count"],
    )
    return TagResponse(tags=list_of_tags, page_meta=page_meta)


@strawberry.type
class Query:
    tag_response: TagResponse = strawberry.field(resolver=get_tags)
    bookmarks: BookmarkResponse = strawberry.field(resolver=get_bookmarks)


@strawberry.type
class Mutation:
    @strawberry.mutation
    def update_bookmark(self, url: str, tags: List[str]) -> bool:
        from flask import current_app as app

        bookmark = AlBookmark.query.filter(AlBookmark.url == url).first()
        keep_those_tags: List[AlTag] = [
            tag for tag in bookmark.tags if tag.name in tags
        ]
        if len(keep_those_tags) != len(tags):
            # There are new tags
            new_tags = [
                tag
                for tag in tags
                if tag not in [tag_.name for tag_ in keep_those_tags]
            ]

            for tag_name in new_tags:
                tag = AlTag.query.filter(AlTag.name == tag_name).first()
                if not tag:
                    tag = AlTag(name=tag_name)
                    app.db.session.add(tag)
                    app.db.session.commit()
                keep_those_tags.append(tag)
        print(keep_those_tags)
        bookmark.tags = keep_those_tags
        app.db.session.add(bookmark)
        app.db.session.commit()
        return True

    @strawberry.mutation
    def create_bookmark(self, url: str, title: str, desc: str, tags: List[str]) -> bool:
        from flask import current_app as app

        bookmark = AlBookmark.query.filter(AlBookmark.url == url).first()
        if bookmark:
            return False
        existing_tags: List[AlTag] = []
        for tag in tags:
            existing_tag: List[AlTag] = AlTag.query.filter(AlTag.name == tag).first()
            if existing_tag:
                existing_tags.append(existing_tag)
        if len(existing_tags) != len(tags):
            # There are new tags
            new_tags = [
                tag for tag in tags if tag not in [tag_.name for tag_ in existing_tags]
            ]

            for tag_name in new_tags:
                tag = AlTag.query.filter(AlTag.name == tag_name).first()
                if not tag:
                    tag = AlTag(name=tag_name)
                    app.db.session.add(tag)
                    app.db.session.commit()
                existing_tags.append(tag)
        bookmark = AlBookmark(url=url, title=title, desc=desc, tags=existing_tags)
        app.db.session.add(bookmark)
        app.db.session.commit()
        return True
