import React from "react";
import { useEffect, useState, useCallback } from "react";
import { Button, Form } from "react-bootstrap";
import { getFirestore, getDocs, collection, deleteDoc, query, where, addDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router";
import './AdminDashboard.css';
import MainPhotoColumn from "../MainPhotoColumn";

function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const db = getFirestore();
  const [metadata, setMetadata] = useState([]);
  const [potw, setPotw] = useState([])
  const [archive, setArchive] = useState(
    [{
      id: null, 
      url: null
    }])
  const [showModal, setShowModal] = useState(false);
  const [teacherDescription, setTeacherDescription] = useState("")
  const [handleAddDescription, sethandleAddDescription] = useState(false);

  const currentDate = new Date();
  const currentDayOfMonth = currentDate.getDate();
  const buttonClass = "bg-slate-500 rounded-lg py-1 my-1 uppercase";


  const useMetadata = useCallback(async () => {
    const snapshot = await getDocs(collection(db, "metadata"));
    return snapshot.docs.map((doc) => doc.data());
  }, [db]);

  // delete file from Firestore database
  const deleteFile = async (url) => {

    try {
      // Delete the file
      const q = query(collection(db, "metadata"), where("url", "==", url));
      
      // await deleteObject(storageRef);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      // Update the state to remove the deleted item
      setMetadata((currentMetadata) =>
        currentMetadata.filter((item) => item.url !== url)
      );
    } catch (error) {
      console.error("Error occurred while deleting file: ", error);
    }
  };



  
  // const archiveAllPictures = async () => {
  //   await Promise.all(archive.map((url, i) => 
  //     addDoc(collection(db, "archive"), {
  //       name: metadata[i].name,
  //       description: metadata[i].description,
  //       title: metadata[i].title,
  //       url: metadata[i].url,
  //       dateArchived: new Date()
  //     }).then(
  //       docRef => console.log("Document written with ID: ", docRef.id))
  //       .then(deleteFile(metadata[i].url))
  //       // maybe add a success message here
  //       // delete the potw from metadata
  //       .catch((error) => console.error("Error adding document: ", error))
  //   ));
  // }

  // const addPicOfTheWeek = async () => {
  //   await Promise.all(potw.map((url, i) => 
  //     addDoc(collection(db, "potw"), {
  //       name: metadata[i].name,
  //       description: metadata[i].description,
  //       title: metadata[i].title,
  //       url: metadata[i].url,
  //       dataAdded: new Date()
  //     }).then(
  //       docRef => console.log("Document written with ID: ", docRef.id))
  //       .then(deleteFile(metadata[i].url))
  //       // maybe add a success message here
  //       // delete the potw from metadata
  //       .catch((error) => console.error("Error adding document: ", error))
  //   ));
  // }


  const publishArchive = async () => {
    // Archive all pictures
    await Promise.all(archive.map((url, i) =>
      addDoc(collection(db, "archive"), {
        name: metadata[i].name,
        description: metadata[i].description,
        title: metadata[i].title,
        url: metadata[i].url,
        dateArchived: currentDayOfMonth
      }).then(docRef => {
        console.log("Document written with ID: ", docRef.id);
        deleteFile(metadata[i].url); // Delete file after archiving
        setArchive([{}]); // Reset archive after processing
      }).catch((error) => {
        console.error("Error adding document: ", error);
      })
    ));
  }

  const publishPotw = async () => {
    // Add pictures of the week
    await Promise.all(potw.map((url, i) =>
      addDoc(collection(db, "potw"), {
        name: metadata[i].name,
        description: metadata[i].description,
        title: metadata[i].title,
        url: metadata[i].url,
        teacherDescription: teacherDescription,
        dataAdded: currentDayOfMonth
      }).then(docRef => {
        console.log("Document written with ID: ", docRef.id);
        deleteFile(metadata[i].url); // Delete file after adding to POTW
        setPotw([]); // Reset potw after processing
        sethandleAddDescription("");
      }).catch((error) => {
        console.error("Error adding document: ", error);
      })
    ));
  };

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch(error) {
      console.log(error);
    }
  }

  // get all images from firestore
  useEffect(() => {
    useMetadata().then((response) => {
      setMetadata(response);
    });
  }, []);

  // const WorkBar = ({archive, potw}) => {

  //   return (
  //     <div className="absolute top-0 left-0 w-full bg-black h-fit z-10">
  //       <div>
  //         <h1>Chosen Pictures to be archived</h1>
  //         {archive && archive.map((data, i) => (
  //           <div key={i}>
  //             <img className="h-10 w-10" src={data.url} alt="archive" />
  //           </div>
  //         ))}
  //       </div>
  //       <div>
  //         <h1>Chosen Pictures to be POTW</h1>
  //         {potw && potw.map((data, i) => (
  //           <div key={i}>
  //             <img className="h-10 w-10" src={data.url} alt="POTW" />
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   )
  // }

  const handleModalToggle = () => {
    setShowModal(!showModal);
  }

  const removeImagePotw = (id) => {
    setPotw(potw.filter(item => item.id !== id));
  }

  const removeImageArchive = (id) => {
    setArchive(archive.filter(item => item.id !== id));
  }

  return (
    <div className="text-white">
      {metadata &&
        metadata.map((data, i) => (
          <MainPhotoColumn
            key={data.dateCreated}
            data={{ ...data }}
            // sets the array to be added to firebase upon publish
            setPotwToPublish={setPotw}
            // array used only for testing
            // potwArr={potw}
            // sets the array to be added to firebase upon publish
            setArchiveToPublish={setArchive}
            // array used only for testing
            // archiveArr={archive}
            deleteFile={() => deleteFile(data.url)}
          />
        ))}

      <Button className={buttonClass} onClick={() => handleLogout()}>
        Logout
      </Button>
      <Button className={buttonClass} onClick={handleModalToggle}>
        Open Modal
      </Button>

      {showModal && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-400 h-fit w-3/4 rounded-md p-3">
          <div className="">
            <div className="flex-col justify-around">
              <Button
                className="relative left-1/2 -translate-x-1/2"
                onClick={handleModalToggle}
              >
                X
              </Button>
              <h1>Picture of the week</h1>
            </div>
            <div className="flex justify-around p-5 overflow-hidden">
              {potw &&
                potw.map((data, index) => (
                  <div key={index}>
                    <img
                      onClick={() => removeImagePotw(data.id)}
                      className="h-20 w-20"
                      src={data.url}
                      alt=""
                    />
                  </div>
                ))}
            </div>

              <Form className="p-2 mb-2">
                <Form.Group name="TeacherDescription">
                  <Form.Label>Teacher Description</Form.Label>
                  <Form.Control
                    as="textArea"
                    onChange={(e) => setTeacherDescription(e.target.value)}
                    value={teacherDescription}
                  ></Form.Control>
                </Form.Group>
              </Form>

            <Button onClick={publishPotw}>Publish Potw</Button>
            <p>Archived Photos</p>
            <div className="flex justify-around p-5 overflow-hidden">
              {archive &&
                archive.map((data, index) => (
                  <div key={index}>
                    <img
                      onClick={() => removeImageArchive(data.id)}
                      className="w-20 h-20"
                      src={data.url}
                      alt=""
                    />
                  </div>
                ))}
            </div>
            <Button onClick={publishArchive}>Publish Archive</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
