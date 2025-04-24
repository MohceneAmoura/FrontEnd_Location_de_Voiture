//C:\Users\aimen\car-rental\src\pages\Profile\Profile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getUserById, updateUserInfo } from '../../data/User';
import { motion } from 'framer-motion'; // Import de framer-motion pour les animations
import './Profile.css';

const Profile = () => {
  // États du composant
  const [profile, setProfile] = useState({
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    licenseNumber: '',
    email: '',
    phone: '',
    gender: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState({...profile});
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('personal'); // État pour gérer l'onglet actif
  const navigate = useNavigate();
<button 
  className="browse-btn" 
  onClick={() => navigate('/vehicules')}
>
  Découvrir nos véhicules
</button>
  // Récupération des données utilisateur
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Simulation de chargement
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Récupération de l'ID utilisateur depuis localStorage
        const userId = localStorage.getItem('userId') || "USR123456";
        const userData = getUserById(userId);

        if (userData) {
          setProfile(userData);
          setTempProfile(userData);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempProfile(prev => ({ ...prev, [name]: value }));
  };

  // Activer le mode édition
  const handleEdit = () => setIsEditing(true);

  // Sauvegarder les modifications
  const handleSave = () => {
    const updatedUser = updateUserInfo(profile.id, tempProfile);
    if (updatedUser) {
      setProfile(updatedUser);
      setIsEditing(false);
      
      // Notification de succès
// Notification de succès - mise à jour
const notification = document.createElement('div');
notification.className = 'profile-success-notification';
notification.textContent = 'Profil mis à jour avec succès !';
document.body.appendChild(notification);

setTimeout(() => {
  notification.classList.add('hide');
  setTimeout(() => document.body.removeChild(notification), 500);
}, 3000);
    }
  };

  // Annuler les modifications
  const handleCancel = () => {
    setTempProfile({...profile});
    setIsEditing(false);
  };

  // Formater la date pour l'affichage
  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString('fr-FR') : '';
  };

  // Variants d'animation pour les éléments
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  // Si chargement en cours, afficher un spinner
  if (isLoading) {
    return (
      <div className="profile-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Chargement de votre profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-page">
      <motion.div 
        className="sidebar"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="sidebar-header">
          <div className="avatar-circle">
            {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
          </div>
          <h2>{profile.firstName} {profile.lastName}</h2>
          <p className="user-id">ID: {profile.id}</p>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            <i className="fas fa-user"></i>
            Informations personnelles
          </button>
          <button 
            className={`nav-item ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <i className="fas fa-history"></i>
            Historique des locations
          </button>
        </nav>
      </motion.div>

      <motion.div 
        className="main-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div 
          className="profile-header"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Mon Profil</h1>
          <p>Gérez vos informations personnelles et suivez vos locations</p>
        </motion.div>

        {activeTab === 'personal' && (
          <motion.div 
            className="profile-card"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="card-header" variants={itemVariants}>
              <h2>Informations personnelles</h2>
              {!isEditing && (
                <button className="edit-btn" onClick={handleEdit}>
                  <i className="fas fa-pencil-alt"></i> Modifier
                </button>
              )}
            </motion.div>

            <div className="card-content">
              {isEditing ? (
                <motion.form 
                  className="edit-profile-form" 
                  onSubmit={(e) => e.preventDefault()}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="form-row">
                    <motion.div className="form-group" variants={itemVariants}>
                      <label htmlFor="firstName">Prénom</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={tempProfile.firstName}
                        onChange={handleChange}
                        required
                      />
                    </motion.div>

                    <motion.div className="form-group" variants={itemVariants}>
                      <label htmlFor="lastName">Nom</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={tempProfile.lastName}
                        onChange={handleChange}
                        required
                      />
                    </motion.div>
                  </div>

                  <div className="form-row">
                    <motion.div className="form-group" variants={itemVariants}>
                      <label htmlFor="dateOfBirth">Date de naissance</label>
                      <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={tempProfile.dateOfBirth}
                        onChange={handleChange}
                        required
                      />
                    </motion.div>

                    <motion.div className="form-group" variants={itemVariants}>
                      <label htmlFor="gender">Sexe</label>
                      <select
                        id="gender"
                        name="gender"
                        value={tempProfile.gender}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Sélectionnez</option>
                        <option value="Homme">Homme</option>
                        <option value="Femme">Femme</option>
                        <option value="Autre">Autre</option>
                      </select>
                    </motion.div>
                  </div>

                  <motion.div className="form-group" variants={itemVariants}>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={tempProfile.email}
                      onChange={handleChange}
                      required
                      disabled
                    />
                  </motion.div>

                  <div className="form-row">
                    <motion.div className="form-group" variants={itemVariants}>
                      <label htmlFor="phone">Téléphone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={tempProfile.phone}
                        onChange={handleChange}
                        required
                        pattern="[0-9]{10}"
                        title="10 chiffres sans espaces"
                      />
                    </motion.div>

                    <motion.div className="form-group" variants={itemVariants}>
                      <label htmlFor="licenseNumber">Numéro de permis</label>
                      <input
                        type="text"
                        id="licenseNumber"
                        name="licenseNumber"
                        value={tempProfile.licenseNumber}
                        onChange={handleChange}
                        required
                        pattern="[A-Za-z0-9]{9,15}"
                        title="9 à 15 caractères alphanumériques"
                      />
                    </motion.div>
                  </div>

                  <motion.div className="action-buttons" variants={itemVariants}>
                    <button type="button" className="save-btn" onClick={handleSave}>
                      <i className="fas fa-check"></i> Enregistrer
                    </button>
                    <button type="button" className="cancel-btn" onClick={handleCancel}>
                      <i className="fas fa-times"></i> Annuler
                    </button>
                  </motion.div>
                </motion.form>
              ) : (
                <motion.div 
                  className="profile-info"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div className="info-section" variants={itemVariants}>
                    <h3>Coordonnées personnelles</h3>
                    <div className="info-grid">
                      <div className="info-cell">
                        <span className="info-label">Prénom:</span>
                        <span className="info-value">{profile.firstName}</span>
                      </div>
                      <div className="info-cell">
                        <span className="info-label">Nom:</span>
                        <span className="info-value">{profile.lastName}</span>
                      </div>
                      <div className="info-cell">
                        <span className="info-label">Date de naissance:</span>
                        <span className="info-value">{formatDate(profile.dateOfBirth)}</span>
                      </div>
                      <div className="info-cell">
                        <span className="info-label">Sexe:</span>
                        <span className="info-value">{profile.gender}</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div className="info-section" variants={itemVariants}>
                    <h3>Coordonnées de contact</h3>
                    <div className="info-grid">
                      <div className="info-cell">
                        <span className="info-label">Email:</span>
                        <span className="info-value">{profile.email}</span>
                      </div>
                      <div className="info-cell">
                        <span className="info-label">Téléphone:</span>
                        <span className="info-value">{profile.phone}</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div className="info-section" variants={itemVariants}>
                    <h3>Informations de conduite</h3>
                    <div className="info-grid">
                      <div className="info-cell">
                        <span className="info-label">Numéro de permis:</span>
                        <span className="info-value">{profile.licenseNumber}</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'history' && (
          <motion.div 
            className="rental-history-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="card-header" variants={itemVariants}>
              <h2>Historique des locations</h2>
            </motion.div>

            <motion.div className="empty-history" variants={itemVariants}>
              <div className="empty-icon">
                <i className="fas fa-car"></i>
              </div>
              <h3>Aucune location trouvée</h3>
              <p>Vous n'avez pas encore effectué de location de véhicule.</p>
              <Link to="/vehicules" className="browse-btn">
              Découvrir nos véhicules
              </Link>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div></div>
  );
};

export default Profile;