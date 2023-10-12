import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import MoviesTable from '../components/home/MoviesTable';
import MoviesCard from '../components/home/MoviesCard';


const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/movies')
      .then((response) => {
        let moviesData = response.data.data;
        setMovies(moviesData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button 
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={ () => setShowType('table')}
          >Table</button>
          <button 
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={ () => setShowType('card')}
          >Card</button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Movies List</h1>
        <Link to="/movies/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <MoviesTable movies={movies} />
      ) : (<MoviesCard movies={movies}/>)
    }
    </div>
  )
}

export default Home;