//C:\Users\aimen\car-rental\src\data\User.js
// Fichier contenant les données utilisateurs pour le projet de location de voitures
// C:\Users\aimen\car-rental\src\data\User.js

const users = [
    {
      id: "USR123456",
      firstName: "Mohammed",
      lastName: "Alami",
      dateOfBirth: "1990-05-15",
      licenseNumber: "P123456789",
      email: "mohammed.alami@gmail.com",
      phone: "0612345678",
      gender: "Homme",
      password: "123", // Dans une application réelle, les mots de passe ne seraient jamais stockés en clair
      isAdmin: false
    },
    {
      id: "USR234567",
      firstName: "Fatima",
      lastName: "Benali",
      dateOfBirth: "1985-09-23",
      licenseNumber: "P234567891",
      email: "fatima.benali@example.com",
      phone: "0623456789",
      gender: "Femme",
      password: "secure456",
      isAdmin: false
    },
    {
      id: "USR345678",
      firstName: "Karim",
      lastName: "Idrissi",
      dateOfBirth: "1992-12-07",
      licenseNumber: "P345678912",
      email: "karim.idrissi@example.com",
      phone: "0634567891",
      gender: "Homme",
      password: "karim2022",
      isAdmin: false
    },
    {
      id: "USR456789",
      firstName: "Amina",
      lastName: "Ouazzani",
      dateOfBirth: "1988-03-18",
      licenseNumber: "P456789123",
      email: "amina.ouazzani@example.com",
      phone: "0645678912",
      gender: "Femme",
      password: "aminapass",
      isAdmin: false
    },
    {
      id: "ADM123456",
      firstName: "Hassan",
      lastName: "Moussaoui",
      dateOfBirth: "1982-11-30",
      licenseNumber: "P567891234",
      email: "admin@carental.com",
      phone: "0656789123",
      gender: "Homme",
      password: "admin2023",
      isAdmin: true
    }
  ];
  
  // Fonction pour trouver un utilisateur par son ID
  export const getUserById = (userId) => {
    return users.find(user => user.id === userId);
  };
  
  // Fonction pour trouver un utilisateur par son email
  export const getUserByEmail = (email) => {
    return users.find(user => user.email === email);
  };
  
  // Fonction pour vérifier les identifiants d'un utilisateur
  export const verifyUserCredentials = (email, password) => {
    const user = users.find(user => user.email === email && user.password === password);
    return user || null;
  };
  
  // Fonction pour mettre à jour les informations d'un utilisateur
  export const updateUserInfo = (userId, updatedInfo) => {
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex !== -1) {
      // Dans une application réelle, vous feriez une requête API ici
      users[userIndex] = { ...users[userIndex], ...updatedInfo };
      return users[userIndex];
    }
    
    return null;
  };
  
  export default users;