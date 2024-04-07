import logo from './logo.svg';
import './App.css';
import Home from './comp/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './comp/Nav';
import TVShows from './comp/TVShows';
import Movies from './comp/Movies';
import Details from './comp/Details';


//fee46b36579aeb7838aead2425507afe

function App() {

  return (
    <>

        <BrowserRouter>
          <Nav />
          <Routes>

            <Route path={`/details/:id`} element={<Details />} />

            <Route path='/' element={<Home />} />
            <Route path='/movie' element={<Movies />} />
            <Route path='/tvshows' element={<TVShows />} />
          </Routes>
        </BrowserRouter>

    </>
  );
}

export default App;
