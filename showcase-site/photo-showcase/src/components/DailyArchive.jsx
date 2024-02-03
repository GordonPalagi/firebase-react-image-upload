import React from 'react'

function DailyArchive({archive}) {
  return (
    <div>
      <div className="archive-con">
        {archive
          .filter((image) => image.dateArchived === new Date().getDate())
          .map((image, index) => (
            <div className="archive-image-box" key={index}>
              <img
                className="archive-images"
                src={image.url}
                alt={image.name}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default DailyArchive