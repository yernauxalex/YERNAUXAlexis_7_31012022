import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Utils/AuthContext'
import colors from '../styles/colors'

// Appel API
async function fetchAllLike(id_content, token) {
  return fetch(`http://localhost:3000/api/like/getlike/${id_content}`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
}

async function fetchNewLike(id_content, id_user, token) {
  return fetch(
    `http://localhost:3000/api/like/newlike/${id_content}/${id_user}`,
    {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  )
}

async function fetchRemoveLike(id_content, id_user, token) {
  return fetch(
    `http://localhost:3000/api/like/removelike/${id_content}/${id_user}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  )
}

const likeButton = {
  like: {
    backgroundColor: colors.buttonLike,
  },
  liked: {
    backgroundColor: colors.buttonLiked,
  },
}

function LikeButton(props) {
  const { authState } = useContext(AuthContext)
  const [like, setLike] = useState(0)
  const [liked, setLiked] = useState(false)
  const token = authState.token
  const id_content = props.id_content
  const id_user = authState.id

  const updateLike = async (e) => {
    e.preventDefault()
    if (liked === true) {
      await fetchRemoveLike(id_content, id_user, token)
      const tempLike = like - 1
      setLike(tempLike)
      setLiked(false)
    }
    if (liked === false) {
      await fetchNewLike(id_content, id_user, token)
      const tempLike = like + 1
      setLike(tempLike)
      setLiked(true)
    }
  }

  useEffect(() => {
    async function fetchLike() {
      try {
        const response = await fetchAllLike(id_content, token)
        const dataR = await response.json()
        const newData = dataR.ctrlResult
        const countLike = newData.length
        setLike(countLike)
        const seekId = (ctrlResult) => ctrlResult.author_id === id_user
        const indexId = newData.findIndex(seekId)
        if (indexId !== -1) {
          setLiked(true)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchLike()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <React.Fragment>
      {liked ? (
        <input
          type="button"
          value={`Liked:${like}`}
          className="like-button"
          style={likeButton.liked}
          onClick={updateLike}
          aria-label="Bouton j'aime, vous avez aimé ce contenu"
        />
      ) : (
        <input
          type="button"
          value={`Like:${like}`}
          className="like-button"
          style={likeButton.like}
          onClick={updateLike}
          aria-label="Bouton j'aime, vous n'avez pas aimé ce contenu"
        />
      )}
    </React.Fragment>
  )
}

export default LikeButton
