import '../styles/App.css'
import React from 'react'
import ContentList from '../components/ContentList'
import Footer from '../components/Footer'

function Home() {
  return (
    <React.Fragment>
      <ContentList />
      <Footer />
    </React.Fragment>
  )
}

export default Home
