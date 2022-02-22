import React from 'react'
import { StyledLinkProfile } from '../styles/styledComponent'

function Comment(props) {
  return (
    <React.Fragment>
      <h4>
        <StyledLinkProfile to={`/PublicProfile/${props.id_author_comment}`}>
          Commentaire de {props.firstname} {props.lastname}
        </StyledLinkProfile>
      </h4>
      <p>comment{props.data_comment}</p>
    </React.Fragment>
  )
}

export default Comment
