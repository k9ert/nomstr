import typing
import strawberry
from typing import List
import json


@strawberry.type
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

@strawberry.type
class Tag:
    name: str




def get_bookmarks(tag: str =None):
    with open("data.json") as json_file:
        data = json.load(json_file)
    listOfBookmarks = []
    for item in data:
        if tag is None or tag in item["tags"]:
            b = Bookmark(
                url=item["url"],
                desc=item["desc"],
                readlater=item["readlater"],
                annotations=[], #fixme
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

def get_tags():
    with open("data.json") as json_file:
        data = json.load(json_file)
    list_of_tags = []
    for item in data:
        tags = item["tags"].split(",")
        list_of_tags.extend(tags)
    list_of_tags = list(set(list_of_tags)) # remove duplicates


    return [Tag(name=tag) for tag in list_of_tags]

@strawberry.type
class Query:
    tags: typing.List[Tag] = strawberry.field(resolver=get_tags)
    bookmarks: typing.List[Bookmark] = strawberry.field(resolver=get_bookmarks)

schema = strawberry.Schema(query=Query)