import React from "react";
import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="navbar navbar-expand-lg navbar-dark bg-dark px-4">

            <Link className="navbar-brand fw-bold" to="/">
                NexaGear
            </Link>

            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#menuPrincipal"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div
                className="collapse navbar-collapse"
                id="menuPrincipal"
            >

                <ul className="navbar-nav mx-auto">

                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            Inicio
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/productos">
                            Productos
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/registro">
                            Registro
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/contacto">
                            Contacto
                        </Link>
                    </li>

                </ul>

                <Link
                    className="btn btn-outline-light"
                    to="/carrito"
                >
                    🛒 Carrito
                </Link>

            </div>

        </header>
    );
}

export default Header;