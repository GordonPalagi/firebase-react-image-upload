import React from 'react'
import FinalPOTW from './FinalPOTW'

function FrontPage({ potw }) {
  return (
    <div>
        <div className="potw-con">
            <FinalPOTW potw={potw} />
        </div>
    </div>
  )
}

export default FrontPage