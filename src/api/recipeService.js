import axiosInstance from './axiosInstance';

const recipeService = {
    getAllRecipes: async (query = '') => {
        const endpoint = query ? `/recipe?q=${query}` : '/recipe';
        const response = await axiosInstance.get(endpoint);
        return response.data;
    },

    getRecipeById: async (id) => {
        const response = await axiosInstance.get(`/recipe/${id}`);
        return response.data;
    },

    createRecipe: async (recipeData) => {
        const response = await axiosInstance.post('/recipe', recipeData);
        return response.data;
    },

    updateRecipe: async (id, recipeData) => {
        const response = await axiosInstance.put(`/recipe/${id}`, recipeData);
        return response.data;
    },

    deleteRecipe: async (id) => {
        const response = await axiosInstance.delete(`/recipe/${id}`);
        return response.data;
    },

    getMyRecipes: async () => {
        const response = await axiosInstance.get('/recipe/my-recipes');
        return response.data;
    },
};

export default recipeService;
