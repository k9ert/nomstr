from sqlalchemy import create_engine, Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from typing import List
import json
from flask_sqlalchemy import SQLAlchemy
from flask import current_app as app
from sqlalchemy.ext.hybrid import hybrid_method

from .definitions import Tag, Bookmark, fill_database, bookmark_tags

