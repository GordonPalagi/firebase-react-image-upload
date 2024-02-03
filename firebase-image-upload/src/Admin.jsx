import React from 'react'
import { useState, useEffect } from 'react' 
import { listAll, deleteObject, getDownloadURL, getMetadata } from 'firebase/storage';

function Admin() {


  const style = {
    height: '300px',
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'center',
    padding: '20px'
  }

    const [imageUrls, setImageUrls] = useState([]);


    const fetchMetadata = (imageRef) => {
        getMetadata(imageRef)
        .then((metadata) => {
          setImageUrls(prevImages => prevImages.map(img => {
            if (img.ref.fullPath === imageRef.fullPath) {
              return { ...img, metadata };
            }
            return img;
          }));
          console.log(metadata);
        })
          .catch((error) => {
            console.error("Error fetching metadata: ", error);
          });
      };

      useEffect(() => {
        listAll(imagesListRef).then((response) => {
          response.items.forEach((item) => {
            getDownloadURL(item).then((url) => {
              fetchMetadata(url, item);  // Fetch and log metadata
              setImageUrls((prev) => [...prev, { url, ref: item }]);
            })
          })
        });
    
      }, [])
    

    const imagesListRef = ref(storage, "images/");

    const deleteFile = (imageRef) => {
        deleteObject(imageRef)
        .then(() => {
            console.log("Deleted successfully");
            setImageUrls(currentUrls => currentUrls.filter(image => image.ref !== imageRef));
        })
        .catch((error) => {
            console.log("Error deleting file: ", error);
            location.reload();
        });
    };
  
  return (
    <div>
        {imageUrls.map((image, index) => (
        <div key={index}>
            <img style={style} src={image.url} alt="image" />
            {image.metadata && (
            <>
                <p>Name: {image.metadata.name}</p>
                <p>Created: {image.metadata.timeCreated}</p>
            </>
            )}
            <button onClick={() => deleteFile(image.ref)}>Delete Image</button>
        </div>
        ))}
    </div>
  )
}

export default Admin