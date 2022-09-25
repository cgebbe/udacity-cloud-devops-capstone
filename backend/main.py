"""Super simple backend
#
Run it with
uvicorn main:app --reload
"""
import re

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger
from pydantic import BaseModel

app = FastAPI()

# Fix error "blocked by CORS policy"
# see https://fastapi.tiangolo.com/tutorial/cors/?h=+cors#use-corsmiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Define a Basemodel since otherwise data is passed via get.
class Item(BaseModel):
    sentence: str


@app.post("/swearword")
def contains_swearword(item: Item):
    logger.info(f"{item=}")
    # from https://www.joe.co.uk/life/
    # a-definitive-ranking-of-every-swear-word-from-worst-to-best-122544
    swearwords = {"wanker", "asshole", "arse", "cunt", "fuck", "dick", "dickhead"}
    sentence = item.sentence.lower()
    found_words = []

    for word in swearwords:
        match = re.search(word, sentence)
        if match:
            found_words.append(match.group())

    response = {
        "contains_swearword": True if found_words else False,
        "found_swearwords": found_words,
    }
    logger.info(f"{response=}")
    return response
