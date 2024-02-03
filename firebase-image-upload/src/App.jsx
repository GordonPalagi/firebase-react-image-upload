import React from 'react';
import "./App.css";
import Signup from "./components/authentication/Signup";
import { AuthProvider, useAuth } from "./context/AuthProvider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/authentication/Login";
import PrivateRoute from "./components/authentication/PrivateRoute";
import ForgotPassword from "./components/authentication/ForgotPassword";
import UpdateProfile from "./components/authentication/UpdateProfile";
import AdminDashboard from "./components/adminDashboard/AdminDashboard";
import StudentUpload from "./components/StudentUpload";
import AdminRoute from "./components/authentication/AdminRoute";
import HomePage from "./components/HomePage";
import Layout from './components/Layout';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <RoutesComponent />
        </Layout>
      </Router>
    </AuthProvider>
  );
}

function RoutesComponent() {
  const { admin, currentUser } = useAuth(); // Using the context after AuthProvider

  return (
    <Routes>
      {currentUser === null ? (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<HomePage />} />
        </>
      ) : admin ? (
        // Admin Specific Routes
        <>
          <Route path="/admin" element={<AdminRoute element={AdminDashboard} />} />
          <Route path="*" element={<AdminRoute element={AdminDashboard} />} />
        </>
        ) : (
        // Routes for Regular Users
        <>
          {/* <Route path="/portal" element={<PrivateRoute element={Dashboard} />} /> */}
          <Route path="/student-upload" element={<PrivateRoute element={StudentUpload} />} />
          <Route path="/update-profile" element={<PrivateRoute element={UpdateProfile} />} />
          <Route path="*" element={<PrivateRoute element={Dashboard} />} />
        </>
      )}
    </Routes>
  );
}

export default App;
