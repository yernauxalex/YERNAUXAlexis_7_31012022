import styled from 'styled-components'

// Bouton pour la création d'un commentaire à ajouter

const StyledComment = styled.div`
  display: flex;
  flex-flow: colum wrap;
  flex-direction: column;
`
const StyledName = styled.h4``
const StyledCommentText = styled.p``
function Comment(props) {
  return (
    <StyledComment>
      <StyledName>Name comment{props.author}</StyledName>
      <StyledCommentText>comment{props.text}</StyledCommentText>
    </StyledComment>
  )
}

export default Comment
