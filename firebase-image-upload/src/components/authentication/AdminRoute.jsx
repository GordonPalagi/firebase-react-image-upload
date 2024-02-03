import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider'

function AdminRoute({ element: Component, ...rest }) {
  const { admin, currentUser } = useAuth();

  return admin ? <Component {...rest} /> : currentUser && !admin ? <Navigate to="/" /> : <Navigate to="/login" />;
}

export default AdminRoute