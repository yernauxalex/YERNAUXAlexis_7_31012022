import '../styles/App.css';
import React from 'react';
import Header from './Header';
import ContentList from './ContentList';
import Footer from './Footer';


function App() {
  return <React.Fragment><Header /><ContentList /><Footer /></React.Fragment>
}

export default App;
