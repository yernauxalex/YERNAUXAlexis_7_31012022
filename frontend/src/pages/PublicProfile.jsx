import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../Utils/AuthContext'
import Card from '../components/Card'
import { Loader } from '../Utils/Loader'
import { StyledSubContainer } from '../styles/styledComponent'

function PublicProfile(props) {
  const userInfo = JSON.parse(localStorage.getItem('userInfo')) // appel API getProfile ou localstorage
  const [data, setData] = useState([])
  const [dataProfile, setDataProfile] = useState([])
  const [type, setType] = useState('')
  const [isDataLoading, setDataLoading] = useState(false)
  const { authState } = useContext(AuthContext)
  const { id_profile } = useParams()
  console.log(id_profile)
  useEffect(() => {
    setDataLoading(true)
    const token = authState.token
    const id_user = id_profile
    async function fetchProfile() {
      try {
        // Requête pour les infos du profil
        const responseP = await fetch(
          `http://localhost:3000/api/auth/profile/${id_user}`,
          {
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + token,
            },
          }
        )
        const dataP = await responseP.json()
        return dataP
      } catch (error) {
        console.log(error)
      }
    }

    async function fetchPost() {
      //const id_user = authState.id
      //const id = userInfo.last_interaction
      //const type = userInfo.interaction_type
      const dataProfile = await fetchProfile()
      setDataProfile(dataProfile)
      const id = dataProfile.last_interaction
      const type = dataProfile.interaction_type
      setType(type)
      try {
        // Requête pour la dernière interaction
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
  }, [id_profile])
  return (
    <StyledSubContainer>
      <h1>Espace personnel</h1>
      <section>
        <h2>
          Bienvenue sur le profil de {dataProfile.firstname}{' '}
          {dataProfile.lastname}
        </h2>

        {isDataLoading ? (
          <Loader />
        ) : type === 'content' ? (
          <React.Fragment>
            <p>Dernière publication {dataProfile.last_interaction}</p>
            <Card {...data} />
          </React.Fragment>
        ) : type === 'comment' ? (
          <React.Fragment>
            <p>{dataProfile.firstname} a commenté cette publication: </p>
            <Card {...data} />
          </React.Fragment>
        ) : type === 'like' ? null : (
          <Loader />
        )}
      </section>
    </StyledSubContainer>
  )
}

export default PublicProfile
