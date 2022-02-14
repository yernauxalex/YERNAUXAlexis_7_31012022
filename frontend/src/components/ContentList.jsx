import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Utils/AuthContext'
import Card from './Card'

//Appel API
async function fetchPost(token) {
  return fetch('http://localhost:3000/api/content/', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }).then((data) => data.json())
}

// post récupérés dans la DB via l'API, à voir si c'est possible
const postLiist = ['Post1', 'Post2', 'Post3']

// ul/li pour l'exemple, index devra être remplacé par l'id du post présent dans la DB
// Système de carte préférable
function ContentList() {
  const { authState } = useContext(AuthContext)
  const navigate = useNavigate()
  const postList = []
  useEffect(() => {
    ;(async function () {
      if (!sessionStorage.getItem('accessToken')) {
        navigate('/signin')
      } else {
        const token = authState.token
        const data = await fetchPost(token)
        for (let index = 0; index < 10; index++) {
          if (data.datajson[index] != null) {
            postList.push(data.datajson[index])
          }
        }
      }
    })()
  })
  // le rendu se fait probablement avant que le call api soit effectué
  return (
    <section>
      <ul>
        {postLiist.map((posst, index) => (
          <li key={`${posst}-${index}`}>{posst}</li>
        ))}
      </ul>
      {postList.map((dataProps, index) => (
        <Card dataProps={`${dataProps}-${index}`} />
      ))}
    </section>
  )
}

export default ContentList
