from fastapi import APIRouter, HTTPException, Depends, Request
from pydantic import BaseModel
from db import auth_user_collection
import bcrypt
import jwt
from datetime import datetime, timedelta
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import List

router = APIRouter()

SECRET_KEY = "mysecretkey"
ALGORITHM = "HS256"
security = HTTPBearer()

# Pydantic models
class UserRegister(BaseModel):
    firstname: str
    lastname: str
    email: str
    password: str

class UserLogin(BaseModel):
    student_id: str
    password: str

# Password hashing
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))

# JWT creation
def create_jwt_token(username: str):
    expiration = datetime.utcnow() + timedelta(hours=1)
    payload = {"sub": username, "exp": expiration}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

# Register route
@router.post("/user-auth/register")
async def register_user(user: UserRegister):
    # Check if email already exists
    if await auth_user_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered")

    # Get the user with the highest student_id (numeric suffix)
    latest_user = await auth_user_collection.find_one(
        {"student_id": {"$regex": "@2025\\d+$"}},
        sort=[("student_id", -1)]
    )

    if latest_user and "student_id" in latest_user:
        try:
            last_suffix = int(latest_user["student_id"].split("@2025")[-1])
            new_suffix = last_suffix + 1
        except:
            new_suffix = 1
    else:
        new_suffix = 1

    # Create student_id globally: firstname_lastname@2025{suffix}
    prefix = f"{user.firstname.lower()}_{user.lastname.lower()}"
    student_id = f"{prefix}@2025{new_suffix}"

    hashed_pw = hash_password(user.password)

    user_doc = {
        "firstname": user.firstname,
        "lastname": user.lastname,
        "email": user.email,
        "password": hashed_pw,
        "student_id": student_id,
        "created_at": datetime.utcnow()
    }

    await auth_user_collection.insert_one(user_doc)

    return {
        "message": "User registered successfully",
        "student_id": student_id
    }


@router.post("/user-auth/login")
async def login_user(user: UserLogin):
    db_user = await auth_user_collection.find_one({"student_id": user.student_id})
    
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid student ID or password")

    token = create_jwt_token(user.student_id)

    return {
        "message": "Login successful",
        "student_id": user.student_id,
        "token": token
    }


@router.post("/user-auth/logout")
async def logout_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

    return {
        "message": f"User '{username}' logged out successfully. Please discard the token client-side."
    }


class UserOut(BaseModel):
    firstname: str
    lastname: str
    student_id: str


@router.get("/user-auth/users", response_model=List[UserOut])
async def get_all_users():
    users_cursor = auth_user_collection.find({}, {"_id": 0, "firstname": 1, "lastname": 1, "student_id": 1})
    users = await users_cursor.to_list(length=100)
    return users