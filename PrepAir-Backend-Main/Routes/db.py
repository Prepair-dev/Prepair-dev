#Local Testing db 
from motor.motor_asyncio import AsyncIOMotorClient

# MongoDB connection URI
MONGO_DETAILS = "mongodb://localhost:27017"

client = AsyncIOMotorClient(MONGO_DETAILS)

# Database name
database = client.mydatabase  # Replace with your database name

# Collections
mcqs_collection = database.mcqs  
auth_user_collection = database.auth_user  
user_records_collection = database.user_records

#Dev testing Db
# from motor.motor_asyncio import AsyncIOMotorClient
# import os
# from dotenv import load_dotenv

# load_dotenv()  # Load .env file

# # Load from environment for safety
# MONGO_DETAILS = os.getenv("mongodb+srv://prepair-dev:IMATHEBatman@3232cluster-dev.egobpbr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-dev")

# client = AsyncIOMotorClient(MONGO_DETAILS)

# # Select your database
# database = client["PrepAir_Dev_DB"]

# # Collections
# mcqs_collection = database["question_collection"]
# auth_user_collection = database["student_auth"]
# user_records_collection = database["student_history"]

