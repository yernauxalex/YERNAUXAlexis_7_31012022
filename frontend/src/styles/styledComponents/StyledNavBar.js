import styled from 'styled-components'
import colors from '../colors'

// Navbar
const StyledNavBar = styled.nav`
  max-width: 100%;
  border-bottom: solid 3px black;
  background-color: ${colors.backgroundPrimary};
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
    flex-direction: row;
    justify-content: center;
    padding-left: 0px;
    column-gap: 1vw;
  }
  li {
    display: flex;
    flex-direction: row;
    text-decoration: none;
  }
  a {
    color: ${colors.text};
  }
  img {
    height: 10vh;
    width: 30vw;
  }
  input {
    border-radius: 26px;
  }
  @media screen and (min-width: 768px) {
    h1 {
      font-size: 42px;
      color: ${colors.text};
    }
    .logo_header {
      color: black;
      text-align: right;
      display: flex;
      flex-wrap: nowrap;
      justify-content: center;
      flex-direction: row;
      align-items: center;
    }
    ul {
      font-size: 20px;
      margin-top: 0px;
    }
  }
`
export default StyledNavBar
