import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Detail.css";
import { HouseLogo } from "../components/HouseLogo";
import { BadgePlus } from "lucide-react";

interface User {
  id: number;
  nom: string;
  prenom: string;
  totalPoints?: number;
  nomMaison?: string;
  specialite?: string;
  matiere?: string; 
}

export const Detail = ({
  path,
  loggedUser,
}: {
  path: string;
  loggedUser: any;
}) => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User>();
  const [points, setPoints] = useState<boolean>(false);
  const [numberPoints, setNumberPoints] = useState<number>(0);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/${path}/${id}`);
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données : ", error);
    }
  };

  useEffect(() => {
    // fetchUserData();
    setUser({
      id: 4,
      totalPoints: 0,
      nom: "Longbottom",
      prenom: "Neville",
      nomMaison: "Gryffondor",
    });
  }, [id]);

  const addPoints = async () => {
    const response = await fetch("http://localhost:8080/evaluer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idEleve: id,
        idProfesseur: loggedUser.id,
        nbPoints: numberPoints,
      }),
    });
    const data = await response.json();
    console.log(data);
    fetchUserData();
  };

  return (
    <div className="profile-container">
      <div className="title">
        <h1 className="profile-name">
          {user?.prenom} {user?.nom}
        </h1>

        <div className="logoMaison">
          {user?.nomMaison && <HouseLogo house={user?.nomMaison} />}
        </div>
      </div>

      <h2>Détails du Profil</h2>
      <div className="profile-details">
        <div className="detail-item">
          <strong>Identifiant:</strong> <span>{id}</span>
        </div>
        <div className="detail-item">
          <strong>Maison:</strong> <span>{user?.nomMaison}</span>
        </div>
        <div className="detail-item">
          <strong>Total des Points:</strong> <span>{user?.totalPoints}</span>
        </div>
      </div>
      <div className="profile-footer">
        {loggedUser?.fonction === "professeur" && (
          <div>
            {points ? (
              <div className="box">
                <input
                  type="number"
                  value={numberPoints}
                  onChange={(e) => setNumberPoints(parseInt(e.target.value))}
                />
                <div
                  onClick={() => {
                    addPoints();
                  }}
                >
                  <BadgePlus className="logo" color="gold" />
                </div>
              </div>
            ) : (
              <button onClick={() => setPoints(true)}>
                Ajouter des points
              </button>
            )}
          </div>
        )}

        <button
          onClick={() => {
            navigate(`/${path}s`);
          }}
        >
          Retour
        </button>
      </div>
    </div>
  );
};
