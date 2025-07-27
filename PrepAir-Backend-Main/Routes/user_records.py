from fastapi import APIRouter

router = APIRouter()

@router.get("/get_user_records")
async def get_user_records():
    return {"message": "API is running"}

