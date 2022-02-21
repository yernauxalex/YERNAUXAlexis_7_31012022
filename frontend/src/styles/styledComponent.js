import { Link } from 'react-router-dom'
import styled from 'styled-components'
import font from './cssValue'

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    font-size: ${font.h1};
    display: flex;
    justify-content: center;
    width: 100%;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  .input-container {
    display: flex;
    justify-content: center;
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
const StyledCard = styled.article`
  display: flex;
  flex-flow: column wrap;
  background-color: #deebff;
  border-radius: 26px;
  padding: 5%;
  margin: 5%;
  max-width: 100%;
  box-shadow: 0px 5px 20px #999;
  div {
    display: flex;
    flex-direction: column;
    height: fit-content;
  }
  h3 {
    font-size: 15px;
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
  textarea {
    resize: none;
  }
  @media screen and (min-width: 768px) {
    width: 520px;
    padding: 1.5%;
    margin: 1.5%;
    .img-container {
      witdh: 504px;
    }
    img {
      max-width: 100%;
      position: absolute;
      left: 33%;
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
const StyledLinkProfile = styled(Link)``

export {
  StyledContainer,
  StyledNavBar,
  StyledCard,
  StyledLink,
  StyledLinkProfile,
}
