from motor.motor_asyncio import AsyncIOMotorClient

# MongoDB connection URI
MONGO_DETAILS = "mongodb://localhost:27017"

client = AsyncIOMotorClient(MONGO_DETAILS)

# Database name
database = client.mydatabase  # Replace with your database name

# Collections
mcqs_collection = database.mcqs  
auth_user_collection = database.auth_user  
