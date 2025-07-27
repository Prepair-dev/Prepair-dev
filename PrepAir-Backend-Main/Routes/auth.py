from fastapi import APIRouter, HTTPException, Depends, Request
from pydantic import BaseModel
from db import auth_user_collection
import bcrypt
import jwt
from datetime import datetime, timedelta
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

router = APIRouter()

SECRET_KEY = "mysecretkey"
ALGORITHM = "HS256"
security = HTTPBearer()

# Pydantic models
class UserRegister(BaseModel):
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    username: str
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

# 🚀 Register route
@router.post("/user-auth/register")
async def register_user(user: UserRegister):
    existing_user = await auth_user_collection.find_one({"username": user.username})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")

    hashed_pw = hash_password(user.password)
    user_doc = {
        "username": user.username,
        "email": user.email,
        "password": hashed_pw,
        "created_at": datetime.utcnow()
    }

    await auth_user_collection.insert_one(user_doc)

    return {
        "message": "User registered successfully",
        "username": user.username
    }

@router.post("/user-auth/login")
async def login_user(user: UserLogin):
    db_user = await auth_user_collection.find_one({"username": user.username})
    
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid username or password")

    token = create_jwt_token(user.username)

    return {
        "message": "Login successful",
        "username": user.username,
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
