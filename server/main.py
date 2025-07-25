from flask import Flask, jsonify,request,Response
from flask_cors import CORS
import json
from models.models import Movies,Genres,Artist
from bson import ObjectId

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/MOVIE_EXPLORER"
CORS(app) 

class CustomJSONEncoder(json.JSONEncoder):
        def default(self, obj):
            if isinstance(obj, ObjectId):
                return str(obj)
            return json.JSONEncoder.default(self, obj)
               
@app.route("/api/movies",methods=["GET"])
def get_movies():
    m = Movies()
    movie_data = m.find_all()
    json_output = json.dumps(movie_data, cls=CustomJSONEncoder)
    response = Response(json_output, mimetype='application/json')
    return response

@app.route("/api/movies/search")
def search_movies():
    genre = request.args.get('genre', default='')
    actor = request.args.get('actor', default='')
    director = request.args.get('director', default='')
    m = Movies()
    movie_data = m.search_movies(genre,actor,director)
    json_output = json.dumps(movie_data, cls=CustomJSONEncoder)
    return json_output

@app.route("/api/genres",methods=["GET"])
def get_genres():
    g = Genres()
    genre_data = g.find_all()
    json_output = json.dumps(genre_data, cls=CustomJSONEncoder)
    response = Response(json_output, mimetype='application/json')
    return response

@app.route("/api/movies/detail/<string:movieId>",methods=["GET"])
def get_movie_by_id(movieId):
    m = Movies()
    movie_data = m.find_by_id(movieId)
    json_output = json.dumps(movie_data, cls=CustomJSONEncoder)
    response = Response(json_output, mimetype='application/json')
    return response

@app.route("/api/artist/detail/<string:artistId>",methods=["GET"])
def get_artist_by_id(artistId):
    m = Artist()
    movie_data = m.find_by_id(artistId)
    json_output = json.dumps(movie_data, cls=CustomJSONEncoder)
    response = Response(json_output, mimetype='application/json')
    return response

if __name__ == "__main__":
    app.run(debug=True,port=8080)

