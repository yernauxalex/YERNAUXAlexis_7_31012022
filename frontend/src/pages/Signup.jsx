import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Appel API
async function fetchSignup(credentials) {
  return fetch('http://localhost:3000/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json())
}

function Signup() {
  const [email, setEmail] = useState('')
  const [lastname, setLastname] = useState('')
  const [firstname, setFirstname] = useState('')
  const [password, setPassword] = useState('')
  let navigate = useNavigate()

  // Fonction appelée lors du submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetchSignup({
      email,
      lastname,
      firstname,
      password,
    })
    navigate('/Signin')
  }

  return (
    <div>
      <h1>Inscription</h1>
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
          <label>Nom </label>
          <input
            type="text"
            name="lastname"
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>Prénom </label>
          <input
            type="text"
            name="firstname"
            onChange={(e) => setFirstname(e.target.value)}
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

export default Signup
