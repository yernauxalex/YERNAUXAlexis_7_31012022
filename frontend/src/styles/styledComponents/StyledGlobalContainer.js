import styled from 'styled-components'
import colors from '../colors'

// Conteneur Homepage
const StyledGlobalContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  column-gap: 5vw;
  background-color: ${colors.backgroundSecondary};
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`
export default StyledGlobalContainer
