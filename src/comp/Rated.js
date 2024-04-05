import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { settoprated } from './redux/slice/trendingslice';



const Rated = () => {

    const token = process.env.REACT_APP_TOKEN;
    // url: 'https://api.themoviedb.org/3/movie/top_rated',
    const dispatch = useDispatch();

    const topratedlist = useSelector((state) => {
        return state.topratedmovie
    })

    const [shows, setshows] = useState("movie")

    function movie() {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/${shows}/top_rated`,
            headers: {
                accept: 'application/json',

                Authorization: `Bearer ${token}`
            }
        };
        axios
            .request(options)
            .then(function (response) {
                // setpopular(response.data.results)
                dispatch(settoprated(response.data.results))
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    useEffect(() => {
        movie()
    }, [shows]);

    console.log(topratedlist);

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
                        topratedlist.map((e) => {
                            return (
                                <div key={e.id}>
                                    <div className='h-80 w-60'>
                                        <img className='w-full h-full' src={`https://image.tmdb.org/t/p/original${e.poster_path}`} alt="" />
                                    </div>
                                    <h3>{e?.title || e?.name}</h3>
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

export default Rated
