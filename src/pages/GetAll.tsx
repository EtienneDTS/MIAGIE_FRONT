import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GetAll.css";

export const GetAll = ({ about }: { about: number }) => {


  const [name, setName] = useState<string>("");
  const [list, setList] = useState<any[]>([]);

  const navigate = useNavigate();
  const path = about == 1 ? "eleve" : "professeur";

  return (
    <div className="container">
      <h2>Liste des {about == 1 ? "élèves" : "Professeurs"}</h2>
      <div className="searchBar">
        <input
          type="text"
          placeholder="Rechercher"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <button className="btn-img"></button>
      </div>
      <div className="list">
        {list.map((item, index) => (
          <div key={index} className="item" onClick={()=>{navigate(`${path}/${item.id}`)}}>
            <p>{item.nom}</p>
            <p>{item.prenom}</p>
            <p>{item.totalPoints}</p>
            <p>{item.nomMaison}</p>
          </div>
        ))}

        
      </div>
    </div>
  );
};
