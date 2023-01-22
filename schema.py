import typing
import schema
from typing import List
import json


@schema.type
class Bookmark:
    url: str
    desc: str
    readlater: str
    annotations: List[str]
    tags: str
    comments: List[str]
    user: str
    shared: str
    created_at: str
    updated_at: str
    title: str




def get_bookmarks():
    with open("data.json") as json_file:
        data = json.load(json_file)
    listOfBookmarks = []
    for item in data:
        b = Bookmark(
            url=item["url"],
            desc=item["desc"],
            readlater=item["readlater"],
            annotations=item["annotations"],
            tags=item["tags"],
            comments=item["comments"],
            user=item["user"],
            shared=item["shared"],
            created_at=item["created_at"],
            updated_at=item["updated_at"],
            title=item["title"]
        )
        listOfBookmarks.append(b)
    return listOfBookmarks

@schema.type
class Query:
    bookmarks: typing.List[Bookmark] = schema.field(resolver=get_bookmarks)

schema = schema.Schema(query=Query)