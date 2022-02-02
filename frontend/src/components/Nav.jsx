import { Link } from 'react-router-dom'
import styled from 'styled-components'

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
    return (
        <nav className="navbar">
            <StyledNavBar>
                <StyledLink to="/" className="navbarlist__link">
                    Accueil
                </StyledLink>
                <StyledLink to="/signup" className="navbarlist__link">
                    Connexion
                </StyledLink>
                <StyledLink to="/signin" className="navbarlist__link">
                    Inscription
                </StyledLink>
                <StyledLink to="/profile" className="navbarlist__link">
                    Profil
                </StyledLink>
            </StyledNavBar>
        </nav>
    )
}

export default Nav
