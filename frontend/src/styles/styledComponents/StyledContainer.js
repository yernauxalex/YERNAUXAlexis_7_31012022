import styled from 'styled-components'
import font from '../cssValue'

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
export default StyledContainer
