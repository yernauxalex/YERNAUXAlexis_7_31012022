import { Link } from 'react-router-dom'
import styled from 'styled-components'
import font from './cssValue'

// Signin Signup page
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: ${font.h1};
    display: flex;
    justify-content: center;
    width: 100%;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: fit-content;
  }
  .input-container {
    display: flex;
    justify-content: flex-end;
    margin: 5px;
  }
  .button-container {
    display: flex;
    justify-content: center;
  }
  label {
    margin-right: 5px;
  }
  @media screen and (min-width: 768px) {
  }
`
// Navbar
const StyledNavBar = styled.nav`
  max-width: 100%;
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
    flex-direction: row;
    justify-content: center;
    padding-left: 0px;
  }
  img {
    height: 50px;
    width: 50px;
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

      flex-direction: row;
      font-size: 20px;
      margin-top: 0px;
    }
  }
`
// Conteneur Homepage
const StyledGlobalContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  column-gap: 5vw;
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`
// Conteneur column homepage
const StyledColumnContainer = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 2vh;
`
// Carte
const StyledCard = styled.article`
  display: flex;
  flex-flow: column;
  flex-basis: 0;
  background-color: #deebff;
  margin-top: 1%;
  border-radius: 26px;
  padding: 1%;
  max-width: 100%;
  min-width: 80%;
  box-shadow: 0px 5px 20px #999;
  height: fit-content;

  .content-container {
    display: flex;
    flex-direction: column;
    height: fit-content;
    border: 1px solid #000000;
    border-radius: 26px;
  }
  .card-title {
    font-size: 15px;
    text-align: center;
    margin: 5px 0 2px 0;
  }
  .card-content {
    padding-left: 5px;
    padding-right: 5px;
    max-height: 450px;
    overflow: auto;
  }
  .img-container {
    display: flex;
    justify-content: center;
    height: fit-content;
    overflow: auto;
  }
  img {
    max-width: 100%;
    height: auto;
    border-radius: 26px;
  }
  img.expanded {
    max-width: none;
  }
  .delete-button {
    width: 5vw;
  }
  form {
    margin: 2px 0 5px 0;
  }
  .new-comment-container {
    display: flex;
    flex-direction: column;
    height: fit-content;
  }
  textarea {
    resize: none;
  }
  .allcomment-container {
    display: flex;
    flex-direction: column;
    row-gap: 4px;
    max-height: 240px;
    overflow: auto;
  }
  .comment-container {
    border: 1px solid #000000;
    border-radius: 26px;
  }
  h4 {
    font-size: 15px;
    text-align: center;
    margin: 5px 0 2px 0;
  }
  @media screen and (min-width: 768px) {
    max-width: 520px;
    min-width: 520px;
    .img-container {
      witdh: 504px;
    }
    img {
      max-width: 100%;
    }
  }
`
// PublicProfile
const StyledSubContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: ${font.h1};
    display: flex;
    justify-content: center;
    width: 100%;
  }
  h2 {
    font-size: ${font.h2};
    display: flex;
    justify-content: center;
    width: 100%;
  }
  p {
  }
`
// Lien dans la navbar
const StyledLink = styled(Link)`
  display: flex;
  flex-direction: row;
  text-decoration: none;
  padding: 1.5%;
  @media screen and (min-width: 768px) {
    padding: 10px;
  }
`
// Lien vers profil sur les cartes
const StyledLinkProfile = styled(Link)``

export {
  StyledGlobalContainer,
  StyledColumnContainer,
  StyledContainer,
  StyledNavBar,
  StyledCard,
  StyledSubContainer,
  StyledLink,
  StyledLinkProfile,
}
