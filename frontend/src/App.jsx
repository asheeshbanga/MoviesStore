import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ShowMovies from './pages/ShowMovies';
import EditMovie from './pages/EditMovie';
import CreateMovie from './pages/CreateMovie';
import DeleteMovie from './pages/DeleteMovie';

const App = () => {
  return (
    <Routes>
      <Route path="/" element= {<Home />} />
      <Route path="/movies/create" element= {<CreateMovie />} />
      <Route path="/movies/details/:id" element= {<ShowMovies />} />
      <Route path="/movies/delete/:id" element= {<DeleteMovie />} />
      <Route path="/movies/edit/:id" element= {<EditMovie />} />
    </Routes>
  )
}

export default App