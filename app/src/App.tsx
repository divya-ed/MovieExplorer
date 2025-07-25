
import  {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'
import Home from './pages/Home'
import ArtistDetail from './pages/ArtistDetail';
import MovieDetail from './pages/MovieDetail';


function App() {
    return (
      <div className='App'>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/movies/:movieId' element={<MovieDetail />} />
            <Route path='/artist/:artistId' element={<ArtistDetail />} />
          </Routes>
        </Router>

      </div>
    )
};

export default App
