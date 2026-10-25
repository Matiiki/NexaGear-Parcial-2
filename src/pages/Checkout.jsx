import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Checkout({ carrito, setCarrito }) {

    const history = useHistory();

    const [datos, setDatos] = useState(function() {

        const sesionGuardada =
            localStorage.getItem("sesionUsuario");

        const usuario =
            sesionGuardada
                ? JSON.parse(sesionGuardada)
                : null;

        return {
            nombre: usuario
                ? usuario.nombre + " " + usuario.apellido
                : "",

            correo: usuario
                ? usuario.correo
                : "",

            direccion: "",
            comuna: "",
            telefono: "",
            entrega: ""
        };
    });

    const [errores, setErrores] = useState({});


    function manejarCambio(evento) {

        const { name, value } = evento.target;

        setDatos({
            ...datos,
            [name]: value
        });

        setErrores({
            ...errores,
            [name]: ""
        });
    }


    function manejarTelefono(evento) {

        const soloNumeros =
            evento.target.value.replace(/\D/g, "");

        setDatos({
            ...datos,
            telefono: soloNumeros
        });

        setErrores({
            ...errores,
            telefono: ""
        });
    }


    function validarFormulario() {

        const nuevosErrores = {};

        if (datos.nombre.trim() === "") {
            nuevosErrores.nombre =
                "Ingrese su nombre completo.";
        }


        if (datos.correo.trim() === "") {

            nuevosErrores.correo =
                "Ingrese su correo electrónico.";

        } else {

            const regexCorreo =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!regexCorreo.test(datos.correo)) {

                nuevosErrores.correo =
                    "Ingrese un correo electrónico válido.";
            }
        }


        if (datos.direccion.trim() === "") {
            nuevosErrores.direccion =
                "Ingrese su dirección.";
        }


        if (datos.comuna.trim() === "") {
            nuevosErrores.comuna =
                "Ingrese su comuna.";
        }


        if (datos.telefono.trim() === "") {

            nuevosErrores.telefono =
                "Ingrese su teléfono.";

        } else if (!/^[0-9]{9}$/.test(datos.telefono)) {

            nuevosErrores.telefono =
                "El teléfono debe contener exactamente 9 números.";
        }


        if (datos.entrega === "") {
            nuevosErrores.entrega =
                "Seleccione un tipo de entrega.";
        }


        setErrores(nuevosErrores);

        return Object.keys(nuevosErrores).length === 0;
    }


    function finalizarCompra(evento) {

        evento.preventDefault();

        if (!validarFormulario()) {
            return;
        }


        const totalPedido =
            carrito.reduce(function(acumulado, producto) {

                return (
                    acumulado +
                    producto.precio *
                    producto.cantidad
                );

            }, 0);


        const nuevoPedido = {

            id: Date.now(),

            cliente:
                datos.nombre.trim(),

            correo:
                datos.correo.trim(),

            direccion:
                datos.direccion.trim(),

            comuna:
                datos.comuna.trim(),

            telefono:
                datos.telefono.trim(),

            entrega:
                datos.entrega,

            productos:
                carrito,

            total:
                totalPedido,

            fecha:
                new Date().toLocaleString("es-CL"),

            estado:
                "Pendiente"
        };


        const pedidosGuardados =
            localStorage.getItem("pedidosAdmin");


        const pedidos =
            pedidosGuardados
                ? JSON.parse(pedidosGuardados)
                : [];


        localStorage.setItem(
            "pedidosAdmin",
            JSON.stringify([
                ...pedidos,
                nuevoPedido
            ])
        );


        localStorage.setItem(
            "ultimoPedido",
            JSON.stringify(nuevoPedido)
        );


        setCarrito([]);

        history.push("/compra-exitosa");
    }


    if (carrito.length === 0) {

        return (
            <main className="container py-5 text-center">

                <h1>
                    No hay productos en el carrito
                </h1>

            </main>
        );
    }


    return (
        <main className="container py-5">

            <div className="row justify-content-center">

                <div className="col-12 col-lg-7">

                    <h1 className="mb-4">
                        Checkout
                    </h1>


                    <form
                        onSubmit={finalizarCompra}
                        noValidate
                    >

                        {/* NOMBRE */}

                        <div className="mb-3">

                            <label className="form-label">
                                Nombre completo
                            </label>

                            <input
                                type="text"
                                name="nombre"
                                className={
                                    "form-control " +
                                    (errores.nombre
                                        ? "is-invalid"
                                        : "")
                                }
                                value={datos.nombre}
                                onChange={manejarCambio}
                            />

                            {errores.nombre && (

                                <div className="invalid-feedback">
                                    {errores.nombre}
                                </div>

                            )}

                        </div>


                        {/* CORREO */}

                        <div className="mb-3">

                            <label className="form-label">
                                Correo electrónico
                            </label>

                            <input
                                type="email"
                                name="correo"
                                className={
                                    "form-control " +
                                    (errores.correo
                                        ? "is-invalid"
                                        : "")
                                }
                                value={datos.correo}
                                onChange={manejarCambio}
                            />

                            {errores.correo && (

                                <div className="invalid-feedback">
                                    {errores.correo}
                                </div>

                            )}

                        </div>


                        {/* DIRECCIÓN */}

                        <div className="mb-3">

                            <label className="form-label">
                                Dirección
                            </label>

                            <input
                                type="text"
                                name="direccion"
                                className={
                                    "form-control " +
                                    (errores.direccion
                                        ? "is-invalid"
                                        : "")
                                }
                                value={datos.direccion}
                                onChange={manejarCambio}
                            />

                            {errores.direccion && (

                                <div className="invalid-feedback">
                                    {errores.direccion}
                                </div>

                            )}

                        </div>


                        {/* COMUNA */}

                        <div className="mb-3">

                            <label className="form-label">
                                Comuna
                            </label>

                            <input
                                type="text"
                                name="comuna"
                                className={
                                    "form-control " +
                                    (errores.comuna
                                        ? "is-invalid"
                                        : "")
                                }
                                value={datos.comuna}
                                onChange={manejarCambio}
                            />

                            {errores.comuna && (

                                <div className="invalid-feedback">
                                    {errores.comuna}
                                </div>

                            )}

                        </div>


                        {/* TELÉFONO */}

                        <div className="mb-3">

                            <label className="form-label">
                                Teléfono
                            </label>

                            <input
                                type="text"
                                name="telefono"
                                className={
                                    "form-control " +
                                    (errores.telefono
                                        ? "is-invalid"
                                        : "")
                                }
                                value={datos.telefono}
                                maxLength="9"
                                inputMode="numeric"
                                placeholder="912345678"
                                onChange={manejarTelefono}
                            />

                            {errores.telefono && (

                                <div className="invalid-feedback">
                                    {errores.telefono}
                                </div>

                            )}

                        </div>


                        {/* ENTREGA */}

                        <div className="mb-3">

                            <label className="form-label">
                                Tipo de entrega
                            </label>

                            <select
                                name="entrega"
                                className={
                                    "form-select " +
                                    (errores.entrega
                                        ? "is-invalid"
                                        : "")
                                }
                                value={datos.entrega}
                                onChange={manejarCambio}
                            >

                                <option value="">
                                    Seleccione una opción
                                </option>

                                <option value="domicilio">
                                    Envío a domicilio
                                </option>

                                <option value="retiro">
                                    Retiro en tienda
                                </option>

                            </select>

                            {errores.entrega && (

                                <div className="invalid-feedback">
                                    {errores.entrega}
                                </div>

                            )}

                        </div>


                        <button
                            type="submit"
                            className="btn btn-success w-100"
                        >
                            Finalizar compra
                        </button>

                    </form>

                </div>

            </div>

        </main>
    );
}

export default Checkout;