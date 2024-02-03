import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage
} from "firebase/storage";
import { Button, Form } from "react-bootstrap";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";


function StudentUpload({ imageUpload, setImageUpload}) {

  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [progress, setProgress] = useState(0);
  const [showProgressbar, setShowProgressbar] = useState(false);
  const [progressAlert, setProgressAlert] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };



  // uploads image to firebase storage
  const uploadImage = () => {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${imageUpload.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageUpload);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log(`Upload is ${progress}% done`);
          setProgress(progress);
        },
        (error) => {
          console.log(error);
          reject(error);
        }, () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // setUrl(downloadURL);
            resolve(downloadURL);
          });
        }
      );
    })
  };

  // useEffect(() => {
  //   if (progress == 0 || progress == 100) {
  //     setShowProgressbar(false);
  //     if (progress == 100) {

  //       setProgressAlert(true);

  //       setTimeout(() => {
  //         setProgressAlert(false);
  //       }, 3000)

  //       setProgress(0);

  //     }
  //   } else {
  //     setShowProgressbar(true);
  //   }
  // }, [progress])

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setShowProgressbar(false);
        setProgress(0);
        setProgressAlert(true);
        setTimeout(() => {
          setProgressAlert(false);
        }, 4000);
      }, 1000); // Delay to ensure user sees the progress bar reach 100%
    }
  }, [progress]);





  // adds metadata to firestore
  const addMetadata = async (url) => {
    
    try {
      const docRef = await addDoc(collection(db, "metadata"), {
        name,
        description,
        title,
        url,
        dateCreated: new Date()
      });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      
  }


  // groups the above functions together to be executed on submit
  const uploadFile = async () => {
    try {
      setShowProgressbar(true);
      const uploadedUrl = await uploadImage(); // returns a promise that resolves with the download URL
      addMetadata(uploadedUrl);
      setImageUpload(null);
      setDescription("");
      setName("");
      setTitle("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="App">
      <Form className="p-3">

        {/* student image upload */}
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control
            type="file"
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
            }}
          />
        </Form.Group>

        {/* student name */}
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label placeholder="Your Name">Name</Form.Label>
          <Form.Control onChange={handleNameChange} type="text" value={name} />
        </Form.Group>

        {/* student description */}
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label placeholder="Title your image">Title</Form.Label>
          <Form.Control onChange={handleTitle} type="text" value={title} />
        </Form.Group>

        {/* student description */}
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label placeholder="Description">Description</Form.Label>
          <Form.Control
            onChange={handleDescriptionChange}
            as="textarea"
            rows="3"
            value={description}
          />
        </Form.Group>

        {/* progress bar */}
  
          {/* submit button */}
        <Button onClick={uploadFile}> Submit Photo </Button>
      </Form>

      {showProgressbar ? (
        <div className="flex justify-center align-middle">
          <progress className="px-1 [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg   [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:bg-violet-400 [&::-moz-progress-bar]:bg-violet-400" value={progress} max="100" />
          <span className="mb-3 text-sm">{progress.toPrecision(2)}%</span>
        </div>
      ) : null}
      {progressAlert && <div className="alert alert-success" role="alert">
        Your photo has been uploaded!
      </div>}
    </div>
  );
          }
export default StudentUpload;