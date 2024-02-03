
import './App.css'
import { useState, useEffect, useCallback } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from './firebase';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LoadingScreen from './components/LoadingScreen';
import ArchivePage from './components/ArchivePage';
import FinalPOTW from './components/FinalPOTW';
import Contact from './components/Contact';
import About from './components/About';
import FrontPage from './components/FrontPage';

function App() {
  const [potw, setPotw] = useState([])
  const [archive, setArchive] = useState([])
  const [isFrontPageLoading, setIsFrontPageLoading] = useState(true)

  const fetchMetadata = useCallback(async () => {
    try {
      const potwSnapshot = await getDocs(collection(db, "potw"));
      const archiveSnapshot = await getDocs(collection(db, "archive"));
      setPotw(potwSnapshot.docs.map((doc) => doc.data()));
      setArchive(archiveSnapshot.docs.map((doc) => doc.data()));
    } catch (error) {
      console.error("Error fetching metadata:", error);
    } finally {
      setIsFrontPageLoading(false);
    }
  }, [db]);

  useEffect(() => {
    fetchMetadata();
  }, []);

  return (
    <Router>
      <Routes>
        <Route element={isFrontPageLoading ? <LoadingScreen /> : <Layout />}>
          
          
          <Route
            path="/"
            element={<FrontPage potw={potw} />}
          />

          <Route path='/contact' element={<Contact/>}/>

          <Route path='/about' element={<About/>}/>

          <Route
            path="/archive"
            element={<ArchivePage archive={archive}/>}
            />


        </Route>

      </Routes>

    </Router>
  );
}

export default App