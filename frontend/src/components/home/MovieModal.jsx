import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineClose, AiOutlineEdit } from 'react-icons/ai';

export default function MovieModal({ movie, onClose }) {
    return (
        <div className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center' onClick={onClose}>
            <div
                onClick={(e) => e.stopPropagation()}
                className='w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative'
            >
                <AiOutlineClose
                    className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
                    onClick={onClose} />
                <h2 className="w-fit px-4 py-1 bg-red-300 rounded-lg">{movie.rating}</h2>
                <h4 className='my-2 text-gray-500'>{movie._id}</h4>
                <div className="flex justify-start items-center gap-x-2">
                    <PiBookOpenTextLight className='text-red-300 text-2xl' />
                    <h2 className="my-1">{movie.title}</h2>
                </div>
                <div className="flex justify-start items-center gap-x-2">
                    <BiUserCircle className='text-red-300 text-2xl' />
                    <h2 className="my-1">{movie.director}</h2>
                </div>
                <p className="mt-4">Anything about the movie goes here</p>
                <p className="my-2">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis corporis labore consectetur? Fuga nesciunt eum hic voluptatum porro et impedit voluptatem molestiae incidunt magni vel, esse, tempore, veniam illo rem. Impedit commodi exercitationem maiores doloribus assumenda voluptatem nisi aut voluptates aspernatur, qui ullam veniam quos culpa quaerat quasi, praesentium numquam!
                </p>
            </div>
        </div>
    )
}
