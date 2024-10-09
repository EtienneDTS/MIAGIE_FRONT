import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

export const Login = ({
  setLoggedUser,
}: {
  setLoggedUser: (user: any) => void;
}) => {
  const [usersData, setUsersData] = useState<any[]>([]);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/db.json");
        const data = await response.json();
        setUsersData(data);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      }
    };

    fetchUsers();
  }, [[], usersData]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const user = usersData.find(
      (user) => user?.id === parseInt(id) && user?.motDePasse === password
    );

    if (user) {
      setLoggedUser(user);
      setErrorMessage("");
      navigate("/");
    } else {
      setErrorMessage("Identifiant ou mot de passe incorrect");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Bienvenue à Poudlard</h1>
      <p className="login-subtitle">
        Veuillez entrer vos identifiants magiques
      </p>

      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Identifiant</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Votre identifiant de sorcier"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Mot de passe magique"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit" className="login-btn">
          Connexion
        </button>
      </form>
    </div>
  );
};
