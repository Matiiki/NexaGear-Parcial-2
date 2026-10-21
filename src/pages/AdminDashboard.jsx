import React from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {

    return (
        <main className="container py-5">

            <h1 className="text-center mb-3">
                Panel de administración
            </h1>

            <p className="text-center text-muted mb-5">
                Gestiona la información de NexaGear.
            </p>


            <div className="row">


                {/* PRODUCTOS */}

                <div className="col-12 col-md-6 col-lg-4 mb-4">

                    <div className="card h-100 shadow-sm">

                        <div className="card-body text-center">

                            <h2 className="h4">
                                Productos
                            </h2>

                            <p>
                                Crear, editar y eliminar productos
                                del catálogo.
                            </p>

                            <Link
                                to="/admin/productos"
                                className="btn btn-primary"
                            >
                                Administrar productos
                            </Link>

                        </div>

                    </div>

                </div>


                {/* CATEGORÍAS */}

                <div className="col-12 col-md-6 col-lg-4 mb-4">

                    <div className="card h-100 shadow-sm">

                        <div className="card-body text-center">

                            <h2 className="h4">
                                Categorías
                            </h2>

                            <p>
                                Gestionar las categorías
                                disponibles en la tienda.
                            </p>

                            <Link
                                to="/admin/categorias"
                                className="btn btn-primary"
                            >
                                Administrar categorías
                            </Link>

                        </div>

                    </div>

                </div>


                {/* USUARIOS */}

                <div className="col-12 col-md-6 col-lg-4 mb-4">

                    <div className="card h-100 shadow-sm">

                        <div className="card-body text-center">

                            <h2 className="h4">
                                Usuarios
                            </h2>

                            <p>
                                Revisar los usuarios registrados
                                en NexaGear.
                            </p>

                            <Link
                                to="/admin/usuarios"
                                className="btn btn-primary"
                            >
                                Ver usuarios
                            </Link>

                        </div>

                    </div>

                </div>


                {/* PEDIDOS */}

                <div className="col-12 col-md-6 col-lg-4 mb-4">

                    <div className="card h-100 shadow-sm">

                        <div className="card-body text-center">

                            <h2 className="h4">
                                Pedidos
                            </h2>

                            <p>
                                Consultar pedidos y compras
                                realizadas.
                            </p>

                            <Link
                                to="/admin/pedidos"
                                className="btn btn-primary"
                            >
                                Ver pedidos
                            </Link>

                        </div>

                    </div>

                </div>


                {/* REPORTES */}

                <div className="col-12 col-md-6 col-lg-4 mb-4">

                    <div className="card h-100 shadow-sm">

                        <div className="card-body text-center">

                            <h2 className="h4">
                                Reportes
                            </h2>

                            <p>
                                Consultar información general
                                de la tienda.
                            </p>

                            <Link
                                to="/admin/reportes"
                                className="btn btn-primary"
                            >
                                Ver reportes
                            </Link>

                        </div>

                    </div>

                </div>


                {/* TIENDA */}

                <div className="col-12 col-md-6 col-lg-4 mb-4">

                    <div className="card h-100 shadow-sm">

                        <div className="card-body text-center">

                            <h2 className="h4">
                                Ver tienda
                            </h2>

                            <p>
                                Volver a la vista pública
                                de NexaGear.
                            </p>

                            <Link
                                to="/"
                                className="btn btn-outline-primary"
                            >
                                Ir a la tienda
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
}

export default AdminDashboard;