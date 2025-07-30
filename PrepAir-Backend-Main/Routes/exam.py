# exam.py
from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from db import mcqs_collection  # Import MongoDB collection
import random
from fastapi import Query

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
            "exam_name": 1,
            "question": 1,
            "options": 1,
            "correctOption": 1,
            "level": 1,
            "weightage": 1,
            "topic": 1,
            "subtopic" : 1
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


#http://127.0.0.1:8001/get_exam_prefernce?exam_name=GATE
@router.get("/get_exam_prefernce")
async def get_exam_prefernce(exam_name: str = Query(None)):
    match_stage = {}

    if exam_name:
        match_stage["exam_name"] = exam_name

    pipeline = []

    if match_stage:
        pipeline.append({"$match": match_stage})

    pipeline.append({
        "$group": {
            "_id": {
                "exam_name": "$exam_name",
                "topic": "$topic",
                "subtopic": "$subtopic"
            }
        }
    })

    raw_data = []
    async for entry in mcqs_collection.aggregate(pipeline):
        raw_data.append(entry["_id"])

    structured = {}

    for item in raw_data:
        exam = item["exam_name"]
        topic = item["topic"]
        subtopic = item["subtopic"]

        if exam not in structured:
            structured[exam] = {}

        if topic not in structured[exam]:
            structured[exam][topic] = set()

        structured[exam][topic].add(subtopic)

    # Convert to list of dicts
    result = []
    for exam_name, topics in structured.items():
        topic_list = []
        for topic, subtopics in topics.items():
            topic_list.append({
                "topic": topic,
                "subtopics": sorted(list(subtopics))
            })
        result.append({
            "exam_name": exam_name,
            "topics": topic_list
        })

    return result

