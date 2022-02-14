import styled from 'styled-components'
import Comment from './Comment'

const StyledContainer = styled.article`
  display: flex;
  flex-flow: colum wrap;
  flex-direction: column;
`
const StyledContent = styled.div`
  display: flex;
  flex-flow: colum wrap;
  flex-direction: column;
`

const StyledText = styled.p``
const StyledTitle = styled.h3`
  font-size: 15px;
`

function Card(props) {
  const commentProps = {
    author: props.commentAuthor,
    text: props.commentText,
  }
  return (
    <StyledContainer>
      <StyledContent>
        <StyledTitle>Nom auteur {props.author}</StyledTitle>
        <StyledText>content{props.content}</StyledText>
        {/*<img src={props.src} alt={props.scratl} /> */}
      </StyledContent>
      <Comment comment={commentProps} />
    </StyledContainer>
  )
}

export default Card