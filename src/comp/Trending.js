import React, { useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { settrending } from './redux/slice/trendingslice';
import { NavLink } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ReactSimplyCarousel from 'react-simply-carousel';


const Trending = () => {

    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const dispatch = useDispatch()

    const trendinglist = useSelector((state) => {
        return state.trendingmovie
    })


    const token = process.env.REACT_APP_TOKEN;

    // const [trend, settrend] = useState([]);

    const [time, settime] = useState("day");
    // const movieref = useRef(false)

    function movie() {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/trending/movie/${time}`,
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        };
        axios
            .request(options)
            .then(function (response) {
                // settrend(response.data.results)
                dispatch(settrending(response.data.results))
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    useEffect(() => {
        movie()
    }, [time])

    // console.log(trend);
    // console.log(time);

    return (
        <>
            <div className='trending-movie flex gap-4 flex-col'>
                <div className='flex justify-between'>
                    <h2 className='text-2xl'>Trending</h2>

                    <div className='flex gap-3'>
                        <button className='eff' onClick={() => {
                            settime('day')
                        }}><span>Day</span></button>
                        <button className='eff' onClick={() => {
                            settime('week')
                        }}><span>Week</span></button>
                    </div>

                </div>

                <div className='movie-list flex gap-6'>

                    {
                        trendinglist.map((e) => {
                            return (
                                <>
                                    <NavLink to={`/details/${e.id}`}>
                                        <div key={e.id}>
                                            <div className='poster h-80 w-60'>
                                                <img className='w-full h-full' src={`https://image.tmdb.org/t/p/original${e.poster_path}` || <Skeleton />} alt="" />
                                            </div>
                                            <h3>{e.title || <Skeleton />}</h3>
                                            <h4>{e.release_date || <Skeleton />}</h4>
                                        </div>
                                    </NavLink>
                                </>
                            )
                        })
                    }

                </div>

            </div>
        </>
    )
}

export default Trending
