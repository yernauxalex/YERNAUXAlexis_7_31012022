import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Utils/AuthContext'
import styled from 'styled-components'
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

const StyledContainer = styled.article`
  display: flex;
  flex-flow: column wrap;
  background-color: #deebff;
  border-radius: 26px;
  padding: 5%;
  margin: 5%;
`
const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledText = styled.p``
const StyledTitle = styled.h3`
  font-size: 15px;
`

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
  console.log(data_content)

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
        console.log(data)
        if (!sessionStorage.getItem('accessToken')) {
          navigate('/signin')
        } else {
          for (let index = 0; index < 5; index++) {
            if (data.datajson[index] != null) {
              commentList.push(data.datajson[index])
              console.log(data.datajson[index])
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
    <StyledContainer>
      <StyledContent>
        <StyledTitle>Nom auteur {props.id_author}</StyledTitle>
        <StyledText>content{props.text_content}</StyledText>
        {/*<img src={props.src} alt={props.scratl} /> */}
      </StyledContent>
      <form>
        <div className="input-container">
          <label>Commenter:</label>
          <textarea
            name="comment"
            required
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <input type="button" value="Envoyer" onClick={newComment} />
      </form>
      {isDataLoading ? (
        <br />
      ) : (
        <React.Fragment>
          {data.map((dataObj) => (
            <Comment {...dataObj} />
          ))}
        </React.Fragment>
      )}
    </StyledContainer>
  )
}

export default Card
