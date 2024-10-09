import { useEffect } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

export const Navbar = ({loggedUser, setLoggedUser}:any) => {

    const navigate = useNavigate();
    useEffect(() => {
        console.log(loggedUser);
    }
    , [loggedUser]);
    console.log(loggedUser);

    return (
        <nav className="navbar">
            <h1>MIAGIE</h1>
            <ul>
                <li onClick={()=>navigate("/")}>Menu principal</li>
                {
                    !loggedUser ? <li onClick={()=>{navigate("/login")}}>LogIn</li> : <li onClick={()=>{
                        setLoggedUser(null);
                        navigate("/")}}>LogOut {loggedUser?.prenom}</li>
                }
                
            </ul>
        </nav>
    )
};