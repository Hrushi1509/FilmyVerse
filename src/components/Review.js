import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { reviewsRef, db } from '../firebase/firebase'
import { addDoc, doc, updateDoc, query, where, getDocs, QuerySnapshot } from 'firebase/firestore'
import { TailSpin, ThreeDots } from 'react-loader-spinner'
import swal from 'sweetalert'

const Review = ({ id, prevRating, userRated }) => {
  const [rating, setRating] = useState(0)
  const [loading, setLoading] = useState(false)
  const [reviewsLoading, setReviewsLoading] = useState(false)
  const [form, setForm] = useState("")
  const [data, setData] = useState([])

  const sendReview = async () => {
    setLoading(true)
    try {
      await addDoc(reviewsRef, {
        movieId: id,
        name: "Hrushi Walujkar",
        rating: rating,
        thought: form,
        timestamp: new Date().getTime()
      })

      const ref = doc(db, "movies", id);
      await updateDoc(ref, {
        rating: prevRating + rating, 
        rated: userRated + 1
      })

      setRating(0)
      setForm("")
      swal({
        title: "Successfully Added",
        icons: "success",
        buttons: false,
        timer: 3000
      })

    } catch (error) {
      swal({
        title: error.message,
        icons: "error",
        buttons: false,
        timer: 3000
      })
    }
    setLoading(false)
  }

  useEffect(() => {
    async function getData() {
      setReviewsLoading(true)
      let quer = query(reviewsRef, where('movieId', '==', id))
      const querySnapshot = await getDocs(quer)

      querySnapshot.forEach((doc) => {
        setData((prev) => [...prev, doc.data()])
      })

      setReviewsLoading(false)
    }
    getData()
  }, [])

  return (
    <div className='mt-4 w-full border-t-2 border-gray-700 '>
      <ReactStars
        size={30}
        half={true}
        value={rating}
        onChange={(rate) => setRating(rate)}
      />
      <input
        value={form}
        onChange={(e) => setForm(e.target.value)}
        placeholder='Share Your Thoughts..'
        className='w-full p-2 outline-none header'

      />
      <button onClick={sendReview} className='bg-green-600 w-full p-2 flex justify-center'>
        {loading ? <TailSpin height={20} color="white" /> : "Share"}
      </button>

      {
        reviewsLoading ?
          <div className='mt-6 flex justify-center'><ThreeDots height={10} color={"white"} /></div>
          :
          <div className='mt-4'>
            {data.map((e, i) => {
              return (
                <div className=' header bg-gray-900 w-full border-b border-gray-600 p-2 mb-2' key={i}>
                  <div className='flex items-center'>
                    <p className='text-blue-500'>{e.name}</p>
                    <p className='ml-3 text-xs'>({new Date(e.timestamp).toLocaleString()})</p>
                  </div>
                  <ReactStars
                    size={15}
                    half={true}
                    value={e.rating}
                    edit={false}
                  />
                  <p>{e.thought}</p>
                </div>
              )
            })}

          </div>
      }
    </div>
  )
}

export default Review
