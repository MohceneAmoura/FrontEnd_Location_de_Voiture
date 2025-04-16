//C:\Users\aimen\car-rental\src\pages\AdminApproval\AdminApproval.jsx
//C:\Users\aimen\car-rental\src\pages\AdminApproval\AdminApproval.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './adminApproval.css';
import HeaderAdmin from '../../components/HeaderAdmin/headerAdmin';
// Import de l'image Admin
import AdminIcon from '../../assets/IconAdmin/Admin.png';

const AdminApproval = () => {
  const [pendingCars, setPendingCars] = useState([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [activeSection, setActiveSection] = useState('approve'); // Par défaut sur "approuver"
  const [car, setCar] = useState({
    name: "",
    category: "",
    price: "",
    image: null,
    seats: "",
    fuelType: "",
    transmission: "",
    type: "",
    description: "",
    status: "approved" // Statut directement approuvé pour l'admin
  });
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  // Options pour les menus déroulants
  const categoryOptions = ["Économique", "Confort", "Luxe", "Familiale", "SUV", "Sport"];
  const fuelTypeOptions = ["Essence", "Diesel", "Hybride", "Électrique", "GPL"];
  const transmissionOptions = ["Manuelle", "Automatique", "Semi-automatique"];
  const carTypeOptions = ["Berline", "SUV", "Coupé", "Cabriolet", "Monospace", "Break", "Citadine"];

  useEffect(() => {
    const cars = JSON.parse(localStorage.getItem("pendingCars")) || [];
    setPendingCars(cars);
    
    // Écouteurs d'événements supprimés car nous utilisons maintenant un système d'onglets intégré
  }, []);

  const approveCar = (index) => {
    const updatedPendingCars = [...pendingCars];
    const approvedCar = updatedPendingCars.splice(index, 1)[0];
    approvedCar.status = "approved";
    
    const approvedCars = JSON.parse(localStorage.getItem("carList")) || [];
    localStorage.setItem("carList", JSON.stringify([...approvedCars, approvedCar]));
    
    localStorage.setItem("pendingCars", JSON.stringify(updatedPendingCars));
    setPendingCars(updatedPendingCars);
    window.dispatchEvent(new Event("carListUpdated"));
  };

  const rejectCar = (index) => {
    const updatedPendingCars = [...pendingCars];
    updatedPendingCars.splice(index, 1);
    localStorage.setItem("pendingCars", JSON.stringify(updatedPendingCars));
    setPendingCars(updatedPendingCars);
  };

  const toggleDescription = (index) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      convertToBase64(file);
    }
  };

  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setCar((prevCar) => ({ ...prevCar, image: reader.result }));
    };
    reader.onerror = (error) => {
      console.error("Erreur lors de la conversion de l'image : ", error);
    };
  };

  const handleAddCarSubmit = (e) => {
    e.preventDefault();
    if (!car.name || !car.price || !car.image) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    // Ajouter directement à la liste des voitures approuvées
    const approvedCars = JSON.parse(localStorage.getItem("carList")) || [];
    localStorage.setItem("carList", JSON.stringify([...approvedCars, car]));
    
    alert("La voiture a été ajoutée avec succès !");
    
    // Réinitialiser le formulaire
    setCar({
      name: "",
      category: "",
      price: "",
      image: null,
      seats: "",
      fuelType: "",
      transmission: "",
      type: "",
      description: "",
      status: "approved"
    });
    setPreviewImage(null);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (section === 'reservations') {
      navigate('/Reservation');
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'add':
        return (
          <div className="admin-add-car-form">
            <h3>Ajouter une nouvelle voiture</h3>
            <form onSubmit={handleAddCarSubmit} className="add-car-form-horizontal">
              <div className="form-columns">
                <div className="form-column">
                  <div className="form-group">
                    <label htmlFor="name">Nom de la voiture</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      placeholder="Ex: Renault Clio" 
                      onChange={handleChange} 
                      value={car.name}
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="category">Catégorie</label>
                    <select 
                      id="category" 
                      name="category" 
                      value={car.category}
                      onChange={handleChange} 
                      required
                    >
                      <option value="" disabled>Sélectionnez une catégorie</option>
                      {categoryOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group price-input-container">
                    <label htmlFor="price">Prix par jour</label>
                    <div className="price-input-wrapper">
                      <input 
                        type="number" 
                        id="price" 
                        name="price" 
                        placeholder="2000.00" 
                        onChange={handleChange} 
                        value={car.price}
                        required 
                      />
                      <span className="price-suffix">DZG / jour</span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="seats">Nombre de places</label>
                    <input 
                      type="number" 
                      id="seats" 
                      name="seats" 
                      placeholder="Ex: 5" 
                      onChange={handleChange} 
                      value={car.seats}
                      required 
                    />
                  </div>
                </div>

                <div className="form-column">
                  <div className="form-group file-input-container">
                    <label htmlFor="car-image">Image de la voiture</label>
                    <input 
                      id="car-image" 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageChange} 
                      required 
                      style={{ display: 'none' }}
                    />
                    <div 
                      className="file-upload-box" 
                      onClick={() => document.getElementById('car-image').click()}
                    >
                      {previewImage ? (
                        <img src={previewImage} alt="Aperçu" className="image-preview" />
                      ) : (
                        <div className="upload-placeholder">
                          <span>Cliquez pour ajouter une image</span>
                          <small>JPEG, PNG ou JPG (max 5Mo)</small>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="fuelType">Type de carburant</label>
                    <select 
                      id="fuelType" 
                      name="fuelType" 
                      value={car.fuelType}
                      onChange={handleChange} 
                      required
                    >
                      <option value="" disabled>Sélectionnez un type de carburant</option>
                      {fuelTypeOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="transmission">Transmission</label>
                    <select 
                      id="transmission" 
                      name="transmission" 
                      value={car.transmission}
                      onChange={handleChange} 
                      required
                    >
                      <option value="" disabled>Sélectionnez un type de transmission</option>
                      {transmissionOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-column">
                  <div className="form-group">
                    <label htmlFor="type">Type de voiture</label>
                    <select 
                      id="type" 
                      name="type" 
                      value={car.type}
                      onChange={handleChange} 
                      required
                    >
                      <option value="" disabled>Sélectionnez un type de voiture</option>
                      {carTypeOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="description">Description</label>
                    <textarea 
                      id="description" 
                      name="description" 
                      placeholder="Décrivez la voiture (équipements, état, particularités...)" 
                      rows="4" 
                      onChange={handleChange} 
                      value={car.description}
                      required
                    ></textarea>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="submit-button">
                      Ajouter la voiture
                    </button>
                    <button 
                      type="button" 
                      className="return-button" 
                      onClick={() => setActiveSection('approve')}
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        );
      case 'approve':
        return (
          <div>
            {pendingCars.length === 0 ? (
              <p>Aucune voiture en attente de validation.</p>
            ) : (
              <div className="car-list">
                {pendingCars.map((car, index) => (
                  <div key={index} className="car-card">
                    {car.image && <img src={car.image} alt={car.name} className="car-image" />}
                    <div className="car-details">
                      <h3 data-category={car.category}>{car.name}</h3>
                      <p>{car.seats} places</p>
                      <p>{car.fuelType}</p>
                      <p>{car.transmission}</p>
                      <p>{car.type}</p>
                    </div>
                    
                    <button className="description-toggle" onClick={() => toggleDescription(index)}>
                      Voir la description
                    </button>
                    
                    {expandedDescriptions[index] && (
                      <div className="car-description">
                        <p>{car.description}</p>
                      </div>
                    )}
                    
                    <div className="divider"></div>
                    
                    <div className="price-section">
                      <div className="price-tag">
                        {car.price}€<span className="per-day">/jour</span>
                      </div>
                    </div>
                    
                    <div className="approval-actions">
                      <button onClick={() => approveCar(index)} className="approve-btn">Approuver</button>
                      <button onClick={() => rejectCar(index)} className="reject-btn">Rejeter</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <div className="dashboard-icon">
            <span>🛡️</span>
          </div>
          <h1>Administration</h1>
        </div>
        <div className="dashboard-user">
          <div className="dashboard-user-avatar">
            <img src={AdminIcon} alt="Admin" className="admin-avatar-image" />
          </div>
          <div className="dashboard-user-info">
            <span className="dashboard-user-name">Admin</span>
            <button onClick={() => navigate('/')} className="dashboard-logout">
              Déconnexion
            </button>
          </div>
        </div>
      </div>
      
      <div className="dashboard-container">
        <div className="dashboard-sidebar">
          <ul className="dashboard-menu">
            <li 
              className={`dashboard-menu-item ${activeSection === 'add' ? 'active' : ''}`}
              onClick={() => handleSectionChange('add')}
            >
              <span className="dashboard-menu-icon">🚗</span>
              <span className="dashboard-menu-text">Ajouter une voiture</span>
            </li>
            
            <li 
              className={`dashboard-menu-item ${activeSection === 'approve' ? 'active' : ''}`}
              onClick={() => handleSectionChange('approve')}
            >
              <span className="dashboard-menu-icon">✅</span>
              <span className="dashboard-menu-text">Approuver les voitures</span>
            </li>
            
            <li 
              className={`dashboard-menu-item ${activeSection === 'reservations' ? 'active' : ''}`}
              onClick={() => handleSectionChange('reservations')}
            >
              <span className="dashboard-menu-icon">📅</span>
              <span className="dashboard-menu-text">Voir les réservations</span>
            </li>
          </ul>
        </div>
        
        <div className="dashboard-content">
          <h2 className="animated-title">
            {activeSection === 'add' ? 'Ajout de voiture' : 
             activeSection === 'approve' ? 'Validation des voitures' : 
             'Réservations'}
          </h2>
          
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminApproval;