import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Utils/AuthContext'
import { StyledCard } from '../styles/styledComponent'
import Comment from './Comment'

// Appel API
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

function Card(props) {
  const [data, setData] = useState([])
  const [data_content, setComment] = useState('')
  const [isDataLoading, setDataLoading] = useState(false)
  const { authState } = useContext(AuthContext)
  const navigate = useNavigate()
  const commentList = []
  const token = authState.token
  const id = props.id_content
  const lsUser = JSON.parse(localStorage.getItem('userInfo'))
  const id_user = lsUser.id_user

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
      alert('Commentaire crée')
    }
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
      }
    }
    fetchComment()
  }, [])

  return (
    <StyledCard>
      <div>
        <h3>
          Post de {props.firstname} {props.lastname}
        </h3>
        <p>{props.text_content}</p>
        {props.media === true ? (
          <div className="img-container">
            <img src={props.media_content} alt="A remplir" />
          </div>
        ) : (
          <br />
        )}
      </div>
      <form>
        <div className="input-container">
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
        <div>
          {data.map((dataObj) => (
            <Comment {...dataObj} />
          ))}
        </div>
      )}
    </StyledCard>
  )
}

export default Card
