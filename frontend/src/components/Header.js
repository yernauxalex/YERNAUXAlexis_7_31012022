import '../styles/Header.css'
import logo from '../assets/icon.svg'
import Nav from './Nav'

function Header() {
    return (<div className='gpm-header'>
        <img src={logo} alt='Logo de groupomania' className='gpm-logo' />
        <h1>Groupomania</h1>
        <Nav />
    </div>)
}

export default Header;