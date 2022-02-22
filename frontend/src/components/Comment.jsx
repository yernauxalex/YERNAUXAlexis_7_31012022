import React from 'react'
import { StyledLinkProfile } from '../styles/styledComponent'

function Comment(props) {
  return (
    <div className="comment-container">
      <h4>
        <StyledLinkProfile to={`/PublicProfile/${props.id_author_comment}`}>
          Commentaire de {props.firstname} {props.lastname}
        </StyledLinkProfile>
      </h4>
      <p>comment{props.data_comment}</p>
    </div>
  )
}

export default Comment
