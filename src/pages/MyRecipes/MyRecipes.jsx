import React, { useState, useEffect } from 'react';
import recipeService from '../../api/recipeService';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import RecipeForm from '../../components/RecipeForm/RecipeForm';
import './MyRecipes.css';

const MyRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    });
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingRecipe, setEditingRecipe] = useState(null);

    useEffect(() => {
        const fetchMyRecipes = async () => {
            setLoading(true);
            try {
                const data = await recipeService.getMyRecipes();
                setRecipes(data);
            } catch (err) {
                console.error('Error fetching my recipes:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchMyRecipes();
    }, []);

    const toggleFavorite = (id) => {
        setFavorites(prev => {
            const newFavs = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
            localStorage.setItem('favorites', JSON.stringify(newFavs));
            return newFavs;
        });
    };

    const handleCreateRecipe = async (recipeData) => {
        setIsSubmitting(true);
        try {
            if (editingRecipe) {
                const updated = await recipeService.updateRecipe(editingRecipe.id, recipeData);
                setRecipes(recipes.map(r => r.id === updated.id ? updated : r));
            } else {
                const newRecipe = await recipeService.createRecipe(recipeData);
                setRecipes([newRecipe, ...recipes]);
            }
            setIsFormOpen(false);
            setEditingRecipe(null);
        } catch (err) {
            console.error('Error saving recipe:', err);
            alert('Failed to save recipe. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditClick = (recipe) => {
        setEditingRecipe(recipe);
        setIsFormOpen(true);
    };

    const handleDeleteRecipe = async (id) => {
        if (!window.confirm('Are you sure you want to delete this recipe?')) return;

        try {
            await recipeService.deleteRecipe(id);
            setRecipes(recipes.filter(r => r.id !== id));
            setIsFormOpen(false);
            setEditingRecipe(null);
        } catch (err) {
            console.error('Error deleting recipe:', err);
            alert('Failed to delete recipe.');
        }
    };

    return (
        <div className="my-recipes-page">
            <div className="page-header">
                <h1 className="page-title">My Recipes</h1>
                <button onClick={() => setIsFormOpen(true)} className="btn-primary">Create New Recipe</button>
            </div>

            {isFormOpen && (
                <RecipeForm
                    onSubmit={handleCreateRecipe}
                    onCancel={() => {
                        setIsFormOpen(false);
                        setEditingRecipe(null);
                    }}
                    onDelete={handleDeleteRecipe}
                    initialData={editingRecipe || {}}
                />
            )}

            {loading ? (
                <div className="loading">Loading your recipes...</div>
            ) : recipes.length > 0 ? (
                <div className="recipe-grid">
                    {recipes.map(recipe => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            isFavorite={favorites.includes(recipe.id)}
                            toggleFavorite={toggleFavorite}
                            onEdit={handleEditClick}
                        />
                    ))}
                </div>
            ) : (
                <div className="no-recipes">
                    <p>You haven't created any recipes yet.</p>
                </div>
            )}
        </div>
    );
};

export default MyRecipes;
