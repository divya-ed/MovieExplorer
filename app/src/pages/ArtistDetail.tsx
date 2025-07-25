
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

interface Artist {
  _id: string;
  name: string;
  artist_type : Array<string>;
}

interface Cast {
    actors : Actors[]
    directors : Actors[]
}

interface Artist{
    artist : Artist
    movies : Movies[]
}

function ArtistDetail() {
  const { artistId } = useParams();
  const [artistdata, setArtistDetail] = useState<Artist[]>([]);

  useEffect(()=>{
    fetchArtist()
  },[]);

  const fetchArtist = async() =>  {
      const response = await fetch("http://localhost:8080/api/artist/detail/"+artistId);
      const data:Artist[] = await response.json()
      console.log(data)
      setArtistDetail(data)
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
            <th>Artist Name</th>
            <th>Profession</th>
          </tr>
        </thead>
        <tbody>
          {artistdata.length > 0 ? (
            artistdata.map((item) => (
              <tr key={item.artist._id}>
                <td>{item.artist.name}</td>
                <td>{item.artist.artist_type.map((item) => (
                item + " "
                 ))}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No results found</td>
            </tr>
          )}
        </tbody>
      </Table>

      <h2>Filmography</h2>
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
          {artistdata.length > 0 ? (
            artistdata[0].movies.map((item) => (
              <tr key={item._id}>
                <td><Link key={item._id} to={`/movies/${item._id}`}>{item.name}</Link></td>
                <td>{item.cfbc}</td>
                <td>{item.release_year}</td>
                 <td>{item.cast.actors.map((a) => (
                <Link key={a._id} to={`/artist/${a._id}`}>{a.name}</Link> 
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

export default ArtistDetail
