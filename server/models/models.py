
from database.db import db
from bson import ObjectId

class Movies:
    def __init__(self):
        pass

    @staticmethod
    def find_all():
        """Retrieves all movies"""
        collection = db.movies
        movies = collection.find()
        movie_data = []
        for m in movies:
            m["_id"] = str(m["_id"])
            movie_data.append(m)

        return movie_data

    @staticmethod
    def search_movies(genre,actor,director):
        """Retrieves movies by genre,cast"""
        collection = db.movies
        movie_data = []
        try:
            filterDict = {}
            if genre != "":
                filterDict["genres.name"] = genre
            
            if actor != "":
                filterDict["cast.actors.name"] = actor

            if director != "":
                filterDict["cast.directors.name"] = director
           
            movies = collection.find(filterDict)
            if movies:
                for m in movies:
                    m["_id"] = str(m["_id"])
                    movie_data.append(m)
            
            return movie_data
        except Exception:
            return movie_data

    @staticmethod
    def find_by_id(movieId):
        """Retrieves movies by mongoId"""
        collection = db.movies
        movie_data = []
        try:
             
            movie = collection.find_one({"_id": ObjectId(movieId)})
            if movie:
                movie_data.append(movie)

            return movie_data
        except Exception:
            return movie_data

class Genres:
    def __init__(self):
        pass

    @staticmethod
    def find_all():
        """Retrieves all genres"""
        collection = db.genres
        genres = collection.find()
        genre_data = []
        for g in genres:
            g["_id"] = str(g["_id"])
            genre_data.append(g)

        return genre_data
    

class Artist:
    def __init__(self):
        pass

    @staticmethod
    def find_by_id(artistId):
        """Retrieves all movies by artist id"""
        collection = db.movies
        movie_data = []
        artist_data = []
        datadict = {}
        try: 
            movies = collection.find({"$or":[{"cast.actors._id": artistId},{"cast.directors._id": artistId}]})
            if movies:
                for m in movies:
                    m["_id"] = str(m["_id"])
                    movie_data.append(m)

            datadict["movies"] = movie_data

            collection = db.artists
            artist = collection.find_one({"_id": ObjectId(artistId)})
            if artist:
                datadict["artist"] = artist

            artist_data.append(datadict)
            print(artist_data)
            return artist_data
        except Exception:
            return artist_data

