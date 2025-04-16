//C:\Users\aimen\car-rental\src\pages\CarDetails\CarDetails.jsx
import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { carsData } from "../../data/cars";
import { CartContext } from "../../context/CartContext";
import { FaCar, FaGasPump, FaUserFriends, FaCog } from "react-icons/fa";
import "./carDetails.css";

const CarDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);
    const [duration, setDuration] = useState(1);

    const car = carsData.find((car) => car.id === parseInt(id));

    if (!car) {
        return <h2 className="not-found">Véhicule introuvable</h2>;
    }

    const handleChoose = () => {
        const totalPrice = car.price * duration;
        const carWithDetails = { 
            ...car, 
            duration, 
            totalPrice,
            // Ajout des informations nécessaires pour la réservation
            startDate: new Date().toISOString(), // Date de début maintenant
            endDate: new Date(Date.now() + duration * 24 * 60 * 60 * 1000).toISOString(), // Date de fin après 'duration' jours
            status: "pending", // Statut initial
            createdAt: new Date().toISOString(), // Date de création
            id: `res-${Date.now()}-${Math.random().toString(36).substr(2, 9)}` // ID unique
        };

        // 1. Ajouter au panier
        addToCart(carWithDetails);
        
        // 2. Ajouter aux réservations dans localStorage
        const existingReservations = JSON.parse(localStorage.getItem('reservations') || '[]');
        const updatedReservations = [...existingReservations, carWithDetails];
        localStorage.setItem('reservations', JSON.stringify(updatedReservations));
        
        // Notifier les autres onglets du changement
        window.dispatchEvent(new Event('storage'));
        
        alert(`${car.name} ajouté pour ${duration} jour(s) (${totalPrice}€)`);
        navigate("/cart");
    };

    return (
        <div className="car-details-page">
            <div className="car-details-container">
                <h1 className="car-title">{car.name}</h1>
                <img src={car.image} alt={car.name} className="car-image-large" />

                <div className="car-specifications">
                    <div className="spec-item">
                        <FaUserFriends className="spec-icon" />
                        <span>{car.seats} places</span>
                    </div>
                    <div className="spec-item">
                        <FaGasPump className="spec-icon" />
                        <span>{car.fuelType}</span>
                    </div>
                    <div className="spec-item">
                        <FaCog className="spec-icon" />
                        <span>{car.transmission}</span>
                    </div>
                    <div className="spec-item">
                        <FaCar className="spec-icon" />
                        <span>{car.type}</span>
                    </div>
                </div>

                <p className="car-description">{car.description}</p>

                <div className="rental-options">
                    <div className="price-section">
                        <strong>Prix :</strong> {car.price}€/jour
                    </div>

                    <div className="duration-section">
                        <label htmlFor="duration">Durée (jours) :</label>
                        <input
                            type="number"
                            id="duration"
                            min="1"
                            value={duration}
                            onChange={(e) => setDuration(parseInt(e.target.value))}
                            className="duration-input"
                        />
                    </div>
                </div>

                <div className="button-container">
                    <button className="choose-button" onClick={handleChoose}>
                        Choisir
                    </button>
                    <button className="back-button" onClick={() => navigate("/vehicules")}>
                        Retour à l'accueil
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CarDetails;