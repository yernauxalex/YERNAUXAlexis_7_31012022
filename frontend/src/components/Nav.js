import '../styles/Nav.css'

function Nav(){
    const signup = '';
    const signin = '';
    const profil = '';
    return (
        <nav className='navbar'>
            <ul className='navbarlist'>
                <li className='navbarlist__obj'>
                    <a href={ signin } className='navbarlist__link' aria-label='Page de connexion'>Connexion</a>
                </li>
                <li className='navbarlist__obj'>
                    <a href={ signup } className='navbarlist__link' aria-label="Page d'inscription">Inscription</a>
                </li>
                <li className='navbarlist__obj'>
                    <a href={ profil } className='navbarlist__link' aria-label='Page du profil'>Profil</a>
                </li>
            </ul>
        </nav>
    )
}

export default Nav;