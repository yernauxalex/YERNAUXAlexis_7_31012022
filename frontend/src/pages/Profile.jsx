import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Utils/AuthContext'
import StyledSubContainer from '../styles/styledComponents/StyledSubContainer'
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
async function fetchDelete(id_user, token) {
  return fetch(`http://localhost:3000/api/auth/delete/${id_user}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
}

async function fetchChangePwd(credentials, id_user, token) {
  return fetch(`http://localhost:3000/api/auth/changepswd/${id_user}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(credentials),
  })
}

function Profile(props) {
  const { authState, setAuthState } = useContext(AuthContext)
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const navigate = useNavigate()
  const userInfo = JSON.parse(localStorage.getItem('userInfo')) // appel API getProfile ou localstorage
  const token = authState.token
  const id_user = authState.id

  const handleLogout = () => {
    setAuthState({ id: '', token: '', status: false })
    localStorage.clear()
    navigate('/signin')
  }

  const handleDelete = async (e) => {
    await fetchDelete(id_user, token)
    setAuthState({ id: '', token: '', status: false })
    localStorage.clear()
    navigate('/signup')
  }
  const newPassword = async (e) => {
    e.preventDefault()
    if (password1 === password2) {
      if (schema.validate(password1)) {
        await fetchChangePwd(
          {
            password1,
            password2,
          },
          id_user,
          token
        )
        setAuthState({ id: '', token: '', status: false })
        localStorage.clear()
        navigate('/signin')
      } else {
        alert(
          'Format du  mot de passe invalide, 8 caratères minimum, dont une majuscule, une minuscule, un caractrère spécial (#?!@$%^&*-.) et un chiffre'
        )
      }
    } else {
      alert('Les mots de passes doivent être identiques')
    }
  }
  return (
    <StyledSubContainer>
      <h1>Espace personnel</h1>
      <section>
        <h2>
          Bienvenue {userInfo.firstname} {userInfo.lastname}
        </h2>
        <p></p>
      </section>
      <form>
        <h3>Changement de mot de passe</h3>
        <div className="input-container">
          <label>Nouveau mot de passe</label>
          <input
            type="password"
            name="password1"
            onChange={(e) => setPassword1(e.target.value)}
            aria-label="Entrez votre nouveau mot de passe"
            aria-required="true"
          />
        </div>
        <div className="input-container">
          <label>Retapez le mot de passe</label>
          <input
            type="password"
            name="password2"
            onChange={(e) => setPassword2(e.target.value)}
            aria-label="Entrez à nouveau votre nouveau mot de passe"
            aria-required="true"
          />
        </div>
        <input type="button" value="Valider" onClick={newPassword} />
      </form>
      <input type="button" onClick={handleLogout} value="Déconnexion" />
      <input
        type="button"
        onClick={handleDelete}
        value="Suppression du compte"
        className="deleteAccount"
      />
    </StyledSubContainer>
  )
}

export default Profile
