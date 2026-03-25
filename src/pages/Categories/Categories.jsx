import React, { useState, useEffect } from 'react';
import recipeService from '../../api/recipeService';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import './Categories.css';

const CATEGORIES = [
    { name: 'Breakfast', image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=600&auto=format&fit=crop' },
    { name: 'Lunch', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop' },
    { name: 'Dinner', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=600&auto=format&fit=crop' },
    { name: 'Dessert', image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=600&auto=format&fit=crop' },
    { name: 'Healthy', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=600&auto=format&fit=crop' },
    { name: 'Quick & Easy', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop' },
    { name: 'Snacks', image: 'https://images.unsplash.com/photo-1599490659223-e1539e3391b7?q=80&w=600&auto=format&fit=crop' }
];

const Categories = () => {
    const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].name);
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

            <div className="category-grid">
                {CATEGORIES.map(cat => (
                    <div
                        key={cat.name}
                        className={`category-card ${selectedCategory === cat.name ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(cat.name)}
                    >
                        <img src={cat.image} alt={cat.name} className="category-card-img" />
                        <div className="category-card-overlay">
                            <h3 className="category-card-title">{cat.name}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="recipe-grid-divider">
                <h2>{selectedCategory} Recipes</h2>
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
