import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Utils/AuthContext'
import Card from './Card'
import { Loader } from '../Utils/Loader'
import {
  StyledGlobalContainer,
  StyledColumnContainer,
} from '../styles/styledComponent'

//Appel API
// async function fetchPost(token) {
//   return fetch('http://localhost:3000/api/content/', {
//     method: 'GET',
//     headers: {
//       Authorization: 'Bearer ' + token,
//     },
//   }).then((data) => data.json())
// }

function ContentList() {
  const [dataL, setDataL] = useState([])
  const [dataR, setDataR] = useState([])
  const [isDataLoading, setDataLoading] = useState(false)
  const { authState } = useContext(AuthContext)
  const navigate = useNavigate()
  const postListL = []
  const postListR = []

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
          for (let index = 0; index < 10; ) {
            if (data.datajson[index] != null) {
              postListL.push(data.datajson[index])
              console.log(data.datajson[index])
              index++
              postListR.push(data.datajson[index])
            }
          }
          console.log(postListL)
          setDataL(postListL)
          setDataR(postListR)
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
          <StyledColumnContainer>
            {dataL.map((dataObj) => (
              <Card {...dataObj} />
            ))}
          </StyledColumnContainer>
          <StyledColumnContainer>
            {dataR.map((dataObj) => (
              <Card {...dataObj} />
            ))}
          </StyledColumnContainer>
        </StyledGlobalContainer>
      )}
    </section>
  )
}

export default ContentList
