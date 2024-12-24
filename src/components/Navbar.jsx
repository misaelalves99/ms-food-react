import { Link } from "react-router-dom";

function Navbar() {
    return ( 
        <header>
            <div>
                <img src="../assets/logo.png" alt="Logo" />
            </div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/pedidos">Pedidos</Link></li>
                </ul>
            </nav>
        </header>
     );
}

export default Navbar;