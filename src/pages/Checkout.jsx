
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { obtenerProductos } from "../services/productosService.js";

import {
    correoEsValido,
    calcularTotal
} from "../utils/logicaNexaGear.js";


function Checkout({ carrito, setCarrito }) {

    const history = useHistory();

    const [datos, setDatos] = useState(function() {
        const sesion = localStorage.getItem("sesionUsuario");
        const usuario = sesion ? JSON.parse(sesion) : null;

        return {
            nombre: usuario
                ? [usuario.nombre, usuario.apellido].filter(Boolean).join(" ")
                : "",
            correo: usuario && usuario.correo
                ? usuario.correo.toLowerCase()
                : "",
            direccion: "",
            comuna: "",
            telefono: "",
            entrega: ""
        };
    });

    const [errores, setErrores] = useState({});
    const [simularRechazo, setSimularRechazo] = useState(false);

    const total = calcularTotal(carrito);
    const neto = Math.round(total / 1.19);
    const iva = total - neto;

    function formatoPrecio(valor) {
        return "$" + valor.toLocaleString("es-CL");
    }

    function manejarCambio(evento) {
        const { name, value } = evento.target;
        let valor = value;

        if (name === "nombre" || name === "comuna") {
            valor = value.replace(
                /[^a-zA-ZÁÉÍÓÚáéíóúÑñÜü\s'-]/g,
                ""
            );
        }

        if (name === "telefono") {
            valor = value.replace(/\D/g, "").slice(0, 9);
        }

        if (name === "correo") {
            valor = value.toLowerCase();
        }

        setDatos(function(anterior) {
            return {
                ...anterior,
                [name]: valor
            };
        });

        setErrores(function(anterior) {
            return {
                ...anterior,
                [name]: ""
            };
        });
    }

    function validarFormulario() {

        const nuevosErrores = {};
        const regexLetras =
            /^[a-zA-ZÁÉÍÓÚáéíóúÑñÜü\s'-]{2,}$/;

        if (!regexLetras.test(datos.nombre.trim())) {
            nuevosErrores.nombre =
                "Ingrese un nombre válido, solo con letras.";
        }

        if (datos.correo.trim() === "") {
            nuevosErrores.correo =
                "Ingrese su correo electrónico.";
        } else if (!correoEsValido(datos.correo)) {
            nuevosErrores.correo =
                "Ingrese un correo electrónico válido.";
        }

        if (datos.direccion.trim() === "") {
            nuevosErrores.direccion =
                "Ingrese su dirección.";
        }

        if (!regexLetras.test(datos.comuna.trim())) {
            nuevosErrores.comuna =
                "Ingrese una comuna válida, solo con letras.";
        }

        if (!/^[0-9]{9}$/.test(datos.telefono)) {
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

    function validarStock() {

        const productosActuales = obtenerProductos();

        for (const item of carrito) {

            const producto = productosActuales.find(function(p) {
                return p.id === item.id;
            });

            if (!producto) {
                window.alert(
                    "Un producto del carrito ya no está disponible."
                );
                return null;
            }

            if (
                !Number.isInteger(item.cantidad) ||
                item.cantidad <= 0 ||
                Number(producto.stock) < item.cantidad
            ) {
                window.alert(
                    "Stock insuficiente de " + producto.nombre +
                    ". Disponibles: " + producto.stock
                );
                return null;
            }
        }

        return productosActuales;
    }

    function finalizarCompra(evento) {

        evento.preventDefault();

        if (carrito.length === 0) {
            return;
        }

        if (!validarFormulario()) {
            return;
        }

        const productosActuales = validarStock();

        if (!productosActuales) {
            return;
        }

        // SIMULACIÓN DE PAGO RECHAZADO
        if (simularRechazo) {

            sessionStorage.setItem(
                "ultimoPagoFallido",
                JSON.stringify({
                    fecha: new Date().toLocaleString("es-CL"),
                    total: total,
                    motivo: "Pago rechazado (simulación)"
                })
            );

            // No se guarda pedido.
            // No se descuenta stock.
            // No se vacía el carrito.
            history.push("/pago-error");

            return;
        }

        // SIMULACIÓN DE PAGO EXITOSO
        const nuevoPedido = {
            id: Date.now(),
            cliente: datos.nombre.trim(),
            correo: datos.correo.trim().toLowerCase(),
            direccion: datos.direccion.trim(),
            comuna: datos.comuna.trim(),
            telefono: datos.telefono,
            entrega: datos.entrega,
            productos: carrito.map(function(item) {
                return { ...item };
            }),
            total: total,
            fecha: new Date().toLocaleString("es-CL"),
            estado: "Pendiente"
        };

        const pedidosGuardados =
            localStorage.getItem("pedidosAdmin");

        const pedidos = pedidosGuardados
            ? JSON.parse(pedidosGuardados)
            : [];

        const productosActualizados = productosActuales.map(
            function(producto) {

                const comprado = carrito.find(function(item) {
                    return item.id === producto.id;
                });

                if (!comprado) {
                    return producto;
                }

                return {
                    ...producto,
                    stock: Number(producto.stock) - comprado.cantidad
                };
            }
        );

        localStorage.setItem(
            "pedidosAdmin",
            JSON.stringify([...pedidos, nuevoPedido])
        );

        localStorage.setItem(
            "ultimoPedido",
            JSON.stringify(nuevoPedido)
        );

        localStorage.setItem(
            "productosAdmin",
            JSON.stringify(productosActualizados)
        );

        sessionStorage.removeItem("ultimoPagoFallido");

        setCarrito([]);

        history.push("/compra-exitosa");
    }

    if (carrito.length === 0) {
        return (
            <main className="container py-5 text-center">
                <h1>Tu carrito está vacío</h1>
            </main>
        );
    }

    return (
        <main className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-8">

                    <h1 className="fw-bold mb-4">
                        Finalizar compra
                    </h1>

                    <form onSubmit={finalizarCompra} noValidate>

                        <h2 className="h5 mb-3">
                            Datos del cliente
                        </h2>

                        {[
                            ["nombre", "Nombre completo", "text"],
                            ["correo", "Correo electrónico", "email"],
                            ["direccion", "Dirección", "text"],
                            ["comuna", "Comuna", "text"],
                            ["telefono", "Teléfono", "text"]
                        ].map(function(campo) {

                            const [name, etiqueta, tipo] = campo;

                            return (
                                <div className="mb-3" key={name}>

                                    <label
                                        htmlFor={name}
                                        className="form-label"
                                    >
                                        {etiqueta}
                                    </label>

                                    <input
                                        id={name}
                                        name={name}
                                        type={tipo}
                                        className={
                                            "form-control " +
                                            (errores[name] ? "is-invalid" : "")
                                        }
                                        value={datos[name]}
                                        onChange={manejarCambio}
                                        maxLength={
                                            name === "telefono"
                                                ? 9
                                                : undefined
                                        }
                                        inputMode={
                                            name === "telefono"
                                                ? "numeric"
                                                : undefined
                                        }
                                    />

                                    {errores[name] && (
                                        <div className="invalid-feedback">
                                            {errores[name]}
                                        </div>
                                    )}

                                </div>
                            );
                        })}

                        <div className="mb-4">

                            <label
                                htmlFor="entrega"
                                className="form-label"
                            >
                                Tipo de entrega
                            </label>

                            <select
                                id="entrega"
                                name="entrega"
                                className={
                                    "form-select " +
                                    (errores.entrega ? "is-invalid" : "")
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

                        <div className="card mb-4">
                            <div className="card-body">

                                <h2 className="h5">
                                    Resumen del pago
                                </h2>

                                <div className="d-flex justify-content-between">
                                    <span>Neto</span>
                                    <span>{formatoPrecio(neto)}</span>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <span>IVA incluido (19%)</span>
                                    <span>{formatoPrecio(iva)}</span>
                                </div>

                                <hr />

                                <div className="d-flex justify-content-between">
                                    <strong>Total a pagar</strong>
                                    <strong>{formatoPrecio(total)}</strong>
                                </div>

                            </div>
                        </div>

                        {/* OPCIÓN PARA DEMOSTRAR ERROR DE PAGO */}
                        <div className="alert alert-warning">

                            <div className="form-check">

                                <input
                                    type="checkbox"
                                    id="simularRechazo"
                                    className="form-check-input"
                                    checked={simularRechazo}
                                    onChange={function(evento) {
                                        setSimularRechazo(
                                            evento.target.checked
                                        );
                                    }}
                                />

                                <label
                                    htmlFor="simularRechazo"
                                    className="form-check-label"
                                >
                                    Simular pago rechazado
                                </label>

                            </div>

                            <small>
                                Opción de demostración académica.
                                No se realiza ningún cobro real.
                            </small>

                        </div>

                        <button
                            type="submit"
                            className="btn btn-success w-100 btn-lg"
                        >
                            Confirmar compra
                        </button>

                    </form>

                </div>
            </div>
        </main>
    );
}

export default Checkout;
