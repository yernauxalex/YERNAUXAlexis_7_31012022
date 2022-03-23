import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Utils/AuthContext'
import StyledContainer from '../styles/styledComponents/StyledContainer'

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
    if (!data.error) {
      setAuthState({
        id: data.id_user,
        token: data.token,
        status: true,
        admin_status: data.admin_status,
      })
      const userInfo = {
        id_user: data.id_user,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        last_interaction: data.last_interaction,
        interaction_type: data.interaction_type,
        accessToken: data.token,
      }
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
      navigate('/')
    } else {
      alert('Email ou mot de passe incorrect')
    }
  }

  return (
    <StyledContainer>
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email </label>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Entrez votre email"
            aria-required="true"
          />
        </div>
        <div className="input-container">
          <label>Mot de passe </label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Entrez votre mot de passe"
            aria-required="true"
          />
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </StyledContainer>
  )
}

export default Signin
