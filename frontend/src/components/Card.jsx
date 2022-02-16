import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Utils/AuthContext'
import styled from 'styled-components'
import Comment from './Comment'

const StyledContainer = styled.article`
  display: flex;
  flex-flow: column wrap;
  background-color: #deebff;
  border-radius: 26px;
  padding: 5%;
  margin: 5%;
`
const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledText = styled.p``
const StyledTitle = styled.h3`
  font-size: 15px;
`

function Card(props) {
  const [data, setData] = useState([])
  const [isDataLoading, setDataLoading] = useState(false)
  const { authState } = useContext(AuthContext)
  const navigate = useNavigate()
  const commentList = []

  useEffect(() => {
    async function fetchComment() {
      setDataLoading(true)
      const token = authState.token
      const id = props.id_content
      console.log(id)
      const lsUser = JSON.parse(localStorage.getItem('userInfo'))
      const id_user = lsUser.id_user
      try {
        const response = await fetch(
          `http://localhost:3000/api/comment/${id_user}/${id}`,
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
              commentList.push(data.datajson[index])
              console.log(data.datajson[index])
            }
          }
          setData(commentList)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setDataLoading(false)
      }
    }
    fetchComment()
  }, [])

  return (
    <StyledContainer>
      <StyledContent>
        <StyledTitle>Nom auteur {props.id_author}</StyledTitle>
        <StyledText>content{props.text_content}</StyledText>
        {/*<img src={props.src} alt={props.scratl} /> */}
      </StyledContent>
      {isDataLoading ? (
        <br />
      ) : (
        <React.Fragment>
          {data.map((dataObj) => (
            <Comment {...dataObj} />
          ))}
        </React.Fragment>
      )}
    </StyledContainer>
  )
}

export default Card
