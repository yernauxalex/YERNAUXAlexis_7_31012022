import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthContext } from './Utils/AuthContext'

import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import PublicProfile from './pages/PublicProfile'
import Error from './components/Error'

function App() {
  const [authState, setAuthState] = useState({
    id: '',
    token: '',
    status: false,
  })
  useEffect(() => {
    const log = JSON.parse(localStorage.getItem('userInfo'))
    if (log != null) {
      setAuthState({
        id: log.id_user,
        token: log.accessToken,
        status: true,
      })
    } else {
      // State contenant le token de connection
      setAuthState({
        id: '',
        token: '',
        status: false,
      })
    }
  }, [])

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/publicProfile" element={<PublicProfile />} />
          <Route
            path="/publicProfile/:id_profile"
            element={<PublicProfile />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </AuthContext.Provider>
    </BrowserRouter>
  )
}
export default App
