import React, { useState } from "react";
import {
    Link,
    useHistory
} from "react-router-dom";

import {
    correoEsValido
} from "../utils/logicaNexaGear.js";


function Login() {

    const history = useHistory();

    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState("");


    function manejarEnvio(evento) {

        evento.preventDefault();

        setError("");


        if (
            correo.trim() === "" ||
            contrasena.trim() === ""
        ) {

            setError(
                "Debe completar todos los campos."
            );

            return;
        }


        if (!correoEsValido(correo)) {

            setError(
                "Ingrese un correo electrónico válido."
            );

            return;
        }


        if (contrasena.length < 8) {

            setError(
                "La contraseña debe tener al menos 8 caracteres."
            );

            return;
        }


        const usuariosGuardados =
            localStorage.getItem("usuariosAdmin");


        const usuarios =
            usuariosGuardados
                ? JSON.parse(usuariosGuardados)
                : [];


        const correoNormalizado =
            correo.trim().toLowerCase();


        const usuarioEncontrado =
            usuarios.find(function(usuario) {

                return (
                    usuario.correo &&
                    usuario.correo
                        .trim()
                        .toLowerCase() ===
                    correoNormalizado
                );
            });


        if (!usuarioEncontrado) {

            setError(
                "No existe una cuenta registrada con este correo."
            );

            return;
        }


        const sesionUsuario = {

            id:
                usuarioEncontrado.id,

            nombre:
                usuarioEncontrado.nombre,

            apellido:
                usuarioEncontrado.apellido,

            correo:
                usuarioEncontrado.correo
        };


        localStorage.setItem(
            "sesionUsuario",
            JSON.stringify(sesionUsuario)
        );


        history.replace("/");
    }


    return (
        <main className="container py-5">

            <div className="row justify-content-center">

                <div className="col-12 col-md-6 col-lg-4">

                    <div className="card shadow">

                        <div className="card-body p-4">

                            <h1 className="text-center mb-3">
                                Iniciar sesión
                            </h1>

                            <p className="text-center text-muted mb-4">
                                Ingresa a tu cuenta NexaGear.
                            </p>


                            <form
                                onSubmit={manejarEnvio}
                                noValidate
                            >

                                <div className="mb-3">

                                    <label
                                        htmlFor="correo-login"
                                        className="form-label"
                                    >
                                        Correo electrónico
                                    </label>

                                    <input
                                        type="email"
                                        id="correo-login"
                                        className="form-control"
                                        value={correo}
                                        onChange={function(evento) {

                                            setCorreo(
                                                evento.target.value
                                            );

                                            setError("");
                                        }}
                                        placeholder="usuario@gmail.com"
                                    />

                                </div>


                                <div className="mb-3">

                                    <label
                                        htmlFor="contrasena-login"
                                        className="form-label"
                                    >
                                        Contraseña
                                    </label>

                                    <input
                                        type="password"
                                        id="contrasena-login"
                                        className="form-control"
                                        value={contrasena}
                                        onChange={function(evento) {

                                            setContrasena(
                                                evento.target.value
                                            );

                                            setError("");
                                        }}
                                        placeholder="Mínimo 8 caracteres"
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


                                <div className="text-center mt-3">

                                    ¿No tienes una cuenta?{" "}

                                    <Link to="/registro">
                                        Regístrate
                                    </Link>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
}

export default Login;