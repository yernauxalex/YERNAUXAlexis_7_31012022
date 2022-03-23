import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal'

import { AuthContext } from '../Utils/AuthContext'
import { ModalContext } from '../Utils/ModalContext'
import logo from '../assets/icon-left-font-monochrome-white.svg'
import StyledNavBar from '../styles/styledComponents/StyledNavBar'
import StyledLink from '../styles/styledComponents/StyledLink'
import CreatePost from './CreatePost'
import colors from '../styles/colors'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '26px',
    backgroundColor: colors.primary,
  },
}

function Nav() {
  const { authState, setAuthState } = useContext(AuthContext)
  const { setModalState } = useContext(ModalContext)
  let navigate = useNavigate()
  setModalState(false)
  const handleLogout = () => {
    setAuthState({ id: '', token: '', status: false })
    localStorage.clear()
    navigate('/signin')
  }

  // Gestion du modal

  const [modalIsOpen, setIsOpen] = React.useState(false)

  function openModal() {
    Modal.setAppElement('#root')
    setIsOpen(true)
  }

  function afterOpenModal() {}

  function closeModal() {
    setModalState(true)
    setIsOpen(false)
  }
  return (
    <StyledNavBar>
      <div className="logo_header">
        <img src={logo} alt="Logo de groupomania" />
      </div>
      <ul>
        {!authState.status ? (
          <React.Fragment>
            <li>
              <StyledLink to="/signup">Inscription</StyledLink>
            </li>
            <li>
              <StyledLink
                to="/signin"
                className="navbarlist__link"
                setAuthState={setAuthState}
              >
                Connexion
              </StyledLink>
            </li>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <li>
              <StyledLink to="/">Accueil</StyledLink>
            </li>
            <li>
              <StyledLink
                to={`/PublicProfile/${authState.id}`}
                className="navbarlist__link"
              >
                Profil
              </StyledLink>
            </li>
            <li>
              <StyledLink to="/profile">Paramètres</StyledLink>
            </li>
            <li>
              <input type="button" onClick={openModal} value="Partager" />
            </li>
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Création d'une publication"
            >
              <CreatePost fc={closeModal} />
            </Modal>
            <li>
              <input type="button" onClick={handleLogout} value="Déconnexion" />
            </li>
          </React.Fragment>
        )}
      </ul>
    </StyledNavBar>
  )
}

export default Nav
