import React, { useState, useEffect } from 'react';
import recipeService from '../../api/recipeService';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import './Favorites.css';

const Favorites = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        const fetchFavoriteRecipes = async () => {
            if (favorites.length === 0) {
                setRecipes([]);
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                // Fetch all recipes and filter by favorites locally or fetch individually
                // Since we have a small set, we can fetch all or implement a multi-id get
                const allRecipes = await recipeService.getAllRecipes();
                const favoriteRecipes = allRecipes.filter(r => favorites.includes(r.id));
                setRecipes(favoriteRecipes);
            } catch (err) {
                console.error('Error fetching favorites:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchFavoriteRecipes();
    }, [favorites]);

    const toggleFavorite = (id) => {
        setFavorites(prev => {
            const newFavs = prev.filter(favId => favId !== id);
            localStorage.setItem('favorites', JSON.stringify(newFavs));
            return newFavs;
        });
    };

    return (
        <div className="favorites-page">
            <h1 className="page-title">My Saved Recipes</h1>

            {loading ? (
                <div className="loading">Loading your favorites...</div>
            ) : recipes.length > 0 ? (
                <div className="recipe-grid">
                    {recipes.map(recipe => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            isFavorite={true}
                            toggleFavorite={toggleFavorite}
                        />
                    ))}
                </div>
            ) : (
                <div className="no-recipes">
                    <p>You haven't saved any recipes yet.</p>
                    <button onClick={() => window.location.href = '/'} className="btn-primary" style={{ marginTop: '20px' }}>Explore Recipes</button>
                </div>
            )}
        </div>
    );
};

export default Favorites;
