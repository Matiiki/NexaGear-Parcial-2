
import React, { useState } from "react";
import { Link } from "react-router-dom";

const cuentasDemo = [
    {
        id: "demo-admin",
        nombre: "Administrador",
        apellido: "NexaGear",
        correo: "admin@nexagear.cl",
        rol: "ADMINISTRADOR"
    },
    {
        id: "demo-vendedor",
        nombre: "Vendedor",
        apellido: "NexaGear",
        correo: "vendedor@nexagear.cl",
        rol: "VENDEDOR"
    },
    {
        id: "demo-cliente",
        nombre: "Cliente",
        apellido: "NexaGear",
        correo: "cliente@nexagear.cl",
        rol: "CLIENTE"
    }
];

function obtenerUsuariosRegistrados() {

    try {
        const guardados = localStorage.getItem("usuariosAdmin");
        const usuarios = guardados ? JSON.parse(guardados) : [];

        return Array.isArray(usuarios) ? usuarios : [];
    } catch (error) {
        return [];
    }
}

function AdminUsuarios() {

    const [usuarios, setUsuarios] = useState(
        obtenerUsuariosRegistrados
    );

    function eliminarUsuario(id) {

        const confirmar = window.confirm(
            "¿Seguro que deseas eliminar este usuario registrado?"
        );

        if (!confirmar) {
            return;
        }

        const actualizados = usuarios.filter(function(usuario) {
            return String(usuario.id) !== String(id);
        });

        setUsuarios(actualizados);

        localStorage.setItem(
            "usuariosAdmin",
            JSON.stringify(actualizados)
        );
    }

    return (
        <main className="container py-5">

            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">

                <h1 className="mb-0">
                    Administración de usuarios
                </h1>

                <Link
                    to="/admin"
                    className="btn btn-outline-secondary"
                >
                    Volver al panel
                </Link>

            </div>

            <div className="row g-3 mb-4">

                <div className="col-12 col-md-6">

                    <div className="card shadow-sm">
                        <div className="card-body">

                            <h2 className="h6 text-muted">
                                Cuentas de demostración
                            </h2>

                            <p className="fs-3 fw-bold mb-0">
                                {cuentasDemo.length}
                            </p>

                        </div>
                    </div>

                </div>

                <div className="col-12 col-md-6">

                    <div className="card shadow-sm">
                        <div className="card-body">

                            <h2 className="h6 text-muted">
                                Usuarios registrados
                            </h2>

                            <p className="fs-3 fw-bold mb-0">
                                {usuarios.length}
                            </p>

                        </div>
                    </div>

                </div>

            </div>

            <h2 className="h4 mb-3">
                Cuentas de demostración
            </h2>

            <div className="table-responsive mb-5">

                <table className="table table-bordered table-striped align-middle">

                    <thead className="table-dark">
                        <tr>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Rol</th>
                            <th>Tipo</th>
                        </tr>
                    </thead>

                    <tbody>

                        {cuentasDemo.map(function(usuario) {

                            return (
                                <tr key={usuario.id}>

                                    <td>
                                        {usuario.nombre} {usuario.apellido}
                                    </td>

                                    <td>{usuario.correo}</td>

                                    <td>
                                        <span className="badge bg-primary">
                                            {usuario.rol}
                                        </span>
                                    </td>

                                    <td>
                                        <span className="badge bg-secondary">
                                            Cuenta demo
                                        </span>
                                    </td>

                                </tr>
                            );
                        })}

                    </tbody>

                </table>

            </div>

            <h2 className="h4 mb-3">
                Clientes registrados
            </h2>

            {usuarios.length === 0 ? (

                <div className="alert alert-info">
                    Todavía no hay clientes registrados
                    en este navegador. Puedes crear uno
                    desde la página de Registro.
                </div>

            ) : (

                <div className="table-responsive">

                    <table className="table table-bordered table-striped align-middle">

                        <thead className="table-dark">
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Correo</th>
                                <th>Fecha de nacimiento</th>
                                <th>Rol</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>

                            {usuarios.map(function(usuario) {

                                return (
                                    <tr key={usuario.id}>

                                        <td>{usuario.nombre}</td>

                                        <td>{usuario.apellido}</td>

                                        <td>{usuario.correo}</td>

                                        <td>
                                            {usuario.fechaNacimiento || "-"}
                                        </td>

                                        <td>
                                            <span className="badge bg-success">
                                                {usuario.rol || "CLIENTE"}
                                            </span>
                                        </td>

                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm"
                                                onClick={function() {
                                                    eliminarUsuario(usuario.id);
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
