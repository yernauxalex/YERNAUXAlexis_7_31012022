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
      <h4>
        Commentaire de {props.firstname} {props.lastname}
      </h4>
      <p>comment{props.data_comment}</p>
    </React.Fragment>
  )
}

export default Comment
