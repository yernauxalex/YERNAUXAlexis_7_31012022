import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StyledContainer } from '../styles/styledComponent'
const emailValidator = require('email-validator')
const passwordValidator = require('password-validator')

// Création du schéma pour le mot de passe
const schema = new passwordValidator()
//prettier-ignore
schema
  .is().min(8)
  .is().max(100)
  .has().uppercase()
  .has().lowercase()
  .has().symbols()
  .has().digits(1)
  .has().not().spaces()

// Appel API
async function fetchSignup(credentials) {
  return fetch('http://localhost:3000/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then((data) => data.json())
    .catch((error) => console.log(error))
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
    if (emailValidator.validate(email)) {
      if (schema.validate(password)) {
        await fetchSignup({
          email,
          lastname,
          firstname,
          password,
        })
        navigate('/Signin')
      } else {
        alert(
          'Format du  mot de passe invalide, 8 caratères minimum, dont une majuscule, une minuscule, un caractrère spécial (#?!@$%^&*-.) et un chiffre'
        )
      }
    } else {
      alert('Format du mail invalide')
    }
  }

  return (
    <StyledContainer>
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
    </StyledContainer>
  )
}

export default Signup
