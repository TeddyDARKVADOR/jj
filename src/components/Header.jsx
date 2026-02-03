import { Link } from 'react-router-dom';

function Header({ langue, changerLangue }) {
    return (
        <header className="pokedex-header">
            <div className="logo-container">
                <svg className="pokeball-icon" viewBox="0 0 100 100" width="40" height="40">
                    <circle cx="50" cy="50" r="45" fill="white" stroke="currentColor" strokeWidth="5"/>
                    <path d="M 5,50 L 95,50" stroke="currentColor" strokeWidth="5"/>
                    <circle cx="50" cy="50" r="15" fill="white" stroke="currentColor" strokeWidth="5"/>
                    <circle cx="50" cy="50" r="5" fill="currentColor"/>
                </svg>
                <Link to="/" className="title">
                    <h1>Pokédex React</h1>
                </Link>
            </div>
            <nav className="nav-links">
                <button onClick={changerLangue}>
                    {langue === 'fr' ?  'Changer en anglais' : 'Switch to French' }
                </button>
                <Link to="/" className="nav-link active">Accueil</Link>
                <Link to="/favoris" className="nav-link">Mes Favoris</Link>
                <Link to="/apropos" className="nav-link">À propos</Link>
            </nav>
        </header>
    );
}

export default Header;