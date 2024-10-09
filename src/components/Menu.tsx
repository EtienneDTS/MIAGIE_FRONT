import "./Menu.css";
import { useNavigate } from "react-router-dom";

export const Menu = (loggedUser: any) => {
  const navigate = useNavigate();

  return (
    <div className="menu">
      <ul>
        <li onClick={()=>navigate("/eleves")}>Trouver un élève</li>
        <li onClick={()=>navigate("/profs")}>Trouver un professeur</li>
        <li onClick={()=>navigate("/maisons")}>Classement des maisons</li>
        {loggedUser && loggedUser.fonction === "professeur" && (<li onClick={()=>navigate("/ajouter")}>Ajouter un sorcier</li>)}
        <li onClick={()=>navigate("/jeux")}>Coupe de feu</li>
      </ul>
    </div>
  );
};
