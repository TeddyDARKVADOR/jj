import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="pokemon-footer">
            <div className="footer-wave"></div>
            <div className="footer-content">
                <div className="footer-decor">
                </div>
                <p>
                    <small>Copyright © 2026 <strong>Teddy Becard</strong>. Tous droits réservés.</small>
                </p>
                <div className="footer-status">
                    <span className="status-text">Gotta catch 'em all!</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;