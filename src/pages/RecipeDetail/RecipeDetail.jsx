import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import recipeService from '../../api/recipeService';
import './RecipeDetail.css';

const RecipeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const data = await recipeService.getRecipeById(id);
                setRecipe(data);
            } catch (err) {
                console.error('Error fetching recipe detail:', err);
                setError('Recipe not found or failed to load.');
            } finally {
                setLoading(false);
            }
        };
        fetchRecipe();
    }, [id]);

    if (loading) return <div className="loading">Loading recipe details...</div>;
    if (error) return (
        <div className="error-container">
            <p className="error">{error}</p>
            <button onClick={() => navigate('/')} className="btn-outline">Go Back Home</button>
        </div>
    );
    if (!recipe) return null;

    return (
        <div className="recipe-detail">
            <div className="detail-hero">
                <div className="hero-text">
                    <h1 className="detail-title">{recipe.title}</h1>
                    <div className="detail-meta">
                        <span className="meta-item">⏱ {recipe.cookTime || 0} mins</span>
                        <span className="meta-item">Servings: {recipe.servings || 4}</span>
                    </div>
                </div>
                <div className="hero-image-container">
                    <img src={recipe.coverImage || 'https://via.placeholder.com/800x500?text=No+Image'} alt={recipe.title} className="detail-hero-image" />
                </div>
            </div>

            <div className="detail-grid">
                <section className="ingredients-section">
                    <h2 className="section-title">Ingredients</h2>
                    <ul className="ingredient-list">
                        {recipe.ingredients?.map((ingredient, index) => (
                            <li key={index} className="ingredient-item">
                                <input type="checkbox" id={`ing-${index}`} className="ing-checkbox" />
                                <label htmlFor={`ing-${index}`}>{ingredient}</label>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="instructions-section">
                    <h2 className="section-title">Instructions</h2>
                    <div className="instructions-body">
                        {recipe.instructions ? (
                            recipe.instructions.split('\n').map((para, i) => para.trim() && <p key={i}>{para}</p>)
                        ) : (
                            <p>No instructions provided for this recipe.</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default RecipeDetail;
