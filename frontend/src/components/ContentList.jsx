import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Utils/AuthContext'
import Card from './Card'

//Appel API
// async function fetchPost(token) {
//   return fetch('http://localhost:3000/api/content/', {
//     method: 'GET',
//     headers: {
//       Authorization: 'Bearer ' + token,
//     },
//   }).then((data) => data.json())
// }

// post récupérés dans la DB via l'API, à voir si c'est possible
const postLiist = ['Post1', 'Post2', 'Post3']

function ContentList() {
  const [data, setData] = useState([])
  const [isDataLoading, setDataLoading] = useState(false)
  const { authState } = useContext(AuthContext)
  const navigate = useNavigate()
  const postList = []

  useEffect(() => {
    async function fetchPost() {
      setDataLoading(true)
      const token = authState.token
      try {
        const response = await fetch('http://localhost:3000/api/content/', {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        const data = await response.json()
        console.log(data)
        if (!sessionStorage.getItem('accessToken')) {
          navigate('/signin')
        } else {
          for (let index = 0; index < 5; index++) {
            if (data.datajson[index] != null) {
              postList.push(data.datajson[index])
              console.log(data.datajson[index])
            }
          }
          console.log(postList)
          setData(postList)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setDataLoading(false)
      }
    }
    fetchPost()
  }, [])

  return (
    <section>
      {isDataLoading ? (
        <ul>
          {postLiist.map((posst, index) => (
            <li key={`${posst}-${index}`}>{posst}</li>
          ))}
        </ul>
      ) : (
        <div className="Card">
          {data.map((dataObj) => (
            <Card {...dataObj} />
          ))}
        </div>
      )}
    </section>
  )
}

export default ContentList
