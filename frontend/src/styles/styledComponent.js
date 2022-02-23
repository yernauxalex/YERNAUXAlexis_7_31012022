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
  align-items: center;
  row-gap: 5%;
  column-gap: 1%;
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`
// Carte
const StyledCard = styled.article`
  display: flex;
  flex-flow: column wrap;
  flex-basis: 0;
  background-color: #deebff;
  margin-top: 1%;
  border-radius: 26px;
  padding: 1%;
  max-width: 100%;

  box-shadow: 0px 5px 20px #999;
  height: fit-content;

  .content-container {
    display: flex;
    flex-direction: column;
    height: fit-content;
    max-height: 600px;
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
    overflow: auto;
  }
  .img-container {
    height: 504px;
    position: relative;
    overflow: hidden;
  }
  img {
    max-width: 100%;
    height: auto;
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
  StyledContainer,
  StyledNavBar,
  StyledCard,
  StyledSubContainer,
  StyledLink,
  StyledLinkProfile,
}
