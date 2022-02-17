import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { AuthContext } from './Utils/AuthContext'

import Header from './components/Header'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import PublicProfile from './pages/PublicProfile'
import CreatePost from './pages/CreatePost'
import Error from './components/Error'

function App() {
  // State contenant le token de connection
  const [authState, setAuthState] = useState({
    id: '',
    token: '',
    status: false,
  })

  //let navigate = useNavigate()

  // if (!authState) {
  //   return (
  //     <BrowserRouter>
  //       <Header />
  //       <Routes>
  //         <Route path="/" element={<Home />} />
  //         <Route path="/signup" element={<Signup />} />
  //         <Route path="/signin" element={<Signin />} setAuthState={authState} />
  //         <Route path="*" element={<Error />} />
  //       </Routes>
  //     </BrowserRouter>
  //   )
  // }

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/publicProfile" element={<PublicProfile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  )
}
export default App
