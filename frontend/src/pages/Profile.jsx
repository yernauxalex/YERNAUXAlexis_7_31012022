import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Utils/AuthContext'

function Profile(props) {
  const { setAuthState } = useContext(AuthContext)
  let navigate = useNavigate()

  const handleLogout = () => {
    setAuthState({ id: '', token: '', status: false })
    navigate('/signin')
  }
  return (
    <div>
      <h1>Espace personnel</h1>
      <input type="button" onClick={handleLogout} value="Déconnexion" />
    </div>
  )
}

export default Profile
