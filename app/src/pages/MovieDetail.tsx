
import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import {Link, useParams} from "react-router-dom"
import '../App.css'

interface Movies {
  _id: string;
  name: string;
  cfbc: string;
  release_year: number;
  genres : Genres[]
  cast : Cast
}

interface Genres {
  _id: string;
  name: string;
}

interface Actors {
  _id: string;
  name: string;
}

interface Cast {
    actors : Actors[]
    directors : Actors[]
}

function MovieDetail() {

  const { movieId } = useParams();
  const [moviedata, setMovieDetail] = useState<Movies[]>([]);
  
  useEffect(()=>{
    fetchMovieDetail()
  },[]);

  const fetchMovieDetail = async() =>  {
      const response = await fetch("http://localhost:8080/api/movies/detail/"+movieId);
      const data:Movies[] = await response.json()
      console.log(data)
      setMovieDetail(data)
  } 

  return (
    <div>
      <div className="mb-20">
        <Link to="/">Back to Home Page</Link>
      </div>
      <div className="mb-20">
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>Field</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          { moviedata.length > 0 ?   (
             moviedata.map((movie) => (
              <>
                <tr>
                     <td> Title</td>
                     <td>{movie.name}</td>
                 </tr>
                 <tr>
                    <td> Release Year</td>
                    <td>{movie.release_year}</td>
                </tr>
                <tr>
                    <td>Genres</td>
                     <td>{movie.genres.map((item) => (
                    item.name + ","
                    ))}</td>
                </tr>
                <tr>
                    <td>Actors</td>
                     <td>{movie.cast.actors.map((a) => (
                    <Link key={a._id} to={`/artist/${a._id}`}>{a.name} </Link> 
                    ))}</td>
                </tr>
                 <tr>
                    <td>Director</td>
                     <td>{movie.cast.directors.map((a) => (
                    <Link key={a._id} to={`/artist/${a._id}`}>{a.name}</Link>  
                    ))}</td>
                </tr>
                     
              </>

            
            ))
         ) : (
            <tr>
              <td colSpan={2}>No results found</td>
            </tr>
          )}
        </tbody>
      </Table>
      </div>
    </div>
  );
};

export default MovieDetail
