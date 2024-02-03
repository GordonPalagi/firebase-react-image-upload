import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useRef, useState } from "react";
import { useAuth } from "../../context/AuthProvider";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
        if ( emailRef.current.value === import.meta.env.VITE_ADMIN_EMAIL) {
            navigate("/admin");
        } else {
            navigate("/");
        }
    } catch (error) {
      setError("Failed to log in");
      console.log(error);
    }

    setLoading(false);
  }

  return (
    <div className="flex-col justify-center p-12">
      <Card className="">
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <button disabled={loading} className="w-100 bg-lsu-purple text-lsu-gold p-2 mt-4 rounded-md" type="submit">
              Log In
            </button>
          </Form>
          <div className="w-100 text-venter mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2 text-white">
        Need an account? <Link className="text-lsu-gold" to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
