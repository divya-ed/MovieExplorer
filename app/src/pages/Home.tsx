
import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import {Link} from "react-router-dom"
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


function Home() {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [genres, setGenres] = useState<Genres[]>([]);
  const [searchActor, setSearchActor] = useState("");
  const [searchDirector, setSearchDirector] = useState("");
  const [filterGenre, setFilterGenre] = useState("");

  useEffect(()=>{
    fetchMovies(),
    fetchGenres()
  },[]);

  const fetchMovies = async() =>  {
      const response = await fetch("http://localhost:8080/api/movies");
      const data:Movies[] = await response.json()
      console.log(data)
      setMovies(data)
  } 

  const fetchGenres = async() =>  {
      const response = await fetch("http://localhost:8080/api/genres");
      const data:Genres[] = await response.json()
      console.log(data)
      setGenres(data)
  }

  const searchMovies = async() => {
    const response = await fetch("http://localhost:8080/api/movies/search?genre="+filterGenre+"&actor="+searchActor+"&director="+searchDirector);
    const data:Movies[] = await response.json()
    console.log(data)
    setMovies(data)
  };

  return (
    <div>
      <div className="mb-20">
        <input
          type="text"
          placeholder="Search by actor"
          value={searchActor}
          onChange={(e) => setSearchActor(e.target.value)}
        />
        &nbsp;&nbsp;
        <input
          type="text"
          placeholder="Search by director"
          value={searchDirector}
          onChange={(e) => setSearchDirector(e.target.value)}
        />
        &nbsp;&nbsp;
        <select
          value={filterGenre}
          onChange={(e) => setFilterGenre(e.target.value)}
        >
          <option value="">All Genre</option>
          {genres.map((genre) => (
            <option key={genre.name} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>
        &nbsp;&nbsp;
        <button onClick={searchMovies}>Search</button>
      </div>
      <div className="mb-20">
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>Title</th>
            <th>Rating</th>
            <th>Release Year</th>
            <th>Actor</th>
            <th>Director</th>
            <th>Genres</th>
          </tr>
        </thead>
        <tbody>
          {movies.length > 0 ? (
            movies.map((item) => (
              <tr key={item._id}>
                <td><Link key={item._id} to={`/movies/${item._id}`}>{item.name}</Link></td>
                <td>{item.cfbc}</td>
                <td>{item.release_year}</td>
                 <td>{item.cast.actors.map((a) => (
                <Link key={a._id} to={`/artist/${a._id}`}>{a.name} </Link>
                 ))}</td>
                  <td>{item.cast.directors.map((a) => (
                <Link key={a._id} to={`/artist/${a._id}`}>{a.name}</Link> 
                 ))}</td>
                <td>{item.genres.map((item) => (
               item.name + " "
                 ))}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>No results found</td>
            </tr>
          )}
        </tbody>
      </Table>
      </div>
    </div>
  );
};

export default Home
