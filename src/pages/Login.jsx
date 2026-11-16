
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import {
    correoEsValido
} from "../utils/logicaNexaGear.js";


const cuentasDemo = [
    {
        id: 1,
        nombre: "Administrador",
        correo: "admin@nexagear.cl",
        contrasena: "Admin1234!",
        rol: "ADMINISTRADOR"
    },
    {
        id: 2,
        nombre: "Vendedor",
        correo: "vendedor@nexagear.cl",
        contrasena: "Vendedor1234!",
        rol: "VENDEDOR"
    },
    {
        id: 3,
        nombre: "Cliente",
        correo: "cliente@nexagear.cl",
        contrasena: "Cliente1234!",
        rol: "CLIENTE"
    }
];


function Login() {

    const history = useHistory();

    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState("");


    function iniciarSesion(evento) {

        evento.preventDefault();
        setError("");

        const correoNormalizado = correo.trim().toLowerCase();

        if (!correoEsValido(correoNormalizado)) {
            setError("Ingrese un correo electrónico válido.");
            return;
        }

        if (contrasena.trim() === "") {
            setError("Ingrese su contraseña.");
            return;
        }

        // CUENTAS DE DEMOSTRACIÓN
        const cuentaDemo = cuentasDemo.find(function(cuenta) {
            return cuenta.correo === correoNormalizado;
        });

        if (cuentaDemo) {

            if (cuentaDemo.contrasena !== contrasena) {
                setError("Contraseña incorrecta.");
                return;
            }

            guardarSesion(cuentaDemo);
            return;
        }

        // CLIENTES REGISTRADOS EN LA TIENDA
        const guardados = localStorage.getItem("usuariosAdmin");

        const usuarios = guardados
            ? JSON.parse(guardados)
            : [];

        const usuario = usuarios.find(function(item) {
            return item.correo &&
                item.correo.toLowerCase() === correoNormalizado;
        });

        if (!usuario) {
            setError("No existe una cuenta con ese correo.");
            return;
        }

        // El registro anterior no almacena una contraseña
        // verificable. Este acceso continúa siendo simulado.
        if (contrasena.length < 8) {
            setError("La contraseña debe tener al menos 8 caracteres.");
            return;
        }

        guardarSesion({
            ...usuario,
            rol: "CLIENTE"
        });
    }


    function guardarSesion(usuario) {

        const sesion = {
            id: usuario.id,
            nombre: usuario.nombre,
            correo: usuario.correo,
            rol: usuario.rol
        };

        localStorage.setItem(
            "sesionUsuario",
            JSON.stringify(sesion)
        );

        history.replace("/");
    }


    return (
        <main className="container py-5">

            <div className="row justify-content-center">

                <div className="col-12 col-md-6 col-lg-5">

                    <div className="card shadow-sm">

                        <div className="card-body p-4">

                            <h1 className="text-center mb-4">
                                Iniciar sesión
                            </h1>

                            <form onSubmit={iniciarSesion} noValidate>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Correo electrónico
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        value={correo}
                                        onChange={function(evento) {
                                            setCorreo(evento.target.value);
                                            setError("");
                                        }}
                                        placeholder="correo@ejemplo.cl"
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Contraseña
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        value={contrasena}
                                        onChange={function(evento) {
                                            setContrasena(evento.target.value);
                                            setError("");
                                        }}
                                    />

                                </div>

                                {error && (
                                    <div className="alert alert-danger">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >
                                    Ingresar
                                </button>

                            </form>

                            <p className="text-center mt-3 mb-0">
                                ¿No tienes cuenta?{" "}
                                <Link to="/registro">
                                    Regístrate
                                </Link>
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
}

export default Login;
