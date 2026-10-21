import React, { useState } from "react";

function Contacto() {

    const [formulario, setFormulario] = useState({
        nombre: "",
        correo: "",
        motivo: "",
        asunto: "",
        mensaje: ""
    });

    const [errores, setErrores] = useState({});
    const [mensajeExito, setMensajeExito] = useState("");


    function manejarCambio(evento) {

        const { name, value } = evento.target;

        setFormulario({
            ...formulario,
            [name]: value
        });
    }


    function validarFormulario() {

        const nuevosErrores = {};

        const valorCorreo =
            formulario.correo.trim().toLowerCase();

        const expresionCorreo =
            /^[a-zA-Z0-9](?:[a-zA-Z0-9._%+-]*[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9.-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,}$/;


        // NOMBRE
        if (formulario.nombre.trim() === "") {

            nuevosErrores.nombre =
                "El nombre es obligatorio.";

        } else if (formulario.nombre.trim().length < 2) {

            nuevosErrores.nombre =
                "El nombre debe tener al menos 2 caracteres.";
        }


        // CORREO
        if (valorCorreo === "") {

            nuevosErrores.correo =
                "El correo electrónico es obligatorio.";

        } else if (
            !expresionCorreo.test(valorCorreo) ||
            valorCorreo.includes("..")
        ) {

            nuevosErrores.correo =
                "Ingrese un correo electrónico válido.";
        }


        // MOTIVO
        if (formulario.motivo === "") {

            nuevosErrores.motivo =
                "Debe seleccionar un motivo.";
        }


        // ASUNTO
        if (formulario.asunto.trim() === "") {

            nuevosErrores.asunto =
                "El asunto es obligatorio.";

        } else if (formulario.asunto.trim().length < 4) {

            nuevosErrores.asunto =
                "El asunto debe tener al menos 4 caracteres.";
        }


        // MENSAJE
        if (formulario.mensaje.trim() === "") {

            nuevosErrores.mensaje =
                "El mensaje es obligatorio.";

        } else if (formulario.mensaje.trim().length < 10) {

            nuevosErrores.mensaje =
                "El mensaje debe tener al menos 10 caracteres.";
        }


        setErrores(nuevosErrores);

        return Object.keys(nuevosErrores).length === 0;
    }


    function manejarEnvio(evento) {

        evento.preventDefault();

        setMensajeExito("");


        if (!validarFormulario()) {
            return;
        }


        setMensajeExito(
            "Mensaje enviado correctamente."
        );


        setFormulario({
            nombre: "",
            correo: "",
            motivo: "",
            asunto: "",
            mensaje: ""
        });
    }


    return (
        <main className="container py-5">

            <div className="row justify-content-center">

                <div className="col-12 col-md-8 col-lg-6">

                    <div className="card shadow">

                        <div className="card-body p-4">

                            <h1 className="text-center mb-3">
                                Contáctanos
                            </h1>

                            <p className="text-center text-muted mb-4">
                                ¿Tienes alguna consulta?
                                Envíanos un mensaje y te responderemos
                                lo antes posible.
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
                                        value={formulario.nombre}
                                        onChange={manejarCambio}
                                        placeholder="Ej: Matias"
                                    />

                                    {errores.nombre && (
                                        <div className="invalid-feedback">
                                            {errores.nombre}
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
                                        value={formulario.correo}
                                        onChange={manejarCambio}
                                        placeholder="Ej: usuario@gmail.com"
                                    />

                                    {errores.correo && (
                                        <div className="invalid-feedback">
                                            {errores.correo}
                                        </div>
                                    )}

                                </div>


                                {/* MOTIVO */}
                                <div className="mb-3">

                                    <label
                                        htmlFor="motivo"
                                        className="form-label"
                                    >
                                        Motivo de contacto
                                    </label>

                                    <select
                                        id="motivo"
                                        name="motivo"
                                        className={
                                            errores.motivo
                                                ? "form-select is-invalid"
                                                : "form-select"
                                        }
                                        value={formulario.motivo}
                                        onChange={manejarCambio}
                                    >

                                        <option value="">
                                            Selecciona una opción
                                        </option>

                                        <option value="consulta">
                                            Consulta general
                                        </option>

                                        <option value="producto">
                                            Consulta sobre producto
                                        </option>

                                        <option value="garantia">
                                            Garantía
                                        </option>

                                        <option value="problema">
                                            Problema con una compra
                                        </option>

                                        <option value="otro">
                                            Otro
                                        </option>

                                    </select>

                                    {errores.motivo && (
                                        <div className="invalid-feedback">
                                            {errores.motivo}
                                        </div>
                                    )}

                                </div>


                                {/* ASUNTO */}
                                <div className="mb-3">

                                    <label
                                        htmlFor="asunto"
                                        className="form-label"
                                    >
                                        Asunto
                                    </label>

                                    <input
                                        type="text"
                                        id="asunto"
                                        name="asunto"
                                        className={
                                            errores.asunto
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        value={formulario.asunto}
                                        onChange={manejarCambio}
                                        placeholder="Ej: Consulta sobre Logitech G203"
                                    />

                                    {errores.asunto && (
                                        <div className="invalid-feedback">
                                            {errores.asunto}
                                        </div>
                                    )}

                                </div>


                                {/* MENSAJE */}
                                <div className="mb-3">

                                    <label
                                        htmlFor="mensaje"
                                        className="form-label"
                                    >
                                        Mensaje
                                    </label>

                                    <textarea
                                        id="mensaje"
                                        name="mensaje"
                                        rows="5"
                                        className={
                                            errores.mensaje
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        value={formulario.mensaje}
                                        onChange={manejarCambio}
                                        placeholder="Escribe aquí tu mensaje..."
                                    />

                                    {errores.mensaje && (
                                        <div className="invalid-feedback">
                                            {errores.mensaje}
                                        </div>
                                    )}

                                </div>


                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >
                                    Enviar mensaje
                                </button>


                                {mensajeExito && (
                                    <div
                                        className="alert alert-success mt-3 text-center"
                                    >
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

export default Contacto;