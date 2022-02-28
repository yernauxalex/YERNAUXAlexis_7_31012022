import styled from 'styled-components'
import font from '../cssValue'

// PublicProfile
const StyledModalContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 26px;

    width: 100%;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-item: center;
    row-gap: 0.5vh;
  }
  .input-container {
    width: 100%;
    display: flex;
    column-gap: 1vw;
  }
  h2 {
    font-size: ${font.h2};
    display: flex;
    justify-content: center;
    width: 100%;
  }
  p {
  }
  textarea {
    resize: fit-content;
  }
`
export default StyledModalContainer
