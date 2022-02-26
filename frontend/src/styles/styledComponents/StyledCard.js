import styled from 'styled-components'

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
    min-width: fit-content;
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
export default StyledCard
