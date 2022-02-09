import { useState } from 'react'

// Appel API
async function fetchNewPost(credentials, iduser) {
  return fetch(
    `http://localhost:3000/api/content/:iduser=${iduser}/createContent`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    }
  ).then((data) => data.json())
}

function CreatePost() {
  const [text_content, setText_content] = useState('')
  const [media_content, setMedia_content] = useState('')
  const newPost = async (e) => {
    e.preventDefault()
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) // appel API getProfile ou localstorage
    const id_author = userInfo.id_user
    const data = await fetchNewPost(
      {
        text_content,
        media_content,
        id_author,
      },
      id_author
    )
  }
  return (
    <div>
      <h1>Créer un nouveau contenu</h1>
      <form onClick={newPost}>
        <div className="input-container">
          <label>Texte</label>
          <input
            type="text"
            name="text_content"
            onChange={(e) => setText_content(e.target.value)}
          />
        </div>
        <input type="button" value="Nouveau post" />
      </form>
    </div>
  )
}

export default CreatePost
