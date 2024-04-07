import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Similar from './Similar'
import Recommend from './Recommend'
import axios from 'axios';
import './movie.css'
import { setinfo, setcredits } from './redux/slice/trendingslice';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'



const Details = () => {

    const { id } = useParams()
    const {shows} = useParams()

    const token = process.env.REACT_APP_TOKEN;
    const dispatch = useDispatch()
    const movieinfo = useSelector((state) => (state.movieinfo))
    const credits = useSelector((state) => (state.credits))



    function getinfo() {

        const options1 = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/${shows}/${id}`,
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        };
        axios
            .request(options1)
            .then(function (response) {
                //  console.log("option1",response.data);
                dispatch(setinfo(response.data))
            })
            .catch(function (error) {
                console.error(error);
            });



        const options2 = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/${shows}/${id}/credits`,
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        };

        axios
            .request(options2)
            .then(function (response) {
                // console.log("option2",response.data);
                dispatch(setcredits(response.data))
            })
            .catch(function (error) {
                console.error(error);
            });

    }

    useEffect(() => {
        getinfo()
        return(()=>{
            dispatch(setinfo([]))
            dispatch(setcredits({}))
        })
    }, [id])

    console.log(movieinfo, credits);

    return (
        <>
            {Object.keys(movieinfo).length != 0 && Object.keys(credits).length != 0 &&
                <section className='flex items-center gap-14 py-12 flex-col' >
                    <div className='container flex gap-8'>
                        <div className="left">
                            <img src={`https://image.tmdb.org/t/p/original${movieinfo.poster_path}` || <Skeleton />} alt="" />
                        </div>
                        <div className="right">
                            <h1 className='text-4xl'>{movieinfo.title || <Skeleton count={1} />}</h1>
                            <h3><i>{movieinfo.tagline || <Skeleton />}</i></h3>
                            <ul className='flex gap-4'>
                                {movieinfo.genres.map((e) => {
                                    return (
                                        <li>{e.name || <Skeleton />}</li>
                                    )
                                })}
                            </ul>
                            <h2 className='text-3xl'>Overview</h2>
                            <h3>{movieinfo.overview || <Skeleton />}</h3>

                            <ul className='flex gap-16'>
                                <li> <span className='font-bold'>Status : </span> {movieinfo.status || <Skeleton />}</li>
                                <li><span className='font-bold'>Release Date : </span>{movieinfo.release_date || <Skeleton />}</li>
                                <li><span className='font-bold'>Runtime : </span>{movieinfo.runtime || <Skeleton />} minutes</li>
                            </ul>
                            <hr />
                            {
                                credits.crew.map((e) => {
                                    if (e.job == "Director") {
                                        return (
                                            <div className='flex gap-5'>
                                                <h3 className='font-bold'>
                                                    Director :
                                                </h3>
                                                <span>
                                                    {e.name}
                                                </span>
                                            </div>
                                        )
                                    }
                                })
                            }
                            <hr />
                            <ul className='flex gap-4 flex-wrap'>
                                <span className='font-bold'>Writer :</span>{credits.crew.map((e) => {
                                    if (e.department == "Writing") {
                                        return (
                                            <>
                                                <li>{e.name},</li>
                                            </>
                                        )
                                    }
                                })}</ul>
                        </div>
                    </div>
                    <div className="cast flex flex-col gap-8">
                        <h1 className='text-3xl'>Top Cast</h1>
                        <ul className=' cast-list flex gap-14'>
                            {credits.cast.map((e) => {
                                return (
                                    <>
                                        <div className='flex flex-col gap-4 text-center'>
                                            <div className='profile'>
                                                <img src={`https://image.tmdb.org/t/p/original${e.profile_path}`} alt="" />
                                            </div>

                                            <li className='font-bold'>{e.name}</li>
                                            <span> <i>{e.character}</i></span>
                                        </div>
                                    </>
                                )
                            })}
                        </ul>
                    </div>
                    <Similar />
                    <Recommend/>
                </section>
            }
        </>
    )
}

export default Details
