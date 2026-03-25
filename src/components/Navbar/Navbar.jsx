import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <span className="logo-accent">Chipi</span>FoodBlog
                </Link>

                <ul className="navbar-links">
                    <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Explore</NavLink></li>
                    <li><NavLink to="/categories" className={({ isActive }) => isActive ? 'active' : ''}>Categories</NavLink></li>
                    <li><NavLink to="/favorites" className={({ isActive }) => isActive ? 'active' : ''}>Favorites</NavLink></li>
                    {user && (
                        <li><NavLink to="/my-recipes" className={({ isActive }) => isActive ? 'active' : ''}>My Recipes</NavLink></li>
                    )}
                </ul>

                <div className="navbar-auth">
                    {user ? (
                        <div className="user-menu">
                            <span className="user-greeting">Hi, {user.name || user.email.split('@')[0]}</span>
                            <button onClick={logout} className="btn-logout">Logout</button>
                        </div>
                    ) : (
                        <Link to="/login" className="btn-primary">Login / Signup</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
