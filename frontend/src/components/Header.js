import '../styles/Header.css'
import logo from '../assets/icon.svg'

function Header() {
    return (<div className='gpm-header'>
        <img src={logo} alt='Logo de groupomania' className='gpm-logo' />
        <h1>Groupomania</h1>
    </div>)
}

export default Header;