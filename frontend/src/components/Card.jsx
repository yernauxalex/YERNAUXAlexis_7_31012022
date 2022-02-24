import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Utils/AuthContext'
import { StyledCard, StyledLinkProfile } from '../styles/styledComponent'
import Comment from './Comment'

// Appel API
// Ajout d'un nouveau commentaire
async function fetchNewComment(credentials, id_user, id_content, token) {
  return fetch(`http://localhost:3000/api/comment/${id_content}/${id_user}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(credentials),
  })
}

// Suppression d'un post par son auteur
async function fetchDeletePost(id_user, id_content, token) {
  return fetch(`http://localhost:3000/api/content/${id_user}/${id_content}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
}

function Card(props) {
  const [refresh, setRefresh] = useState(false)
  const [data, setData] = useState([])
  const [data_content, setComment] = useState('')
  const [isDataLoading, setDataLoading] = useState(false)
  const { authState } = useContext(AuthContext)
  const navigate = useNavigate()
  const commentList = []
  const token = authState.token
  const id_user = authState.id
  const id = props.id_content
  //const lsUser = JSON.parse(localStorage.getItem('userInfo'))
  //const id_user = lsUser.id_user

  const newComment = async (e) => {
    e.preventDefault()
    if (!data_content.replace(/\s/g, '').length) {
      alert('Votre commentaire ne peut pas être vide')
    } else {
      await fetchNewComment(
        {
          data_content,
        },
        id_user,
        id,
        token
      )
      setRefresh(true)
      alert('Commentaire crée')
    }
  }

  const deletePost = async (e) => {
    e.preventDefault()
    await fetchDeletePost(id_user, id, token)
    setRefresh(true)
    alert('Post supprimé')
  }

  useEffect(() => {
    async function fetchComment() {
      setDataLoading(true)
      try {
        const response = await fetch(
          `http://localhost:3000/api/comment/${id_user}/${id}`,
          {
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + token,
            },
          }
        )
        const data = await response.json()
        if (!sessionStorage.getItem('accessToken')) {
          navigate('/signin')
        } else {
          for (let index = 0; index < 5; index++) {
            if (data.datajson[index] != null) {
              commentList.push(data.datajson[index])
            }
          }
          setData(commentList)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setDataLoading(false)
        setRefresh(false)
      }
    }
    fetchComment()
  }, [refresh])

  return (
    <StyledCard>
      <div className="content-container">
        <h3 className="card-title">
          <StyledLinkProfile to={`/PublicProfile/${props.id_author}`}>
            Post de {props.firstname} {props.lastname}
          </StyledLinkProfile>
        </h3>
        <p className="card-content">{props.text_content}</p>
        {props.media === true ? (
          <div className="img-container">
            <a href={props.media_content} target="_blank" rel="noreferrer">
              <img src={props.media_content} alt="A remplir" />
            </a>
          </div>
        ) : null}
        {props.id_author === authState.id ? (
          <input
            type="button"
            value="Supprimer"
            className="delete-button"
            onClick={deletePost}
          />
        ) : null}
      </div>
      <form>
        <div className="new-comment-container">
          <label>Commenter:</label>
          <textarea
            name="comment"
            rows="4"
            cols="10"
            required
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <input type="button" value="Envoyer" onClick={newComment} />
      </form>
      {isDataLoading ? (
        <br />
      ) : (
        <div className="allcomment-container">
          {data.map((dataObj) => (
            <Comment {...dataObj} />
          ))}
        </div>
      )}
    </StyledCard>
  )
}

export default Card
