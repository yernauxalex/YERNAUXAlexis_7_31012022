import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Utils/AuthContext'
import StyledModalContainer from '../styles/styledComponents/StyledModalContainer'
const FormData = require('form-data')

// Appel API content simple
async function fetchNewPost(credentials, id_user, token) {
  return fetch(`http://localhost:3000/api/content/${id_user}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json())
}

// Appel API content avec media
async function fetchNewPostWithMedia(credentials, id_user, token) {
  return fetch(`http://localhost:3000/api/content/${id_user}`, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
    },
    body: credentials,
  }).then((data) => data.json())
}

function CreatePost() {
  const [text_content, setText_content] = useState('')
  const [media_content, setMedia_content] = useState('')
  const { authState } = useContext(AuthContext)
  const navigate = useNavigate()
  const newPost = async (e) => {
    e.preventDefault()
    const token = authState.token
    const id_user = authState.id
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) // appel API getProfile ou localstorag
    if (media_content) {
      const form = new FormData()
      form.append('text_content', text_content)
      form.append('file', media_content)
      form.append('media', true)
      console.log(form)
      const data = await fetchNewPostWithMedia(form, id_user, token)
      userInfo.last_interaction = data.last_interaction
      localStorage.setItem('last', JSON.stringify(userInfo))
      alert('Contenu avec image crée')
    } else {
      console.log(text_content)
      const data = await fetchNewPost(
        {
          text_content,
        },
        id_user,
        token
      )
      userInfo.last_interaction = data.last_interaction
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
      alert('Contenu crée')
      navigate('/')
    }
  }
  return (
    <StyledModalContainer>
      <h1>Créer un nouveau contenu</h1>
      <form>
        <div className="input-container">
          <textarea
            name="text_content"
            rows="6"
            cols="33"
            autoFocus
            placeholder="Créer une plublication"
            maxLength={3000}
            onChange={(e) => setText_content(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label>Image</label>
          <input
            type="file"
            accept="image/*"
            name="media_content"
            onChange={(e) => setMedia_content(e.target.files[0])}
          />
        </div>
        <input type="button" value="Nouveau post" onClick={newPost} />
      </form>
    </StyledModalContainer>
  )
}

export default CreatePost
