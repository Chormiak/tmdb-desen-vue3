import os
from dotenv import load_dotenv

from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, Query
from sqlmodel import Field, Session, SQLModel, create_engine, select

load_dotenv()

class Test(SQLModel, table=True):
  id: int | None = Field(default=None, primary_key=True)
  name: str = Field(index=True)
  age: int = Field(index=True)
  secretName: str


mariadb_url = (
  f"mysql+pymysql://{os.getenv('USER_DB')}:{os.getenv('PASSWORD_DB')}"
  f"@{os.getenv('HOST_DB', 'localhost')}:{os.getenv('PORT_DB', '3306')}/{os.getenv('NAME_DB')}"
)

engine = create_engine(mariadb_url, echo=True)

def create_db_and_tables():
  SQLModel.metadata.create_all(engine)

def get_session():
  with Session(engine) as session:
    yield session

SessionDep = Annotated[Session, Depends(get_session)]