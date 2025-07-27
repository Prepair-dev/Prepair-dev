from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth import router as auth_router
from exam import router as exam_router
from user_records import router as get_user_records

app = FastAPI()

# Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(auth_router)
app.include_router(exam_router)
app.include_router(get_user_records)

@app.get("/")
async def root():
    return {"message": "API is running"}
