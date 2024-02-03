import React from 'react'

const AddedToPotw = ({imgArr, onClick}) => {
    return (
      <div>
        {imgArr.map((url, i) => (
          <div style={{padding: '20px'}} key={i}>
            <img onClick={() => onClick(url)} style={{height: '100px', cursor: 'pointer'}} src={url} alt={url} />
          </div>
        ))}
      </div>
    )
  }

export default AddedToPotw