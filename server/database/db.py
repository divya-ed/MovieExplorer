from pymongo import MongoClient
from bson import ObjectId
import json

try:
    client = MongoClient("localhost", 27017)
    print("Mongo Connected successfully!")
except Exception as e:
    print("Could not connect to MongoDB:", e)
    
db = client['MOVIE_EXPLORER']


