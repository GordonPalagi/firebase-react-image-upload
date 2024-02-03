import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import lsuCampus from '/Users/Gordon/Desktop/firebase-react-image-upload/firebase-image-upload/src/assets/lsu_campus.jpeg';

function HomePage() {

  return (
    <div className='flex-col'>
        <div className='relative'>
          <img className='w-full ' src={lsuCampus} alt="LSU Campus" />
          <button><Link className='text-white no-underline absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-full bg-gray-800 rounded-md p-2' to="/login">Submit Your Photos</Link></button>
        </div>
    </div>
  )
}

export default HomePage