import React from 'react'
import { useParams } from 'react-router-dom'

const Details = () => {

    const { id } = useParams()

    return (
        <div>
            MOVIE DETAILS {id}
            <h1>HALLA BOL</h1>
        </div>
    )
}

export default Details
