import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { AuthContext } from '../Utils/AuthContext'
import logo from '../assets/icon.svg'

const StyledNavBar = styled.nav`
  width: 100%;
  border-bottom: solid 3px black;
  #root {
    width: 100%;
    margin: 0;
  }
  .logo_header {
    color: black;
    text-align: right;
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
  }
  ul {
    display: flex;
  }
  @media screen and (min-width: 768px) {
    h1 {
      font-size: 42px;
    }
    .logo_header {
      color: black;
      text-align: right;
      padding: 12px;
      display: flex;
      flex-wrap: nowrap;
      justify-content: center;
      flex-direction: row;
      align-items: center;
    }
    ul {
      display: flex;
      justify-content: center;
      flex-direction: row;
      font-size: 20px;
      margin-top: 0px;
    }
  }
`
const StyledLink = styled(Link)`
  display: flex;
  flex-direction: row;
  text-decoration: none;
  padding: 1.5%;
  @media screen and (min-width: 768px) {
    padding: 10px;
  }
`

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
        <img src={logo} alt="Logo de groupomania" className="gpm-logo" />
        <h1>Groupomania</h1>
      </div>
      <ul>
        {!authState.status ? (
          <React.Fragment>
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
          </React.Fragment>
        ) : (
          <React.Fragment>
            <StyledLink to="/" className="navbarlist__link">
              Accueil
            </StyledLink>
            <StyledLink to="/PublicProfile" className="navbarlist__link">
              Profil
            </StyledLink>
            <StyledLink to="/profile" className="navbarlist__link">
              Paramètres
            </StyledLink>
            <StyledLink to="/CreatePost" className="navbarlist__link">
              Partager
            </StyledLink>
            <input type="button" onClick={handleLogout} value="Déconnexion" />
          </React.Fragment>
        )}
      </ul>
    </StyledNavBar>
  )
}

export default Nav
