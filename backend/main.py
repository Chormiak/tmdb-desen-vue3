from typing import Annotated

from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import select
from .src.db.database import create_db_and_tables, SessionDep, Test

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE"],
    allow_headers="*",
)


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.post("/tests")
def create_test(test: Test, session: SessionDep) -> Test:
    session.add(test)
    session.commit()
    session.refresh(test)
    return test


@app.get("/tests")
def read_tests(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
):
    return session.exec(select(Test).offset(offset).limit(limit)).all()


@app.get("/tests/{test_id}")
def read_test(test_id: int, session: SessionDep) -> Test:
    test = session.get(Test, test_id)
    if not test:
        raise HTTPException(status_code=404, detail="Test not found")
    return test


@app.delete("/tests/{test_id}")
def delete_test(test_id: int, session: SessionDep):
    test = session.get(Test, test_id)
    if not test:
        raise HTTPException(status_code=404, detail="Test not found")
    session.delete(test)
    session.commit()
    return {"ok": True}
