import React, { useCallback, useEffect, useState, useRef } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { setpopular } from './redux/slice/trendingslice';


const Popular = () => {

    // const [popular, setpopular] = useState([])

    const dispatch = useDispatch();

    const popularlist = useSelector((state) => {
        return state.popularmovie
    })

    const [shows, setshows] = useState("movie")
    // const movieref = useRef(false)

    const token = process.env.REACT_APP_TOKEN;


    function movie() {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/${shows}/popular`,
            headers: {
                accept: 'application/json',

                Authorization: `Bearer ${token}`
            }
        };
        axios
            .request(options)
            .then(function (response) {
                // setpopular(response.data.results)
                dispatch(setpopular(response.data.results))
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    // movie()


    useEffect(() => {
        movie()
    }, [shows]);

    return (
        <>
            <div className='trending-movie flex gap-4 flex-col'>
                <div className='flex justify-between'>
                    <h2 className='text-2xl'>Popular</h2>

                    <div className='flex gap-3'>
                        <button className='eff' onClick={() => {
                            setshows('movie')
                        }}><span>Movies</span></button>
                        <button className='eff' onClick={() => {
                            setshows('tv')
                        }}><span>TV Shows</span></button>
                    </div>

                </div>

                <div className='movie-list flex gap-6'>
                    {
                        popularlist.map((e) => {
                            return (
                                <div key={e.id}>
                                    <div className='h-80 w-60'>
                                        <img className='w-full h-full' src={`https://image.tmdb.org/t/p/original${e.poster_path}`} alt="" />
                                    </div>
                                    <h3>{e.title || e.name}</h3>
                                    <h4>{e?.release_date || e?.first_air_date}</h4>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Popular
