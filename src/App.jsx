import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home/Home';
import Categories from './pages/Categories/Categories';
import MyRecipes from './pages/MyRecipes/MyRecipes';
import Favorites from './pages/Favorites/Favorites';
import RecipeDetail from './pages/RecipeDetail/RecipeDetail';
import AuthPage from './pages/Auth/AuthPage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <Navbar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route
              path="/my-recipes"
              element={
                <ProtectedRoute>
                  <MyRecipes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
