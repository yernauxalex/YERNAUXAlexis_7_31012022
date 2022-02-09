import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Utils/AuthContext'

function Profile(props) {
  const { setAuthState } = useContext(AuthContext)
  let navigate = useNavigate()
  const userInfo = JSON.parse(localStorage.getItem('userInfo')) // appel API getProfile ou localstorage

  const handleLogout = () => {
    setAuthState({ id: '', token: '', status: false })
    localStorage.removeItem('userInfo')
    navigate('/signin')
  }
  return (
    <div>
      <h1>Espace personnel</h1>
      <section>
        <h2>
          Bienvenue {userInfo.firstname} {userInfo.lastname}
        </h2>
        <p></p>
      </section>
      <section>
        <h3>Dernière publication {userInfo.last_interaction}</h3>
      </section>
      <input type="button" onClick={handleLogout} value="Déconnexion" />
    </div>
  )
}

export default Profile
