import styled from 'styled-components'

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
export default StyledGlobalContainer
