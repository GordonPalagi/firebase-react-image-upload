import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useRef, useState } from 'react'
import { useAuth } from '../../context/AuthProvider'


function ForgotPassword() {    
    
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(false)

async function handleSubmit(e) {
    e.preventDefault()

    try {
        setMessage("")
        setError("")
        setLoading(true)
        await resetPassword(emailRef.current.value)
        setMessage('Password reset email sent', 'success')
      } catch (error) {
        setError("Failed to reset password")
        console.log(error)
    }

    setLoading(false)
}

    return (
        <>
            <Card>
              <Card.Body>
                  <h2 className="text-center mb-4">Password Reset</h2>
                  {error && <Alert variant="danger">{error}</Alert>}
                  {message && <Alert variant="success">{message}</Alert>}
                  <Form onSubmit={handleSubmit}>
                  <Form.Group id="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" ref={emailRef} required />
                  </Form.Group>
                  <Button disabled={loading} className="w-100" type="submit">
                      Reset Password
                  </Button>
                  </Form>
                  <div className='w-100 text-venter mt-3'>
                      <Link to='/login'>Login</Link>
                  </div>
              </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
            Need an account? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}

export default ForgotPassword