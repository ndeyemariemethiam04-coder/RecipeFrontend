import React, { useState, useEffect } from 'react';
import recipeService from '../../api/recipeService';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import './Categories.css';

const CATEGORIES = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Healthy', 'Quick & Easy'];

const Categories = () => {
    const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        fetchFilteredRecipes(selectedCategory);
    }, [selectedCategory]);

    const fetchFilteredRecipes = async (category) => {
        setLoading(true);
        try {
            // Use the search query to filter by category
            const data = await recipeService.getAllRecipes(category);
            setRecipes(data);
        } catch (err) {
            console.error('Error fetching categorized recipes:', err);
        } finally {
            setLoading(false);
        }
    };

    const toggleFavorite = (id) => {
        setFavorites(prev => {
            const newFavs = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
            localStorage.setItem('favorites', JSON.stringify(newFavs));
            return newFavs;
        });
    };

    return (
        <div className="categories-page">
            <h1 className="page-title">Explore by Category</h1>

            <div className="category-filter">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="recipe-grid-container">
                {loading ? (
                    <div className="loading">Finding {selectedCategory} recipes...</div>
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
                    <p className="no-recipes">No recipes found for {selectedCategory}.</p>
                )}
            </div>
        </div>
    );
};

export default Categories;
