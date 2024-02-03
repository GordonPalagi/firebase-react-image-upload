import React from 'react'

function SinglePOTW({randomPurpleColor, randomGoldColor, rowReverse, image}) {
  return (
    <div className="image-box">
    <div
      style={{ 
        flexDirection: rowReverse ? "row" : "row-reverse",
        backgroundColor: rowReverse ? `rgb(170, ${randomPurpleColor}, 224)` : `rgb(253, ${randomGoldColor}, 224)`,
      }}
      className="potw-image-con"
    >

      <div className="img-con">
        <img className="potw-images" src={image.url} alt={image.name} />
      </div>

      <div className={"potw-text"}>
        <section>
          <h3>
            {image.title} by {image.name}
          </h3>
          <p>{image.description}</p>
          <p>{image.teacherDescription}</p>
        </section>
      </div>

    </div>
  </div>
  )
}

export default SinglePOTW