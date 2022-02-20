import React from 'react'
import styled from 'styled-components'

// Bouton pour la création d'un commentaire à ajouter

const StyledComment = styled.div`
  display: flex;
  flex-flow: colum wrap;
  flex-direction: column;
`
function Comment(props) {
  return (
    <React.Fragment>
      <h4>Name comment{props.id_author_comment}</h4>
      <p>comment{props.data_comment}</p>
    </React.Fragment>
  )
}

export default Comment
