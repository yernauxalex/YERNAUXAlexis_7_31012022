import styled from 'styled-components'
import font from '../cssValue'

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
export default StyledSubContainer
