// src/pages/Login/Login.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaGoogle, FaFacebook } from 'react-icons/fa';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt with:', { email, password, rememberMe });
    // Ici, vous pourriez implémenter la logique d'authentification
  };

  return (
    <div className="login-page">
      <Header />
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>Connexion</h1>
            <p>Bienvenue sur AutoLibre 🚗✨, louez votre véhicule en quelques clics</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-with-icon">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  id="email"
                  placeholder="Votre adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  id="password"
                  placeholder="Votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-options">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="rememberMe">Se souvenir de moi</label>
              </div>
              <Link to="/forgot-password" className="forgot-password">
                Mot de passe oublié?
              </Link>
            </div>

            <button type="submit" className="login-button">
              Se connecter
            </button>

            <div className="social-login">
              <p>Ou connectez-vous avec</p>
              <div className="social-buttons">
                <button type="button" className="google-button">
                  <FaGoogle /> Google
                </button>
                <button type="button" className="facebook-button">
                  <FaFacebook /> Facebook
                </button>
              </div>
            </div>
          </form>

          <div className="register-link">
            <p>
              Vous n'avez pas de compte?{' '}
              <Link to="/signup">Créer un compte</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;