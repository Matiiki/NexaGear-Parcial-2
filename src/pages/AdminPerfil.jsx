import React, { useState } from "react";
import { Link } from "react-router-dom";

function AdminPerfil() {

    const [perfil, setPerfil] = useState(function() {

        const perfilGuardado =
            localStorage.getItem("perfilAdmin");

        return perfilGuardado
            ? JSON.parse(perfilGuardado)
            : {
                nombre: "Administrador NexaGear",
                correo: "admin@nexagear.cl",
                telefono: "",
                cargo: "Administrador"
            };
    });


    const [mensaje, setMensaje] = useState("");


    function manejarCambio(evento) {

        const { name, value } = evento.target;

        setPerfil({
            ...perfil,
            [name]: value
        });

        setMensaje("");
    }


    function guardarPerfil(evento) {

        evento.preventDefault();

        localStorage.setItem(
            "perfilAdmin",
            JSON.stringify(perfil)
        );

        setMensaje(
            "Perfil actualizado correctamente."
        );
    }


    return (
        <main className="container py-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h1>
                    Perfil administrador
                </h1>

                <Link
                    to="/admin"
                    className="btn btn-outline-secondary"
                >
                    Volver al panel
                </Link>

            </div>


            <div className="row justify-content-center">

                <div className="col-12 col-md-8 col-lg-6">

                    <div className="card shadow-sm">

                        <div className="card-body p-4">

                            <form onSubmit={guardarPerfil}>


                                <div className="mb-3">

                                    <label className="form-label">
                                        Nombre
                                    </label>

                                    <input
                                        type="text"
                                        name="nombre"
                                        className="form-control"
                                        value={perfil.nombre}
                                        onChange={manejarCambio}
                                    />

                                </div>


                                <div className="mb-3">

                                    <label className="form-label">
                                        Correo
                                    </label>

                                    <input
                                        type="email"
                                        name="correo"
                                        className="form-control"
                                        value={perfil.correo}
                                        onChange={manejarCambio}
                                    />

                                </div>


                                <div className="mb-3">

                                    <label className="form-label">
                                        Teléfono
                                    </label>

                                    <input
                                        type="text"
                                        name="telefono"
                                        className="form-control"
                                        value={perfil.telefono}
                                        onChange={manejarCambio}
                                    />

                                </div>


                                <div className="mb-3">

                                    <label className="form-label">
                                        Cargo
                                    </label>

                                    <input
                                        type="text"
                                        name="cargo"
                                        className="form-control"
                                        value={perfil.cargo}
                                        onChange={manejarCambio}
                                    />

                                </div>


                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >
                                    Guardar cambios
                                </button>


                                {mensaje && (

                                    <div className="alert alert-success mt-3">
                                        {mensaje}
                                    </div>

                                )}

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
}

export default AdminPerfil;