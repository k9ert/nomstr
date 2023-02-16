import typing
import strawberry
from typing import List
import json
from db import Bookmark as AlBookmark, Tag as AlTag




@strawberry.type
class Tag:
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
    created_at: str
    updated_at: str
    title: str





def get_bookmarks(first: int = None, after: int = None, last: int = None, before: int = None, tag: str = None):
    from flask import current_app as app
    query = app.db.session.query(AlBookmark)
    if tag:
        tag = app.db.session.query(AlTag).filter(AlTag.name == tag).first()
        query = query.join(AlTag.bookmarks).filter(AlTag.id == tag.id)
    if after:
        query = query.filter(AlBookmark.id > after).order_by(AlBookmark.id.desc())
    elif before:
        query = query.filter(AlBookmark.id < before)
    query = query.order_by(AlBookmark.id.desc()).order_by(AlBookmark.id.asc())
    if last:
        query = query.limit(last)
    elif first:
        query = query.limit(first)
    bookmarks = query.all()
    listOfBookmarks = []
    bookmark: AlBookmark
    for bookmark in bookmarks:
        b = Bookmark(
            url=bookmark.url,
            desc=bookmark.desc or "",
            readlater=bookmark.readlater or "",
            annotations=[], #fixme
            tags=[Tag(name=tag.name) for tag in bookmark.tags ],
            comments=[bookmark.comments or ""],
            user=bookmark.user or "",
            shared=bookmark.shared or "",
            created_at=bookmark.created_at or "",
            updated_at=bookmark.updated_at or "",
            title=bookmark.title or ""
        )
        listOfBookmarks.append(b)
    return listOfBookmarks

def get_tags():
    list_of_tags = []
    tag: AlTag
    for tag in AlTag.query.all():
        list_of_tags.append(Tag(name=tag.name, count=len(tag.bookmarks)) )
    return list_of_tags

@strawberry.type
class Query:
    tags: typing.List[Tag] = strawberry.field(resolver=get_tags)
    bookmarks: typing.List[Bookmark] = strawberry.field(resolver=get_bookmarks)

@strawberry.type
class Mutation:
    @strawberry.mutation
    def update_bookmark(self, url: str, tags: List[str]) -> bool:
        from flask import current_app as app
        bookmark = AlBookmark.query.filter(AlBookmark.url == url).first()
        keep_those_tags: List[AlTag] = [ tag for tag in bookmark.tags if tag.name in tags ]
        if len(keep_those_tags) != len(tags):
            # There are new tags
            new_tags = [ tag for tag in tags if tag not in [ tag_.name for tag_ in keep_those_tags] ]

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
            new_tags = [ tag for tag in tags if tag not in [ tag_.name for tag_ in existing_tags] ]

            for tag_name in new_tags:
                tag = AlTag.query.filter(AlTag.name == tag_name).first()
                if not tag:
                    tag = AlTag(name=tag_name)
                    app.db.session.add(tag)
                    app.db.session.commit()
                existing_tags.append(tag)
        bookmark = AlBookmark(url = url, title = title, desc = desc, tags = existing_tags)
        app.db.session.add(bookmark)
        app.db.session.commit()
        return True



