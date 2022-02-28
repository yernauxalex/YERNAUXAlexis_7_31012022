import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal'

import { AuthContext } from '../Utils/AuthContext'
import logo from '../assets/icon.svg'
import StyledNavBar from '../styles/styledComponents/StyledNavBar'
import StyledLink from '../styles/styledComponents/StyledLink'
import CreatePost from './CreatePost'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

function Nav() {
  const { authState, setAuthState } = useContext(AuthContext)
  let navigate = useNavigate()

  const handleLogout = () => {
    setAuthState({ id: '', token: '', status: false })
    localStorage.removeItem('userInfo')
    sessionStorage.removeItem('accessToken')
    navigate('/signin')
  }

  // Gestion du modal
  let subtitle
  const [modalIsOpen, setIsOpen] = React.useState(false)

  function openModal() {
    setIsOpen(true)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00'
  }

  function closeModal() {
    setIsOpen(false)
  }
  return (
    <StyledNavBar>
      <div className="logo_header">
        <img src={logo} alt="Logo de groupomania" />
        <h1>Groupomania</h1>
      </div>
      <ul>
        {!authState.status ? (
          <React.Fragment>
            <StyledLink to="/signup">Inscription</StyledLink>
            <StyledLink
              to="/signin"
              className="navbarlist__link"
              setAuthState={setAuthState}
            >
              Connexion
            </StyledLink>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <StyledLink to="/">Accueil</StyledLink>
            <StyledLink
              to={`/PublicProfile/${authState.id}`}
              className="navbarlist__link"
            >
              Profil
            </StyledLink>
            <StyledLink to="/profile">Paramètres</StyledLink>
            <input type="button" onClick={openModal} value="Partager" />
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Création d'une publication"
            >
              <CreatePost fc={closeModal} />
            </Modal>
            <input type="button" onClick={handleLogout} value="Déconnexion" />
          </React.Fragment>
        )}
      </ul>
    </StyledNavBar>
  )
}

export default Nav
