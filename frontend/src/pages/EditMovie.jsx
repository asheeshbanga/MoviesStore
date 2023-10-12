import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { useSnackbar } from 'notistack';

export default function EditMovie() {

  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [rating, setRating] = useState('');
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); 

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/movies/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setDirector(res.data.director);
        setRating(res.data.rating);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert('An error occurred. Please check console.');
      })
  }, [])


  const handleEditMovie = () => {
    const data = {
      title,
      director,
      rating
    }
    setLoading(true);
    axios
      .put(`http://localhost:5555/movies/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Movie edited successfully', { variant: 'success'});
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        //alert('An error occurred. Please check console.');
        enqueueSnackbar('Error', { variant: 'error'});
      }) 
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Movie</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div>
          <label className="text-xl mr-4 text-gray-500">Director</label>
          <input 
            type="text" 
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div>
          <label className="text-xl mr-4 text-gray-500">Rating</label>
          <input 
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditMovie}>Save</button>
      </div>
    </div>
  )
}
