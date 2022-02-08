import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
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
  const { setAuthState } = useContext(AuthContext)
  //const [authState, setAuthState] = useState()

  const handleLogout = () => {
    localStorage.clear()
  }

  // if (!authState) {
  //   return (
  //     <nav className="navbar">
  //       <StyledNavBar>
  //         <StyledLink to="/" className="navbarlist__link">
  //           Accueil
  //         </StyledLink>
  //         <StyledLink to="/signup" className="navbarlist__link">
  //           Inscription
  //         </StyledLink>
  //         <StyledLink
  //           to="/signin"
  //           className="navbarlist__link"
  //           setAuthState={setAuthState}
  //         >
  //           Connexion
  //         </StyledLink>
  //       </StyledNavBar>
  //     </nav>
  //   )
  // }
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
        <StyledLink to="/profile" className="navbarlist__link">
          Profil
        </StyledLink>
        <input type="button" onClick={handleLogout} value="Déconnexion" />
      </StyledNavBar>
    </nav>
  )
}

export default Nav
