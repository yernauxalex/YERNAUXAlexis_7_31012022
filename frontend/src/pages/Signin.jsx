import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { AuthContext } from '../Utils/AuthContext'

async function fetchData(credentials) {
  return fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json())
}

function Signin({ setToken }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setAuthState } = useContext(AuthContext)
  let navigate = useNavigate()

  // Fonction appelé lors du submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await fetchData({
      email,
      password,
    })
    // Création du token dans le sessionStorage
    sessionStorage.setItem('accessToken', data.token)
    setAuthState({
      id: data.userId,
      token: data.token,
      status: true,
    })
    navigate('/')
  }

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email </label>
          <input
            type="text"
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
Signin.propTypes = {
  setToken: PropTypes.func.isRequired,
}

export default Signin
