import json
from datetime import datetime
from typing import List

from flask import current_app as app
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Float, ForeignKey, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.hybrid import hybrid_method
from sqlalchemy.orm import relationship, sessionmaker
from sqlalchemy.types import Date

bookmark_tags = app.db.Table(
    "bookmark_tags",
    app.db.Column("bookmark_id", Integer, ForeignKey("bookmark.id"), primary_key=True),
    app.db.Column("tag_id", Integer, ForeignKey("tag.id"), primary_key=True),
    app.db.Index("bookmark_tags_idx", "bookmark_id", "tag_id"),
)


class Bookmark(app.db.Model):
    __tablename__ = "bookmark"
    id = Column(Integer, primary_key=True)
    url = Column(String)
    desc = Column(String)
    readlater = Column(String)
    annotations = Column(String)
    comments = Column(String)
    user = Column(String)
    shared = Column(String)
    created_at = Column(Date)
    updated_at = Column(Date)
    title = Column(String)
    tags = relationship(
        "Tag", secondary=bookmark_tags, uselist=True, back_populates="bookmarks"
    )


class Tag(app.db.Model):
    __tablename__ = "tag"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    bookmark_id = Column(Integer, ForeignKey("bookmark.id"))
    bookmarks = relationship(
        "Bookmark", secondary=bookmark_tags, uselist=True, back_populates="tags"
    )

    @hybrid_method
    def has_min_number_bookmarks(self, min):
        return len(self.bookmarks) >= min


def fill_database(session, data):
    for bookmark_data in data:
        tag_list = list(set(bookmark_data["tags"].split(",")))
        tags = []
        for name in tag_list:
            tag = session.query(Tag).filter(Tag.name == name).first()
            if not tag:
                tag = Tag(name=name)
            tags.append(tag)

        bookmark = Bookmark(
            url=bookmark_data["url"],
            desc=bookmark_data["desc"],
            readlater=bookmark_data["readlater"],
            annotations=json.dumps(bookmark_data["annotations"]),
            comments=json.dumps(bookmark_data["comments"]),
            user=bookmark_data["user"],
            shared=bookmark_data["shared"],
            created_at=datetime.strptime(
                bookmark_data["created_at"], "%Y/%m/%d %H:%M:%S %z"
            ),
            updated_at=datetime.strptime(
                bookmark_data["updated_at"], "%Y/%m/%d %H:%M:%S %z"
            ),
            title=bookmark_data["title"],
            tags=tags,
        )
        session.add(bookmark)
    session.commit()
