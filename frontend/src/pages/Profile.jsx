import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Utils/AuthContext'

// Appel API
async function fetchDelete(id, token) {
  return fetch(`http://localhost:3000/api/auth/delete/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
}

function Profile(props) {
  const { authState, setAuthState } = useContext(AuthContext)
  let navigate = useNavigate()
  const userInfo = JSON.parse(localStorage.getItem('userInfo')) // appel API getProfile ou localstorage

  const handleLogout = () => {
    setAuthState({ id: '', token: '', status: false })
    localStorage.removeItem('userInfo')
    navigate('/signin')
  }

  const handleDelete = async (e) => {
    const token = authState.token
    const id = authState.id
    await fetchDelete(id, token)
    setAuthState({ id: '', token: '', status: false })
    localStorage.removeItem('userInfo')
    navigate('/signup')
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
      <input
        type="button"
        onClick={handleDelete}
        value="Suppression du compte"
        className="deleteAccount"
      />
    </div>
  )
}

export default Profile
