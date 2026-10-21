import React, { useState } from "react";
import { Link } from "react-router-dom";

function AdminUsuarios() {

    const [usuarios, setUsuarios] = useState(function() {

        const usuariosGuardados =
            localStorage.getItem("usuariosAdmin");

        return usuariosGuardados
            ? JSON.parse(usuariosGuardados)
            : [];
    });


    function eliminarUsuario(id) {

        const confirmar =
            window.confirm(
                "¿Seguro que deseas eliminar este usuario?"
            );

        if (!confirmar) {
            return;
        }


        const usuariosActualizados =
            usuarios.filter(function(usuario) {
                return usuario.id !== id;
            });


        setUsuarios(usuariosActualizados);


        localStorage.setItem(
            "usuariosAdmin",
            JSON.stringify(usuariosActualizados)
        );
    }


    return (
        <main className="container py-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h1>
                    Administración de usuarios
                </h1>

                <Link
                    to="/admin"
                    className="btn btn-outline-secondary"
                >
                    Volver al panel
                </Link>

            </div>


            {usuarios.length === 0 ? (

                <div className="alert alert-info text-center">
                    No hay usuarios registrados.
                </div>

            ) : (

                <div className="table-responsive">

                    <table className="table table-striped table-bordered align-middle">

                        <thead className="table-dark">

                            <tr>
                                <th>
                                    Nombre
                                </th>

                                <th>
                                    Apellido
                                </th>

                                <th>
                                    Correo
                                </th>

                                <th>
                                    Fecha de nacimiento
                                </th>

                                <th>
                                    Acciones
                                </th>
                            </tr>

                        </thead>


                        <tbody>

                            {usuarios.map(function(usuario) {

                                return (
                                    <tr key={usuario.id}>

                                        <td>
                                            {usuario.nombre}
                                        </td>

                                        <td>
                                            {usuario.apellido}
                                        </td>

                                        <td>
                                            {usuario.correo}
                                        </td>

                                        <td>
                                            {usuario.fechaNacimiento}
                                        </td>

                                        <td>

                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm"
                                                onClick={function() {
                                                    eliminarUsuario(
                                                        usuario.id
                                                    );
                                                }}
                                            >
                                                Eliminar
                                            </button>

                                        </td>

                                    </tr>
                                );

                            })}

                        </tbody>

                    </table>

                </div>

            )}

        </main>
    );
}

export default AdminUsuarios;