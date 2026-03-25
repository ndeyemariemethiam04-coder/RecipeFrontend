import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

const RecipeCard = ({ recipe, isFavorite, toggleFavorite, onEdit, onDelete }) => {
    const { id, title, coverImage, cookTime, ingredients, servings } = recipe;

    return (
        <div className="recipe-card">
            <Link to={`/recipe/${id}`}>
                <div className="card-image-wrapper">
                    <img src={coverImage || 'https://via.placeholder.com/400x300?text=No+Image'} alt={title} className="card-image" />
                    {cookTime && <span className="time-badge">⏱ {cookTime} mins</span>}
                </div>
                <div className="card-content">
                    <h3 className="card-title">{title}</h3>
                    <div className="card-meta-bottom">
                        <span>{ingredients?.length || 0} Ingredients</span>
                        {servings && <span> • Serves {servings}</span>}
                    </div>
                    {onEdit && (
                        <button
                            className="edit-text-btn"
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEdit(recipe); }}
                        >
                            Edit
                        </button>
                    )}
                </div>
            </Link>

            <div className="card-actions-overlay">
                <button
                    className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(id);
                    }}
                    aria-label="Toggle Favorite"
                >
                    ❤️
                </button>
            </div>
        </div>
    );
};

export default RecipeCard;

