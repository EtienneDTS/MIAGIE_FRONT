import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HouseLogo } from "../components/HouseLogo";
import "./GetAll.css";

export const GetAll = ({ about }: { about: number }) => {
  const [name, setName] = useState<string>("");
  const [list, setList] = useState<any[]>([]);

  const navigate = useNavigate();
  const path = about == 1 ? "eleve" : "professeur";

  const fetchData = async (arg: string) => {
    if (arg === "") {
    const response = await fetch(`http://localhost:8000/${path}`);
    const data = await response.json();
    setList(data);
    } else {
    const response = await fetch(`http://localhost:8000/${path}?nom=${arg}`);
    const data = await response.json();
    setList(data);
    }
  };

  useEffect(() => {
    fetchData(name);
  }, [name]);

  useEffect(() => {
    fetchData("");
    // setList([
    //     {
    //       nom: "Dupont",
    //       prenom: "Jean",
    //       totalPoints: 120,
    //       nomMaison: "Gryffondor"
    //     },
    //     {
    //       nom: "Durand",
    //       prenom: "Marie",
    //       totalPoints: 150,
    //       nomMaison: "Serdaigle"
    //     },
    //     {
    //       nom: "Martin",
    //       prenom: "Pierre",
    //       totalPoints: 110,
    //       nomMaison: "Poufsouffle"
    //     },
    //     {
    //       nom: "Lefevre",
    //       prenom: "Sophie",
    //       totalPoints: 130,
    //       nomMaison: "Serpentard"
    //     },
    //     {
    //       nom: "Petit",
    //       prenom: "Lucas",
    //       totalPoints: 145,
    //       nomMaison: "Gryffondor"
    //     },
    //     {
    //       nom: "Moreau",
    //       prenom: "Elodie",
    //       totalPoints: 135,
    //       nomMaison: "Serdaigle"
    //     },
    //     {
    //       nom: "Garcia",
    //       prenom: "Julien",
    //       totalPoints: 125,
    //       nomMaison: "Poufsouffle"
    //     },
    //     {
    //       nom: "Rousseau",
    //       prenom: "Emma",
    //       totalPoints: 160,
    //       nomMaison: "Serpentard"
    //     },
    //     {
    //       nom: "Blanc",
    //       prenom: "Lucie",
    //       totalPoints: 105,
    //       nomMaison: "Gryffondor"
    //     },
    //     {
    //       nom: "Faure",
    //       prenom: "Hugo",
    //       totalPoints: 140,
    //       nomMaison: "Serdaigle"
    //     },
    //     {
    //       nom: "Bernard",
    //       prenom: "Laura",
    //       totalPoints: 115,
    //       nomMaison: "Poufsouffle"
    //     },
    //     {
    //       nom: "Girard",
    //       prenom: "Paul",
    //       totalPoints: 155,
    //       nomMaison: "Serpentard"
    //     }
    //   ])
  }, []);

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
          <div
            key={index}
            className="item"
            onClick={() => {
              navigate(`${path}/${item.id}`);
            }}
          >
            <p>{item.nom}</p>
            <p>{item.prenom}</p>
            <p>{item.totalPoints}</p>
            <p ><div className="houselogo"><HouseLogo house={item.nomMaison}/></div></p>
          </div>
        ))}
      </div>
    </div>
  );
};
