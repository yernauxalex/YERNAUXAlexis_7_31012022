import React, { useContext, useState } from 'react'
import { AuthContext } from '../Utils/AuthContext'

// Appel API
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

function CreatePost() {
  const [text_content, setText_content] = useState('')
  const [media_content, setMedia_content] = useState('')
  const { authState } = useContext(AuthContext)
  const newPost = async (e) => {
    e.preventDefault()
    const token = authState.token
    const id_user = authState.id
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) // appel API getProfile ou localstorage
    const id_author = userInfo.id_user
    if (media_content) {
      await fetchNewPost(
        {
          text_content,
          media_content,
        },
        id_user,
        token
      )
      alert('Contenu crée')
    } else {
      await fetchNewPost(
        {
          text_content,
        },
        id_user,
        token
      )
      alert('Contenu crée')
    }
  }
  return (
    <div>
      <h1>Créer un nouveau contenu</h1>
      <form>
        <div className="input-container">
          <label>Texte</label>
          <input
            type="text"
            name="text_content"
            onChange={(e) => setText_content(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label>Image</label>
          <input
            type="file"
            accept="image/*"
            name="media_content"
            onChange={(e) => setMedia_content(e.target.value)}
          />
        </div>
        <input type="button" value="Nouveau post" onClick={newPost} />
      </form>
    </div>
  )
}

export default CreatePost
