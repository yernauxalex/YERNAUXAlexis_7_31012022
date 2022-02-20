import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Utils/AuthContext'
import Card from './Card'
import styled from 'styled-components'
import { Loader } from '../Utils/Loader'

//Appel API
// async function fetchPost(token) {
//   return fetch('http://localhost:3000/api/content/', {
//     method: 'GET',
//     headers: {
//       Authorization: 'Bearer ' + token,
//     },
//   }).then((data) => data.json())
// }

const StyledGlobalContainer = styled.section`
  @media screen and (min-width: 768px) {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
  }
`

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
      const id_user = authState.id
      try {
        const response = await fetch(
          `http://localhost:3000/api/content/${id_user}`,
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
        <Loader />
      ) : (
        <StyledGlobalContainer>
          {data.map((dataObj) => (
            <Card {...dataObj} />
          ))}
        </StyledGlobalContainer>
      )}
    </section>
  )
}

export default ContentList
