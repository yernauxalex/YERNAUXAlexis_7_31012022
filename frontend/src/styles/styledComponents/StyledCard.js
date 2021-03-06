import styled from 'styled-components'
import colors from '../colors'
import font from '../cssValue'

// Carte
const StyledCard = styled.article`
  display: flex;
  flex-flow: column;
  flex-basis: 0;
  background-color: ${colors.primary};
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
    color: ${colors.textCard};
  }
  .card-title {
    font-size: ${font.h2};
    text-align: center;
    margin: 5px 0 2px 0;
  }
  a {
    color: ${colors.textCard};
    text-decoration: none;
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
  .button-container {
    display: flex;
    column-gap: 1vw;
    justify-content: flex-end;
    padding: 0 0.5vw 0.5vw 0;
  }
  .delete-button {
    width: 5vw;
    min-width: fit-content;
    border-radius: 26px;
  }
  .like-button {
    width: 5vw;
    min-width: fit-content;
    border-radius: 26px;
  }
  form {
    margin: 2px 0 5px 0;
    color: ${colors.textCard};
  }
  .new-comment-container {
    display: flex;
    flex-direction: column;
    height: fit-content;
  }
  textarea {
    background-color: ${colors.secondary};
    color: ${colors.textCard};
    resize: none;
  }
  textarea::placeholder {
    color: ${colors.textCard};
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
    color: ${colors.textCard};
  }
  p {
    padding: 0 1vw 0 1vw;
  }
  .comment-button {
    width: 5vw;
    min-width: fit-content;
    border-radius: 26px;
  }
  h3 {
    font-size: ${font.h3};
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
export default StyledCard
