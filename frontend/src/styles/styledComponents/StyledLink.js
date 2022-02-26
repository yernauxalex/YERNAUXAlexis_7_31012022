import { Link } from 'react-router-dom'
import styled from 'styled-components'

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
export default StyledLink
