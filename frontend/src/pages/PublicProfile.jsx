import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../Utils/AuthContext'
import Card from '../components/Card'
import { Loader } from '../Utils/Loader'
import StyledSubContainer from '../styles/styledComponents/StyledSubContainer'

function PublicProfile(props) {
  const userInfo = JSON.parse(localStorage.getItem('userInfo')) // appel API getProfile ou localstorage
  // Données concernant la dernière interaction
  const [dataInteraction, setDataInteraction] = useState([])
  const [dataError, setDataError] = useState()
  // Données relatives au profil
  const [dataProfile, setDataProfile] = useState([])
  const [type, setType] = useState('')
  const [isDataLoading, setDataLoading] = useState(false)
  const { authState } = useContext(AuthContext)
  const { id_profile } = useParams()
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
        if (data.code) {
          return setDataError(data.code)
        }
        setDataInteraction(data.data)
      } catch (error) {
        console.log(error)
      } finally {
        setDataLoading(false)
      }
    }
    fetchPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        ) : dataError ? (
          <p>Contenu non disponible</p>
        ) : type === 'content' ? (
          <React.Fragment>
            <p>Dernière publication {dataProfile.last_interaction}</p>
            <Card {...dataInteraction} />
          </React.Fragment>
        ) : type === 'comment' ? (
          <React.Fragment>
            <p>{dataProfile.firstname} a commenté cette publication: </p>
            <Card {...dataInteraction} />
          </React.Fragment>
        ) : type === 'like' ? (
          <React.Fragment>
            <p>{dataProfile.firstname} a aimé cette publication: </p>
            <Card {...dataInteraction} />
          </React.Fragment>
        ) : (
          <Loader />
        )}
      </section>
    </StyledSubContainer>
  )
}

export default PublicProfile
