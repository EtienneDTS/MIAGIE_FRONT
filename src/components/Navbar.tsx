import "./Navbar.css";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {

    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <h1>MIAGIE</h1>
            <ul>
                <li onClick={()=>navigate("/")}>Menu principal</li>
                <li>LogIn</li>
            </ul>
        </nav>
    )
};