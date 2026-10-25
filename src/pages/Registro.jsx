import React, { useState } from "react";

import {
    correoEsValido,
    contrasenasCoinciden
} from "../utils/logicaNexaGear.js";


function Registro() {

    const [formulario, setFormulario] =
        useState({

            nombre: "",
            apellido: "",
            correo: "",
            contrasena: "",
            confirmarContrasena: "",
            fechaNacimiento: ""
        });


    const [errores, setErrores] =
        useState({});


    const [mensajeExito, setMensajeExito] =
        useState("");


    function soloLetras(valor) {

        return valor.replace(
            /[^a-zA-ZÁÉÍÓÚáéíóúÑñÜü\s'-]/g,
            ""
        );
    }


    function manejarCambio(evento) {

        const {
            name,
            value
        } = evento.target;


        setFormulario({
            ...formulario,
            [name]: value
        });


        setErrores({
            ...errores,
            [name]: ""
        });


        setMensajeExito("");
    }


    function manejarNombre(evento) {

        const valor =
            soloLetras(
                evento.target.value
            );


        setFormulario({
            ...formulario,
            nombre: valor
        });


        setErrores({
            ...errores,
            nombre: ""
        });


        setMensajeExito("");
    }


    function manejarApellido(evento) {

        const valor =
            soloLetras(
                evento.target.value
            );


        setFormulario({
            ...formulario,
            apellido: valor
        });


        setErrores({
            ...errores,
            apellido: ""
        });


        setMensajeExito("");
    }


    function validarFormulario() {

        const nuevosErrores = {};

        const regexNombre =
            /^[a-zA-ZÁÉÍÓÚáéíóúÑñÜü\s'-]{2,}$/;


        if (
            formulario.nombre.trim() === ""
        ) {

            nuevosErrores.nombre =
                "Ingrese su nombre.";

        } else if (
            !regexNombre.test(
                formulario.nombre.trim()
            )
        ) {

            nuevosErrores.nombre =
                "El nombre solo puede contener letras.";

        } else if (
            formulario.nombre.trim().length < 2
        ) {

            nuevosErrores.nombre =
                "El nombre debe tener al menos 2 caracteres.";
        }


        if (
            formulario.apellido.trim() === ""
        ) {

            nuevosErrores.apellido =
                "Ingrese su apellido.";

        } else if (
            !regexNombre.test(
                formulario.apellido.trim()
            )
        ) {

            nuevosErrores.apellido =
                "El apellido solo puede contener letras.";

        } else if (
            formulario.apellido.trim().length < 2
        ) {

            nuevosErrores.apellido =
                "El apellido debe tener al menos 2 caracteres.";
        }


        if (
            formulario.correo.trim() === ""
        ) {

            nuevosErrores.correo =
                "Ingrese su correo electrónico.";

        } else if (
            !correoEsValido(
                formulario.correo
            )
        ) {

            nuevosErrores.correo =
                "Ingrese un correo electrónico válido.";
        }


        if (
            formulario.contrasena === ""
        ) {

            nuevosErrores.contrasena =
                "Ingrese una contraseña.";

        } else if (
            formulario.contrasena.length < 8
        ) {

            nuevosErrores.contrasena =
                "La contraseña debe tener al menos 8 caracteres.";
        }


        if (
            formulario.confirmarContrasena === ""
        ) {

            nuevosErrores.confirmarContrasena =
                "Confirme su contraseña.";

        } else if (
            !contrasenasCoinciden(
                formulario.contrasena,
                formulario.confirmarContrasena
            )
        ) {

            nuevosErrores.confirmarContrasena =
                "Las contraseñas no coinciden.";
        }


        if (
            formulario.fechaNacimiento === ""
        ) {

            nuevosErrores.fechaNacimiento =
                "Ingrese su fecha de nacimiento.";

        } else {

            const fechaIngresada =
                new Date(
                    formulario.fechaNacimiento +
                    "T00:00:00"
                );


            const fechaActual =
                new Date();


            if (
                fechaIngresada >
                fechaActual
            ) {

                nuevosErrores.fechaNacimiento =
                    "La fecha de nacimiento no puede ser futura.";
            }
        }


        setErrores(
            nuevosErrores
        );


        return (
            Object.keys(
                nuevosErrores
            ).length === 0
        );
    }


    function manejarEnvio(evento) {

        evento.preventDefault();

        setMensajeExito("");


        if (
            !validarFormulario()
        ) {

            return;
        }


        const usuariosGuardados =
            localStorage.getItem(
                "usuariosAdmin"
            );


        const usuarios =
            usuariosGuardados
                ? JSON.parse(
                    usuariosGuardados
                )
                : [];


        const correoNormalizado =
            formulario.correo
                .trim()
                .toLowerCase();


        const correoExiste =
            usuarios.some(
                function(usuario) {

                    return (
                        usuario.correo &&
                        usuario.correo
                            .trim()
                            .toLowerCase() ===
                        correoNormalizado
                    );
                }
            );


        if (correoExiste) {

            setErrores({
                correo:
                    "Este correo ya está registrado."
            });

            return;
        }


        const nuevoUsuario = {

            id:
                Date.now(),

            nombre:
                formulario.nombre.trim(),

            apellido:
                formulario.apellido.trim(),

            correo:
                correoNormalizado,

            fechaNacimiento:
                formulario.fechaNacimiento
        };


        localStorage.setItem(
            "usuariosAdmin",
            JSON.stringify([
                ...usuarios,
                nuevoUsuario
            ])
        );


        setMensajeExito(
            "Usuario registrado correctamente."
        );


        setErrores({});


        setFormulario({

            nombre: "",
            apellido: "",
            correo: "",
            contrasena: "",
            confirmarContrasena: "",
            fechaNacimiento: ""
        });
    }


    return (

        <main className="container py-5">

            <div className="row justify-content-center">

                <div className="col-12 col-md-8 col-lg-6">

                    <div className="card shadow">

                        <div className="card-body p-4">

                            <h1 className="text-center mb-4">
                                Registro
                            </h1>


                            {mensajeExito && (

                                <div className="alert alert-success">
                                    {mensajeExito}
                                </div>

                            )}


                            <form
                                onSubmit={
                                    manejarEnvio
                                }
                                noValidate
                            >


                                <div className="mb-3">

                                    <label className="form-label">
                                        Nombre
                                    </label>

                                    <input
                                        type="text"
                                        name="nombre"
                                        className={
                                            "form-control " +
                                            (
                                                errores.nombre
                                                    ? "is-invalid"
                                                    : ""
                                            )
                                        }
                                        value={
                                            formulario.nombre
                                        }
                                        onChange={
                                            manejarNombre
                                        }
                                    />

                                    {errores.nombre && (

                                        <div className="invalid-feedback">
                                            {errores.nombre}
                                        </div>

                                    )}

                                </div>


                                <div className="mb-3">

                                    <label className="form-label">
                                        Apellido
                                    </label>

                                    <input
                                        type="text"
                                        name="apellido"
                                        className={
                                            "form-control " +
                                            (
                                                errores.apellido
                                                    ? "is-invalid"
                                                    : ""
                                            )
                                        }
                                        value={
                                            formulario.apellido
                                        }
                                        onChange={
                                            manejarApellido
                                        }
                                    />

                                    {errores.apellido && (

                                        <div className="invalid-feedback">
                                            {errores.apellido}
                                        </div>

                                    )}

                                </div>


                                <div className="mb-3">

                                    <label className="form-label">
                                        Correo electrónico
                                    </label>

                                    <input
                                        type="email"
                                        name="correo"
                                        className={
                                            "form-control " +
                                            (
                                                errores.correo
                                                    ? "is-invalid"
                                                    : ""
                                            )
                                        }
                                        value={
                                            formulario.correo
                                        }
                                        onChange={
                                            manejarCambio
                                        }
                                    />

                                    {errores.correo && (

                                        <div className="invalid-feedback">
                                            {errores.correo}
                                        </div>

                                    )}

                                </div>


                                <div className="mb-3">

                                    <label className="form-label">
                                        Contraseña
                                    </label>

                                    <input
                                        type="password"
                                        name="contrasena"
                                        className={
                                            "form-control " +
                                            (
                                                errores.contrasena
                                                    ? "is-invalid"
                                                    : ""
                                            )
                                        }
                                        value={
                                            formulario.contrasena
                                        }
                                        onChange={
                                            manejarCambio
                                        }
                                    />

                                    {errores.contrasena && (

                                        <div className="invalid-feedback">
                                            {errores.contrasena}
                                        </div>

                                    )}

                                </div>


                                <div className="mb-3">

                                    <label className="form-label">
                                        Confirmar contraseña
                                    </label>

                                    <input
                                        type="password"
                                        name="confirmarContrasena"
                                        className={
                                            "form-control " +
                                            (
                                                errores.confirmarContrasena
                                                    ? "is-invalid"
                                                    : ""
                                            )
                                        }
                                        value={
                                            formulario.confirmarContrasena
                                        }
                                        onChange={
                                            manejarCambio
                                        }
                                    />

                                    {errores.confirmarContrasena && (

                                        <div className="invalid-feedback">
                                            {errores.confirmarContrasena}
                                        </div>

                                    )}

                                </div>


                                <div className="mb-3">

                                    <label className="form-label">
                                        Fecha de nacimiento
                                    </label>

                                    <input
                                        type="date"
                                        name="fechaNacimiento"
                                        className={
                                            "form-control " +
                                            (
                                                errores.fechaNacimiento
                                                    ? "is-invalid"
                                                    : ""
                                            )
                                        }
                                        value={
                                            formulario.fechaNacimiento
                                        }
                                        onChange={
                                            manejarCambio
                                        }
                                    />

                                    {errores.fechaNacimiento && (

                                        <div className="invalid-feedback">
                                            {errores.fechaNacimiento}
                                        </div>

                                    )}

                                </div>


                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >
                                    Registrarse
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
}


export default Registro;