import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Utils/AuthContext'
import { StyledLinkProfile } from '../styles/styledComponent'

// Appel API
// Suppression d'un commentaire
async function fetchDeleteComment(id_user, id_content, token) {
  return fetch(`http://localhost:3000/api/comment/${id_user}/${id_content}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
}

function Comment(props) {
  const { authState } = useContext(AuthContext)
  const token = authState.token
  const id_user = authState.id
  const id = props.id_comment
  const deleteComment = async (e) => {
    e.preventDefault()
    await fetchDeleteComment(id_user, id, token)
    alert('Commentaire supprimé')
  }

  return (
    <div className="comment-container">
      <h4>
        <StyledLinkProfile to={`/PublicProfile/${props.id_author_comment}`}>
          Commentaire de {props.firstname} {props.lastname}
        </StyledLinkProfile>
      </h4>
      <p>comment{props.data_comment}</p>
      {props.id_author_comment === authState.id ? (
        <input type="button" value="Supprimer" onClick={deleteComment} />
      ) : null}
    </div>
  )
}

export default Comment
