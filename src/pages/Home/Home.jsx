import React, { useState, useEffect } from 'react';
import recipeService from '../../api/recipeService';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import './Home.css';

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        fetchRecipes();
    }, []);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const fetchRecipes = async (query = '') => {
        setLoading(true);
        try {
            const data = await recipeService.getAllRecipes(query);
            setRecipes(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching recipes:', err);
            setError('Failed to load recipes. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchRecipes(searchQuery);
    };

    const toggleFavorite = (id) => {
        setFavorites(prev => {
            if (prev.includes(id)) {
                return prev.filter(favId => favId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    return (
        <div className="home-page">
            <section className="hero">
                <h1 className="hero-title">Find the Perfect Recipe</h1>
                <form className="search-form" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search for Breakfast, Lunch, Dinner..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="search-btn">Search</button>
                </form>
            </section>

            <div className="recipe-grid-container">
                <h2 className="section-title">
                    {searchQuery ? `Results for "${searchQuery}"` : 'Explore All Recipes'}
                </h2>

                {loading ? (
                    <div className="loading">Loading delicious recipes...</div>
                ) : error ? (
                    <div className="error">{error}</div>
                ) : recipes.length > 0 ? (
                    <div className="recipe-grid">
                        {recipes.map(recipe => (
                            <RecipeCard
                                key={recipe.id}
                                recipe={recipe}
                                isFavorite={favorites.includes(recipe.id)}
                                toggleFavorite={toggleFavorite}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="no-recipes">No recipes found. Try a different search!</p>
                )}
            </div>
        </div>
    );
};

export default Home;
