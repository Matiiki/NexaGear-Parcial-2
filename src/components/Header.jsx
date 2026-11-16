
import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

function leerSesion() {
    try {
        return JSON.parse(
            localStorage.getItem("sesionUsuario")
        );
    } catch (error) {
        return null;
    }
}

function Header({ carrito }) {

    const history = useHistory();
    const location = useLocation();

    const [usuario, setUsuario] = useState(leerSesion);

    useEffect(function() {
        setUsuario(leerSesion());
    }, [location.pathname]);

    const rol = usuario ? usuario.rol : null;

    const cantidadTotal = carrito.reduce(
        function(total, producto) {
            return total + producto.cantidad;
        },
        0
    );

    function cerrarSesion() {
        localStorage.removeItem("sesionUsuario");
        setUsuario(null);
        history.replace("/");
    }

    return (
        <header className="navbar navbar-expand-lg navbar-dark bg-dark px-4">

            <Link
                className="navbar-brand fw-bold"
                to={
                    rol === "VENDEDOR"
                        ? "/vendedor/productos"
                        : "/"
                }
            >
                NexaGear
            </Link>

            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#menuPrincipal"
                aria-controls="menuPrincipal"
                aria-expanded="false"
                aria-label="Abrir menú"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div
                className="collapse navbar-collapse"
                id="menuPrincipal"
            >

                <ul className="navbar-nav mx-auto">

                    {rol === "VENDEDOR" ? (
                        <>
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/vendedor/productos"
                                >
                                    Productos
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/vendedor/pedidos"
                                >
                                    Órdenes
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    Inicio
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/productos"
                                >
                                    Productos
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/categorias"
                                >
                                    Categorías
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/ofertas"
                                >
                                    Ofertas
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/contacto"
                                >
                                    Contacto
                                </Link>
                            </li>

                            {rol === "ADMINISTRADOR" && (
                                <li className="nav-item">
                                    <Link
                                        className="nav-link fw-bold text-warning"
                                        to="/admin"
                                    >
                                        Administración
                                    </Link>
                                </li>
                            )}
                        </>
                    )}

                </ul>

                <div className="d-flex flex-wrap align-items-center gap-2">

                    {usuario ? (
                        <>
                            <span className="text-light">
                                Hola, {usuario.nombre}
                            </span>

                            <button
                                type="button"
                                className="btn btn-outline-danger"
                                onClick={cerrarSesion}
                            >
                                Cerrar sesión
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                className="btn btn-outline-light"
                                to="/login"
                            >
                                Iniciar sesión
                            </Link>

                            <Link
                                className="btn btn-outline-light"
                                to="/registro"
                            >
                                Registro
                            </Link>
                        </>
                    )}

                    {rol !== "VENDEDOR" && (
                        <Link
                            className="btn btn-primary"
                            to="/carrito"
                        >
                            🛒 Carrito ({cantidadTotal})
                        </Link>
                    )}

                </div>
            </div>
        </header>
    );
}

export default Header;
