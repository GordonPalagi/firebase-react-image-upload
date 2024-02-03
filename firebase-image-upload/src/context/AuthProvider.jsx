import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import { createUserWithEmailAndPassword,
         signInWithEmailAndPassword,
        signOut,
        sendPasswordResetEmail,
        updateEmail,
        updatePassword,
        deleteUser
      } from "firebase/auth"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [admin, setAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return signOut(auth)
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }

  function updateUserEmail(email) {
    return updateEmail(currentUser, email)
  }

  function updateUserPassword(password) {
    return updatePassword(currentUser, password)
  }

  // implement delete user account
  function deleteUserAccount() {
    return deleteUser(currentUser)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user, email) => {
      if (user) {
        setAdmin(user.email === "admin@admin.com");
      } else {
        setAdmin(false);
      }
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

    const value = {
        currentUser,
        admin,
        signup,
        login,
        logout,
        resetPassword,
        updateUserEmail,
        updateUserPassword,
        deleteUserAccount
    }

    return (
        <AuthContext.Provider value={value}>
          {!loading && children}
        </AuthContext.Provider>
      )
}