import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <span className="logo-accent">Chipi</span>FoodBlog
                </Link>

                {/* Replaced original navbar-links and navbar-auth with new structure */}
                <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                    <Link to="/" className="nav-link" onClick={closeMenu}>Explore</Link>
                    <Link to="/categories" className="nav-link" onClick={closeMenu}>Categories</Link>
                    <Link to="/favorites" className="nav-link" onClick={closeMenu}>Favorites</Link>
                    {user ? (
                        <>
                            <Link to="/my-recipes" className="nav-link" onClick={closeMenu}>My Recipes</Link>
                            <div className="user-info">
                                <span className="user-name">Hi, {user.email.split('@')[0]}</span>
                                <button onClick={() => { logout(); closeMenu(); }} className="logout-btn">Logout</button>
                            </div>
                        </>
                    ) : (
                        <Link to="/login" className="btn-primary" onClick={closeMenu}>Account</Link>
                    )}
                </div>

                <button className="hamburger" onClick={toggleMenu} aria-label="Menu">
                    <span className={`bar ${isMenuOpen ? 'active' : ''}`}></span>
                    <span className={`bar ${isMenuOpen ? 'active' : ''}`}></span>
                    <span className={`bar ${isMenuOpen ? 'active' : ''}`}></span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
