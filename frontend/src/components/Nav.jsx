import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { AuthContext } from '../Utils/AuthContext'
import logo from '../assets/icon.svg'
import { StyledNavBar, StyledLink } from '../styles/styledComponent'

function Nav() {
  const { authState, setAuthState } = useContext(AuthContext)
  let navigate = useNavigate()

  const handleLogout = () => {
    setAuthState({ id: '', token: '', status: false })
    localStorage.removeItem('userInfo')
    sessionStorage.removeItem('accessToken')
    navigate('/signin')
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
            <StyledLink to="/CreatePost">Partager</StyledLink>
            <input type="button" onClick={handleLogout} value="Déconnexion" />
          </React.Fragment>
        )}
      </ul>
    </StyledNavBar>
  )
}

export default Nav
