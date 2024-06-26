import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { setrecommendations } from './redux/slice/trendingslice';
import './movie.css'




const Recommend = () => {

    const { id } = useParams()
    const { shows } = useParams()

    const token = process.env.REACT_APP_TOKEN;
    const dispatch = useDispatch()
    const recommendations = useSelector((state) => (state.recommendations))

    function recommendedvideos() {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/${shows}/${id}/recommendations`,
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        };
        axios
            .request(options)
            .then(function (response) {
                //  console.log("option1",response.data);
                dispatch(setrecommendations(response.data.results))
            })
            .catch(function (error) {
                console.error(error);
            });
    }
    useEffect(() => {
        recommendedvideos()
        return(()=>{
            setrecommendations([])
        })
    }, [id])

    console.log(recommendations);


    return (
        <>
            <div className='similar flex flex-col'>
                <h1>Recommended {shows.toUpperCase()}</h1>
                <div className='movie-list flex gap-8 '>
                    {
                        recommendations.map((e) => {
                            return (
                                <>
                                    <NavLink to={`/details/${shows}/${e.id}`}>
                                        <div key={e.id}>
                                            <div className='poster h-80 w-60'>
                                                <img className='w-full h-full' src={`https://image.tmdb.org/t/p/original${e.poster_path}`} alt="" />
                                            </div>
                                            <h3>{e.title || e.name}</h3>
                                            <h4>{e.release_date || e.first_air_date}</h4>
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

export default Recommend
