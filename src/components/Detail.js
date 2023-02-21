import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { useParams } from 'react-router-dom'
import { moviesRef } from '../firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { ThreeCircles } from 'react-loader-spinner'
import Review from './Review'

const Detail = () => {
    const { id } = useParams()
    const [data, setData] = useState({
        title: "",
        year: "",
        image: "",
        description: "",
        rating: 0,
        rated: 0
    })

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function getData() {
            setLoading(true)
            const _doc = doc(db, "movies", id)
            const _data = await getDoc(_doc)
            setData(_data.data())
            setLoading(false)
        }
        getData();
    }, [])

    return (
        <div className='p-4 mt-4 flex flex-col md:flex-row items-center md:items-start'>
            {loading ? <div className='h-96 flex w-full items-center justify-center'><ThreeCircles height={30} color="white" /></div> :
                <>
                    <img className='md:sticky block h-96 top-24' src={data.image} />

                    <div className='md:w-2/3 w-full md:ml-4 ml-0'>
                        <h1 className='text-3xl font-bold text-gray-400'>{data.title} <span className='text-xl'>({data.year})</span></h1>

                        <ReactStars
                            size={20}
                            half={true}
                            value={data.rating / data.rated}
                            edit={false}
                        />

                        <p className='mt-2'> {data.description}  </p>
                        <Review id={id} prevRating={data.rating} UserRated={data.rated}/>

                    </div>
                </>
            }
        </div>
    )
}

export default Detail
