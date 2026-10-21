import React, { useState } from "react";

import {
    correoEsValido,
    contrasenasCoinciden
} from "../utils/logicaNexaGear.js";


function Registro() {

    const [formulario, setFormulario] = useState({
        nombre: "",
        apellido: "",
        correo: "",
        contrasena: "",
        confirmarContrasena: "",
        fechaNacimiento: ""
    });


    const [errores, setErrores] = useState({});

    const [mensajeExito, setMensajeExito] = useState("");


    function manejarCambio(evento) {

        const { name, value } = evento.target;

        setFormulario({
            ...formulario,
            [name]: value
        });

        setMensajeExito("");
    }


    function validarFormulario() {

        const nuevosErrores = {};


        // NOMBRE

        if (formulario.nombre.trim() === "") {

            nuevosErrores.nombre =
                "El nombre es obligatorio.";

        } else if (
            formulario.nombre.trim().length < 2
        ) {

            nuevosErrores.nombre =
                "El nombre debe tener al menos 2 caracteres.";
        }


        // APELLIDO

        if (formulario.apellido.trim() === "") {

            nuevosErrores.apellido =
                "El apellido es obligatorio.";

        } else if (
            formulario.apellido.trim().length < 2
        ) {

            nuevosErrores.apellido =
                "El apellido debe tener al menos 2 caracteres.";
        }


        // CORREO

        if (formulario.correo.trim() === "") {

            nuevosErrores.correo =
                "El correo electrónico es obligatorio.";

        } else if (
            !correoEsValido(formulario.correo)
        ) {

            nuevosErrores.correo =
                "Ingrese un correo electrónico válido.";
        }


        // CONTRASEÑA

        if (formulario.contrasena === "") {

            nuevosErrores.contrasena =
                "La contraseña es obligatoria.";

        } else if (
            formulario.contrasena.length < 8
        ) {

            nuevosErrores.contrasena =
                "La contraseña debe tener al menos 8 caracteres.";
        }


        // CONFIRMAR CONTRASEÑA

        if (
            formulario.confirmarContrasena === ""
        ) {

            nuevosErrores.confirmarContrasena =
                "Debe confirmar la contraseña.";

        } else if (
            !contrasenasCoinciden(
                formulario.contrasena,
                formulario.confirmarContrasena
            )
        ) {

            nuevosErrores.confirmarContrasena =
                "Las contraseñas no coinciden.";
        }


        // FECHA DE NACIMIENTO

        if (
            formulario.fechaNacimiento === ""
        ) {

            nuevosErrores.fechaNacimiento =
                "La fecha de nacimiento es obligatoria.";

        } else {

            const fechaIngresada =
                new Date(
                    formulario.fechaNacimiento +
                    "T00:00:00"
                );

            const fechaActual =
                new Date();


            if (
                fechaIngresada > fechaActual
            ) {

                nuevosErrores.fechaNacimiento =
                    "La fecha de nacimiento no puede ser futura.";
            }
        }


        setErrores(nuevosErrores);


        return (
            Object.keys(nuevosErrores).length === 0
        );
    }


    function manejarEnvio(evento) {

        evento.preventDefault();

        setMensajeExito("");


        // PRIMERO VALIDAMOS

        if (!validarFormulario()) {
            return;
        }


        // LEER USUARIOS GUARDADOS

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


        // COMPROBAR CORREO DUPLICADO

        const correoNormalizado =
            formulario.correo
                .trim()
                .toLowerCase();


        const correoExiste =
            usuarios.some(function(usuario) {

                return (
                    usuario.correo
                        .trim()
                        .toLowerCase() ===
                    correoNormalizado
                );
            });


        if (correoExiste) {

            setErrores({
                correo:
                    "Ya existe una cuenta registrada con este correo electrónico."
            });

            return;
        }


        // CREAR USUARIO

        const nuevoUsuario = {

            id: Date.now(),

            nombre:
                formulario.nombre.trim(),

            apellido:
                formulario.apellido.trim(),

            correo:
                correoNormalizado,

            fechaNacimiento:
                formulario.fechaNacimiento
        };


        // GUARDAR USUARIO

        const usuariosActualizados = [
            ...usuarios,
            nuevoUsuario
        ];


        localStorage.setItem(
            "usuariosAdmin",
            JSON.stringify(
                usuariosActualizados
            )
        );


        // MENSAJE DE ÉXITO

        setMensajeExito(
            "Cuenta creada correctamente."
        );


        setErrores({});


        // LIMPIAR FORMULARIO

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

                            <h1 className="text-center mb-3">
                                Crear cuenta
                            </h1>


                            <p className="text-center text-muted mb-4">
                                Regístrate en NexaGear para acceder
                                a nuestros productos.
                            </p>


                            <form
                                onSubmit={manejarEnvio}
                                noValidate
                            >


                                {/* NOMBRE */}

                                <div className="mb-3">

                                    <label
                                        htmlFor="nombre"
                                        className="form-label"
                                    >
                                        Nombre
                                    </label>

                                    <input
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        className={
                                            errores.nombre
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        value={
                                            formulario.nombre
                                        }
                                        onChange={
                                            manejarCambio
                                        }
                                        placeholder="Ej: Matias"
                                    />

                                    {errores.nombre && (

                                        <div className="invalid-feedback">
                                            {errores.nombre}
                                        </div>

                                    )}

                                </div>


                                {/* APELLIDO */}

                                <div className="mb-3">

                                    <label
                                        htmlFor="apellido"
                                        className="form-label"
                                    >
                                        Apellido
                                    </label>

                                    <input
                                        type="text"
                                        id="apellido"
                                        name="apellido"
                                        className={
                                            errores.apellido
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        value={
                                            formulario.apellido
                                        }
                                        onChange={
                                            manejarCambio
                                        }
                                        placeholder="Ej: Acevedo"
                                    />

                                    {errores.apellido && (

                                        <div className="invalid-feedback">
                                            {errores.apellido}
                                        </div>

                                    )}

                                </div>


                                {/* CORREO */}

                                <div className="mb-3">

                                    <label
                                        htmlFor="correo"
                                        className="form-label"
                                    >
                                        Correo electrónico
                                    </label>

                                    <input
                                        type="email"
                                        id="correo"
                                        name="correo"
                                        className={
                                            errores.correo
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        value={
                                            formulario.correo
                                        }
                                        onChange={
                                            manejarCambio
                                        }
                                        placeholder="Ej: usuario@gmail.com"
                                    />

                                    {errores.correo && (

                                        <div className="invalid-feedback">
                                            {errores.correo}
                                        </div>

                                    )}

                                </div>


                                {/* CONTRASEÑA */}

                                <div className="mb-3">

                                    <label
                                        htmlFor="contrasena"
                                        className="form-label"
                                    >
                                        Contraseña
                                    </label>

                                    <input
                                        type="password"
                                        id="contrasena"
                                        name="contrasena"
                                        className={
                                            errores.contrasena
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        value={
                                            formulario.contrasena
                                        }
                                        onChange={
                                            manejarCambio
                                        }
                                        placeholder="Mínimo 8 caracteres"
                                    />

                                    {errores.contrasena && (

                                        <div className="invalid-feedback">
                                            {errores.contrasena}
                                        </div>

                                    )}

                                </div>


                                {/* CONFIRMAR CONTRASEÑA */}

                                <div className="mb-3">

                                    <label
                                        htmlFor="confirmarContrasena"
                                        className="form-label"
                                    >
                                        Confirmar contraseña
                                    </label>

                                    <input
                                        type="password"
                                        id="confirmarContrasena"
                                        name="confirmarContrasena"
                                        className={
                                            errores.confirmarContrasena
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        value={
                                            formulario.confirmarContrasena
                                        }
                                        onChange={
                                            manejarCambio
                                        }
                                        placeholder="Repite tu contraseña"
                                    />

                                    {errores.confirmarContrasena && (

                                        <div className="invalid-feedback">
                                            {
                                                errores.confirmarContrasena
                                            }
                                        </div>

                                    )}

                                </div>


                                {/* FECHA */}

                                <div className="mb-3">

                                    <label
                                        htmlFor="fechaNacimiento"
                                        className="form-label"
                                    >
                                        Fecha de nacimiento
                                    </label>

                                    <input
                                        type="date"
                                        id="fechaNacimiento"
                                        name="fechaNacimiento"
                                        className={
                                            errores.fechaNacimiento
                                                ? "form-control is-invalid"
                                                : "form-control"
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
                                            {
                                                errores.fechaNacimiento
                                            }
                                        </div>

                                    )}

                                </div>


                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >
                                    Crear cuenta
                                </button>


                                {mensajeExito && (

                                    <div className="alert alert-success mt-3 text-center">

                                        {mensajeExito}

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

export default Registro;