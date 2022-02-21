import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Utils/AuthContext'
import Card from '../components/Card'
import Comment from '../components/Comment'
import { Loader } from '../Utils/Loader'

function PublicProfile() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo')) // appel API getProfile ou localstorage
  const [data, setData] = useState([])
  const [type, setType] = useState('')
  const [isDataLoading, setDataLoading] = useState(false)
  const { authState } = useContext(AuthContext)
  useEffect(() => {
    async function fetchPost() {
      setDataLoading(true)
      const token = authState.token
      const id_user = authState.id
      const id = userInfo.last_interaction
      const type = userInfo.interaction_type
      setType(type)
      try {
        const response = await fetch(
          `http://localhost:3000/api/content/${id_user}/${id}`,
          {
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + token,
            },
          }
        )
        const data = await response.json()
        console.log(data.data)
        setData(data.data)
      } catch (error) {
        console.log(error)
      } finally {
        setDataLoading(false)
      }
    }
    fetchPost()
  }, [])
  return (
    <div>
      <h1>Espace personnel</h1>
      <section>
        <h2>
          Bienvenue sur le profil de {userInfo.firstname} {userInfo.lastname}
        </h2>
        <p></p>
      </section>
      <section>
        {isDataLoading ? (
          <Loader />
        ) : type === 'content' ? (
          <React.Fragment>
            <h3>Dernière publication {userInfo.last_interaction}</h3>
            <Card {...data} />
          </React.Fragment>
        ) : type === 'comment' ? (
          <React.Fragment>
            <h3>{userInfo.firstname} a commenté cette publication: </h3>
            <Card {...data} />
          </React.Fragment>
        ) : type === 'like' ? (
          <div className="tempDivLike"></div>
        ) : (
          <Loader />
        )}
      </section>
    </div>
  )
}

export default PublicProfile
