import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Utils/AuthContext'
import { ModalContext } from '../Utils/ModalContext'
import Card from './Card'
import { Loader } from '../Utils/Loader'
import StyledTitleMainPage from '../styles/styledComponents/StyledTitleMainPage'
import StyledGlobalContainer from '../styles/styledComponents/StyledGlobalContainer'
import StyledColumnContainer from '../styles/styledComponents/StyledColumnContainer'

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
  const { modalState } = useContext(ModalContext)
  const postListL = []
  const postListR = []

  function refreshCard(content_id) {
    const newDataL = [...dataL]
    const newDataR = [...dataR]
    const seekId = (content) => content.id_content === content_id
    const contentIndexL = newDataL.findIndex(seekId)
    const contentIndexR = newDataR.findIndex(seekId)
    if (contentIndexL !== -1) {
      newDataL.splice(contentIndexL, 1)
      setDataL(newDataL)
    }
    if (contentIndexR !== -1) {
      newDataR.splice(contentIndexR, 1)
      setDataR(newDataR)
    }
  }

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
        for (let index = 0; index < 10; index++) {
          if (data.datajson[index] != null) {
            postListL.push(data.datajson[index])
            index++
            if (data.datajson[index] != null) {
              postListR.push(data.datajson[index])
            }
          }
        }
        setDataL(postListL)
        setDataR(postListR)
      } catch (error) {
        console.log(error)
      } finally {
        setDataLoading(false)
      }
    }
    fetchPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState, modalState])

  return (
    <section>
      {isDataLoading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <StyledTitleMainPage>
            Dernières publications parues
          </StyledTitleMainPage>
          <StyledGlobalContainer>
            <StyledColumnContainer>
              {dataL.map((dataObj) => (
                <Card {...dataObj} fc={refreshCard} />
              ))}
            </StyledColumnContainer>
            <StyledColumnContainer>
              {dataR.map((dataObj) => (
                <Card {...dataObj} fc={refreshCard} />
              ))}
            </StyledColumnContainer>
          </StyledGlobalContainer>
        </React.Fragment>
      )}
    </section>
  )
}

export default ContentList
