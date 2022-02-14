import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Utils/AuthContext'

// Appel API
async function fetchData(credentials) {
  return fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json())
}

function Signin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setAuthState } = useContext(AuthContext)
  const navigate = useNavigate()

  // Fonction appelée lors du submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await fetchData({
      email,
      password,
    })
    // Création du token dans le sessionStorage et initialisation du context
    sessionStorage.setItem('accessToken', data.token)
    setAuthState({
      id: data.userId,
      token: data.token,
      status: true,
    })
    const userInfo = {
      id_user: data.userId,
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      last_interaction: data.last_interaction,
    }
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    navigate('/')
  }

  return (
    <div className="form">
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email </label>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>Mot de passe </label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  )
}

// const useFormInput = (initialValue) => {
//   const [value, setValue] = useState(initialValue)

//   const handleChange = (e) => {
//     setValue(e.target.value)
//   }
//   return {
//     value,
//     onChange: handleChange,
//   }
// }

export default Signin
