import React, {
    useEffect,
    useState
} from "react";

import {
    Link,
    useHistory,
    useLocation
} from "react-router-dom";


function Header({ carrito }) {

    const history = useHistory();

    const location = useLocation();

    const [usuario, setUsuario] =
        useState(null);


    function obtenerSesion() {

        const sesionGuardada =
            localStorage.getItem(
                "sesionUsuario"
            );


        if (sesionGuardada) {

            setUsuario(
                JSON.parse(sesionGuardada)
            );

        } else {

            setUsuario(null);
        }
    }


    useEffect(function() {

        obtenerSesion();

    }, [location.pathname]);


    function cerrarSesion() {

        localStorage.removeItem(
            "sesionUsuario"
        );

        setUsuario(null);

        history.replace("/");
    }


    const cantidadTotal =
        carrito.reduce(
            function(total, producto) {

                return (
                    total +
                    producto.cantidad
                );
            },
            0
        );


    return (
        <header className="navbar navbar-expand-lg navbar-dark bg-dark px-4">

            <Link
                className="navbar-brand fw-bold"
                to="/"
            >
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

                        <Link
                            className="nav-link"
                            to="/"
                        >
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

                </ul>


                <div className="d-flex flex-wrap align-items-center gap-2">


                    {usuario ? (

                        <>

                            <span className="text-light">

                                Hola,{" "}
                                {usuario.nombre}

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
                                to="/login"
                                className="btn btn-outline-light"
                            >
                                Iniciar sesión
                            </Link>


                            <Link
                                to="/registro"
                                className="btn btn-outline-light"
                            >
                                Registro
                            </Link>

                        </>

                    )}


                    <Link
                        to="/carrito"
                        className="btn btn-primary"
                    >
                        🛒 Carrito ({cantidadTotal})
                    </Link>

                </div>

            </div>

        </header>
    );
}

export default Header;