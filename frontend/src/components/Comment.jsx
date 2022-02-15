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
      <StyledName>Name comment{props.id_author_comment}</StyledName>
      <StyledCommentText>comment{props.data_comment}</StyledCommentText>
    </StyledComment>
  )
}

export default Comment
