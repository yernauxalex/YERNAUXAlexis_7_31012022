import '../styles/App.css'
import React from 'react'
//import Header from '../components/Header'
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
