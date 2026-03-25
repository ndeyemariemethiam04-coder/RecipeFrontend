import React, { useState } from 'react';
import './RecipeForm.css';

const RecipeForm = ({ onSubmit, onCancel, onDelete, initialData = {} }) => {
    const [formData, setFormData] = useState({
        title: initialData.title || '',
        cookTime: initialData.cookTime || '',
        servings: initialData.servings || '',
        ingredients: initialData.ingredients ? initialData.ingredients.join('\n') : '',
        instructions: initialData.instructions || '',
        coverImage: initialData.coverImage || '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, coverImage: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const recipeData = {
            ...formData,
            ingredients: formData.ingredients.split('\n').filter(i => i.trim() !== ''),
            cookTime: String(formData.cookTime || ''),
            servings: String(formData.servings || ''),
        };
        onSubmit(recipeData);
    };

    return (
        <div className="recipe-form-overlay">
            <div className="recipe-form-card">
                <h2 className="form-title">{initialData.id ? 'Edit Recipe' : 'Create New Recipe'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input name="title" value={formData.title} onChange={handleChange} required placeholder="e.g. Grandma's Apple Pie" />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Cook Time (mins)</label>
                            <input type="number" name="cookTime" value={formData.cookTime} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Servings</label>
                            <input type="number" name="servings" value={formData.servings} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Recipe Image</label>
                        <div className="image-upload-container">
                            <input type="file" accept="image/*" onChange={handleFileChange} className="file-input" />
                            <div className="or-divider">OR</div>
                            <input name="coverImage" value={formData.coverImage} onChange={handleChange} placeholder="Paste image URL here" />
                        </div>
                        {formData.coverImage && (
                            <div className="image-preview">
                                <img src={formData.coverImage} alt="Preview" />
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Ingredients (One per line)</label>
                        <textarea name="ingredients" value={formData.ingredients} onChange={handleChange} required placeholder="2 cups flour&#10;1 cup sugar" rows="4"></textarea>
                    </div>

                    <div className="form-group">
                        <label>Instructions</label>
                        <textarea name="instructions" value={formData.instructions} onChange={handleChange} required placeholder="Mix ingredients and bake..." rows="4"></textarea>
                    </div>

                    <div className="form-actions">
                        {initialData.id && (
                            <button
                                type="button"
                                onClick={() => onDelete(initialData.id)}
                                className="btn-delete"
                            >
                                Delete Recipe
                            </button>
                        )}
                        <div className="main-actions">
                            <button type="button" onClick={onCancel} className="btn-outline">Cancel</button>
                            <button type="submit" className="btn-primary">Save Recipe</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RecipeForm;
