
import React from "react";
import { Link } from "react-router-dom";

import {
    calcularTotal,
    eliminarProducto
} from "../utils/logicaNexaGear.js";


function Carrito({ carrito, setCarrito }) {

    // AUMENTAR CANTIDAD
    function aumentar(id) {

        const producto = carrito.find(function(item) {
            return item.id === id;
        });

        if (!producto) {
            return;
        }

        const stockDisponible =
            producto.stock === undefined
                ? 10
                : Number(producto.stock);

        if (producto.cantidad >= stockDisponible) {
            window.alert(
                "No puedes agregar más unidades. Stock disponible: " +
                stockDisponible
            );
            return;
        }

        const carritoActualizado = carrito.map(function(item) {

            if (item.id === id) {
                return {
                    ...item,
                    cantidad: item.cantidad + 1
                };
            }

            return item;
        });

        setCarrito(carritoActualizado);
    }


    // DISMINUIR CANTIDAD
    function disminuir(id) {

        const carritoActualizado = carrito
            .map(function(producto) {

                if (producto.id === id) {
                    return {
                        ...producto,
                        cantidad: producto.cantidad - 1
                    };
                }

                return producto;
            })
            .filter(function(producto) {
                return producto.cantidad > 0;
            });

        setCarrito(carritoActualizado);
    }


    // ELIMINAR PRODUCTO
    function eliminar(id) {

        const nuevoCarrito = eliminarProducto(carrito, id);

        setCarrito(nuevoCarrito);
    }


    // VACIAR CARRITO
    function vaciarCarrito() {
        setCarrito([]);
    }


    // CALCULAR TOTAL E IMPUESTOS
    // Los precios de NexaGear ya incluyen IVA.

    const total = calcularTotal(carrito);

    const neto = Math.round(total / 1.19);

    const iva = total - neto;


    function formatoPrecio(valor) {
        return "$" + valor.toLocaleString("es-CL");
    }


    return (
        <main className="container py-5">

            <h1 className="text-center fw-bold mb-4">
                Mi carrito de compras
            </h1>

            {carrito.length === 0 ? (

                <div className="text-center">

                    <div className="alert alert-info">
                        Tu carrito está vacío.
                    </div>

                    <Link
                        to="/productos"
                        className="btn btn-primary"
                    >
                        Ver productos
                    </Link>

                </div>

            ) : (

                <div className="row g-4">

                    {/* DETALLE DE PRODUCTOS */}

                    <div className="col-12 col-lg-8">

                        <h2 className="h4 mb-3">
                            Detalle de productos
                        </h2>

                        {carrito.map(function(producto) {

                            const subtotal =
                                producto.precio * producto.cantidad;

                            const stockDisponible =
                                producto.stock === undefined
                                    ? 10
                                    : Number(producto.stock);

                            const stockMaximo =
                                producto.cantidad >= stockDisponible;

                            return (

                                <div
                                    className="card shadow-sm mb-3"
                                    key={producto.id}
                                >

                                    <div className="card-body">

                                        <h3 className="h5 fw-bold">
                                            {producto.nombre}
                                        </h3>

                                        <p className="mb-2">
                                            Precio unitario:{" "}
                                            {formatoPrecio(producto.precio)}
                                        </p>

                                        <p className="text-muted mb-2">
                                            Stock disponible:{" "}
                                            {stockDisponible}
                                        </p>

                                        <div className="d-flex align-items-center gap-2 mb-3">

                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={function() {
                                                    disminuir(producto.id);
                                                }}
                                            >
                                                −
                                            </button>

                                            <span className="fw-bold px-2">
                                                {producto.cantidad}
                                            </span>

                                            <button
                                                type="button"
                                                className="btn btn-outline-primary"
                                                disabled={stockMaximo}
                                                onClick={function() {
                                                    aumentar(producto.id);
                                                }}
                                            >
                                                +
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-outline-danger ms-auto"
                                                onClick={function() {
                                                    eliminar(producto.id);
                                                }}
                                            >
                                                Eliminar
                                            </button>

                                        </div>

                                        {stockMaximo && (
                                            <p className="text-danger small">
                                                Alcanzaste el stock máximo disponible.
                                            </p>
                                        )}

                                        <div className="border-top pt-3">

                                            <p className="mb-0 fw-bold">
                                                Subtotal:{" "}
                                                {formatoPrecio(subtotal)}
                                            </p>

                                        </div>

                                    </div>

                                </div>
                            );
                        })}

                        <button
                            type="button"
                            className="btn btn-outline-danger mt-2"
                            onClick={vaciarCarrito}
                        >
                            Vaciar carrito
                        </button>

                    </div>


                    {/* RESUMEN E IMPUESTOS */}

                    <div className="col-12 col-lg-4">

                        <div className="card shadow-sm">

                            <div className="card-header bg-dark text-white">

                                <h2 className="h5 mb-0">
                                    Resumen de compra
                                </h2>

                            </div>

                            <div className="card-body">

                                <div className="d-flex justify-content-between mb-3">

                                    <span>
                                        Neto
                                    </span>

                                    <span>
                                        {formatoPrecio(neto)}
                                    </span>

                                </div>

                                <div className="d-flex justify-content-between mb-3">

                                    <span>
                                        IVA (19%)
                                    </span>

                                    <span>
                                        {formatoPrecio(iva)}
                                    </span>

                                </div>

                                <hr />

                                <div className="d-flex justify-content-between align-items-center mb-3">

                                    <strong>
                                        Total a pagar
                                    </strong>

                                    <strong className="fs-4 text-primary">
                                        {formatoPrecio(total)}
                                    </strong>

                                </div>

                                <p className="text-muted small">
                                    Los precios incluyen IVA.
                                    El impuesto no se cobra adicionalmente.
                                </p>

                                <Link
                                    to="/checkout"
                                    className="btn btn-success w-100"
                                >
                                    Continuar al Checkout
                                </Link>

                            </div>

                        </div>

                        <Link
                            to="/productos"
                            className="btn btn-outline-primary w-100 mt-3"
                        >
                            Seguir comprando
                        </Link>

                    </div>

                </div>
            )}

        </main>
    );
}

export default Carrito;
