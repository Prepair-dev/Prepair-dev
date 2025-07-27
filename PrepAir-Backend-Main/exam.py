# exam.py
from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from db import mcqs_collection  # Import MongoDB collection
import random

router = APIRouter()

class ExamDetails(BaseModel):
    total_questions: int 
    time: int  

class UserAnswer(BaseModel):
    question: str
    correctOption: str


@router.post("/get_questions")
async def user_examdetails(details: ExamDetails):
    pipeline = [
        {"$sample": {"size": details.total_questions}},
        {"$project": {
            "_id": 0,
            "question": 1,
            "options": 1,
            "correctOption": 1
        }}
    ]

    questions = []
    async for question in mcqs_collection.aggregate(pipeline):
        # Shuffle the options randomly for each question
        random.shuffle(question["options"])
        questions.append(question)

    return questions

@router.post("/user_examresponse")
async def user_examresponse(answers: List[UserAnswer]):
    correct_count = 0
    incorrect_count = 0

    for ans in answers:
        db_question = await mcqs_collection.find_one({"question": ans.question})
        if db_question:
            actual_answer = db_question.get("correctOption", "").strip().lower()
            user_answer = ans.correctOption.strip().lower()

            if user_answer == actual_answer:
                correct_count += 1
            else:
                incorrect_count += 1
        else:
            incorrect_count += 1

    return {
        "total_questions": len(answers),
        "correct": correct_count,
        "incorrect": incorrect_count
    }
