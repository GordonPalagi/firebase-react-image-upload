import React, { useEffect, useState } from "react";
import { Alert, Button, Card, CardBody } from "react-bootstrap";
import { useAuth } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import StudentUpload from "./StudentUpload";
// import { LoremIpsum, loremIpsum } from "react-lorem-ipsum";

function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [uploadedImageArray, setUploadedImageArray] = useState([]);
  // const [lorem, setLorem] = useState("");

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  // const handleLorem = () => {
  //   setLorem(loremIpsum({
  //     p: 1
  //   }))
  // }


  return (
    <div className="flex-col p-12">
      <Card>
        <br/>
            <StudentUpload
              imageUpload={imageUpload}
              setImageUpload={setImageUpload}
              // lorem={lorem}
              // setLorem={setLorem}
            />
      </Card>

      <div className="w-100 text-center mt-2">
        <Link className="text-lsu-gold no-underline" to='/logout' onClick={handleLogout}>
          Log Out
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;



      {/* <Card>
        <CardBody>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </CardBody>
      </Card> */}