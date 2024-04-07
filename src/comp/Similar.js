import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { setsimilar } from './redux/slice/trendingslice';
import './movie.css'


const Similar = () => {

    // https://api.themoviedb.org/3/movie/845783/similar
    // https://api.themoviedb.org/3/movie/845783/recommendations

    const { id } = useParams()
    const token = process.env.REACT_APP_TOKEN;
    const dispatch = useDispatch()
    const similar = useSelector((state) => (state.similar))


    function similarvideos() {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${id}/similar`,
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        };
        axios
            .request(options)
            .then(function (response) {
                //  console.log("option1",response.data);
                dispatch(setsimilar(response.data.results))
            })
            .catch(function (error) {
                console.error(error);
            });
    }
    useEffect(() => {
        similarvideos()
        return(()=>{
            setsimilar([])
        })
    }, [id])

    console.log(similar);

    return (
        <>
            <div className='similar flex flex-col'>
                <h1>Similar Movies</h1>
                <div className='movie-list flex gap-8 '>
                    {
                        similar.map((e) => {
                            return (
                                <>
                                    <NavLink to={`/details/${e.id}`}>
                                        <div key={e.id}>
                                            <div className='poster h-80 w-60'>
                                                <img className='w-full h-full' src={`https://image.tmdb.org/t/p/original${e.poster_path}`} alt="" />
                                            </div>
                                            <h3>{e.title}</h3>
                                            <h4>{e.release_date}</h4>
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

export default Similar
