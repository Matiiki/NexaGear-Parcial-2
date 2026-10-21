import React, { useState } from "react";

function Login() {

    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");


    function manejarEnvio(evento) {

        evento.preventDefault();

        setError("");
        setMensaje("");


        if (correo.trim() === "" || contrasena.trim() === "") {

            setError("Debe completar todos los campos.");
            return;
        }


        setMensaje("Inicio de sesión realizado correctamente.");
    }


    return (
        <main className="container py-5">

            <div className="row justify-content-center">

                <div className="col-12 col-md-6 col-lg-4">

                    <div className="card shadow">

                        <div className="card-body p-4">

                            <h1 className="text-center mb-4">
                                Iniciar sesión
                            </h1>


                            <form onSubmit={manejarEnvio}>

                                <div className="mb-3">

                                    <label
                                        htmlFor="correo-login"
                                        className="form-label"
                                    >
                                        Correo
                                    </label>

                                    <input
                                        type="email"
                                        id="correo-login"
                                        className="form-control"
                                        value={correo}
                                        onChange={function(evento) {
                                            setCorreo(evento.target.value);
                                        }}
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
                                            setContrasena(evento.target.value);
                                        }}
                                    />

                                </div>


                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >
                                    Ingresar
                                </button>


                                {error && (
                                    <div className="alert alert-danger mt-3">
                                        {error}
                                    </div>
                                )}


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

export default Login;