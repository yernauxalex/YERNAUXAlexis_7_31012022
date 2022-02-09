import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { AuthContext } from '../Utils/AuthContext'

const StyledNavBar = styled.ul`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
`
const StyledLink = styled(Link)`
  display: flex;
  flex-direction: row;
  text-decoration: none;
  padding: 10px;
`

function Nav() {
  const { authState, setAuthState } = useContext(AuthContext)
  let navigate = useNavigate()

  const handleLogout = () => {
    setAuthState({ id: '', token: '', status: false })
    localStorage.removeItem('userInfo')
    navigate('/signin')
  }

  if (!authState.status) {
    return (
      <nav className="navbar">
        <StyledNavBar>
          <StyledLink to="/" className="navbarlist__link">
            Accueil
          </StyledLink>
          <StyledLink to="/signup" className="navbarlist__link">
            Inscription
          </StyledLink>
          <StyledLink
            to="/signin"
            className="navbarlist__link"
            setAuthState={setAuthState}
          >
            Connexion
          </StyledLink>
        </StyledNavBar>
      </nav>
    )
  }
  return (
    <nav className="navbar">
      <StyledNavBar>
        <StyledLink to="/" className="navbarlist__link">
          Accueil
        </StyledLink>
        <StyledLink to="/profile" className="navbarlist__link">
          Profil
        </StyledLink>
        <StyledLink to="/CreatePost" className="navbarlist__link">
          Partager
        </StyledLink>
        <input type="button" onClick={handleLogout} value="Déconnexion" />
      </StyledNavBar>
    </nav>
  )
}

export default Nav
