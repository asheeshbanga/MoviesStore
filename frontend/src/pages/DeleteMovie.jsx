import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { useSnackbar } from 'notistack';

export default function DeleteMovie() {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteMovie = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/movies/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Movie deleted successfully', { variant: 'success'});
        navigate('/');
      })
      .catch((err) => {
        setLoading(false);
        //alert('An error occurred. Please check console.')
        enqueueSnackbar('Error', { variant: 'error'});
        console.log(err);
      })
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className="text-3xl my-4">Delete Movie</h1>
      {loading ? <Spinner /> : '' }
      <div className="flex flex-col items-center border-2 border-sky-600 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are you sure you want to delete this movie?</h3>
        <button 
          className="p-4 bg-red-600 text-white m-8 w-full" 
          onClick={handleDeleteMovie}
          >Yes, Delete</button>
      </div>
    </div>
  )
}
