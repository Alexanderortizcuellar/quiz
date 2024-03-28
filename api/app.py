from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
from random import randint
from fastapi.params import ParamTypes
from rich import print
import json
app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def fix_options(options: str) -> list:
    options_list = options.split("|")
    print(options_list)
    return options_list


@app.get("/question")
def send_question(lang: str = Query("en", title="Language", description="Language of the questions")):
    index = randint(1, 1061)
    language = "-spanish" if lang != "en" else ""
    con = sqlite3.connect(f"questions{language}.db")
    print(language)
    cursor = con.cursor()
    cursor.execute(f"SELECT *FROM questions WHERE rowid = {index}")
    question = cursor.fetchone()
    print(index, question)
    con.close()
    question_dict = {"question": question[0], "answer": question[1], "options": fix_options(question[2])}
    return question_dict