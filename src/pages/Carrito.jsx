import React from "react";
import { Link } from "react-router-dom";

import {
    calcularTotal,
    eliminarProducto
} from "../utils/logicaNexaGear.js";


function Carrito({
    carrito,
    setCarrito
}) {


    function aumentar(id) {

        const producto =
            carrito.find(function(item) {

                return item.id === id;
            });


        if (!producto) {
            return;
        }


        const stockDisponible =
            producto.stock === undefined
                ? 10
                : Number(producto.stock);


        if (
            producto.cantidad >=
            stockDisponible
        ) {

            window.alert(
                "No puedes agregar más unidades. Stock disponible: " +
                stockDisponible
            );

            return;
        }


        const carritoActualizado =
            carrito.map(function(item) {

                if (item.id === id) {

                    return {
                        ...item,
                        cantidad:
                            item.cantidad + 1
                    };
                }


                return item;
            });


        setCarrito(
            carritoActualizado
        );
    }


    function disminuir(id) {

        const carritoActualizado =
            carrito
                .map(function(producto) {

                    if (
                        producto.id === id
                    ) {

                        return {
                            ...producto,
                            cantidad:
                                producto.cantidad - 1
                        };
                    }


                    return producto;
                })
                .filter(function(producto) {

                    return (
                        producto.cantidad > 0
                    );
                });


        setCarrito(
            carritoActualizado
        );
    }


    function eliminar(id) {

        const nuevoCarrito =
            eliminarProducto(
                carrito,
                id
            );


        setCarrito(
            nuevoCarrito
        );
    }


    function vaciarCarrito() {

        setCarrito([]);
    }


    const total =
        calcularTotal(carrito);


    return (
        <main className="container py-5">

            <h1 className="text-center mb-4">
                Mi carrito
            </h1>


            {carrito.length === 0 ? (

                <div className="text-center">

                    <div className="alert alert-info">
                        El carrito está vacío.
                    </div>

                    <Link
                        to="/productos"
                        className="btn btn-primary"
                    >
                        Ver productos
                    </Link>

                </div>

            ) : (

                <>

                    {carrito.map(
                        function(producto) {

                            const subtotal =
                                producto.precio *
                                producto.cantidad;


                            const stockDisponible =
                                producto.stock === undefined
                                    ? 10
                                    : Number(
                                        producto.stock
                                    );


                            const stockMaximo =
                                producto.cantidad >=
                                stockDisponible;


                            return (

                                <div
                                    className="card mb-3 shadow-sm"
                                    key={producto.id}
                                >

                                    <div className="card-body">

                                        <div className="row align-items-center">


                                            <div className="col-12 col-md-5">

                                                <h5 className="mb-2">
                                                    {producto.nombre}
                                                </h5>


                                                <p className="mb-1">
                                                    Precio:{" "}
                                                    $
                                                    {producto.precio.toLocaleString(
                                                        "es-CL"
                                                    )}
                                                </p>


                                                <p className="mb-1">
                                                    Cantidad:{" "}
                                                    {producto.cantidad}
                                                </p>


                                                <p className="mb-1 text-muted">
                                                    Stock disponible:{" "}
                                                    {stockDisponible}
                                                </p>


                                                <p className="fw-bold mb-3">
                                                    Subtotal:{" "}
                                                    $
                                                    {subtotal.toLocaleString(
                                                        "es-CL"
                                                    )}
                                                </p>


                                                {stockMaximo && (

                                                    <small className="text-danger">
                                                        Alcanzaste el stock máximo disponible.
                                                    </small>

                                                )}

                                            </div>


                                            <div className="col-12 col-md-7">

                                                <div className="d-flex flex-wrap gap-2 justify-content-md-end">


                                                    <button
                                                        type="button"
                                                        className={
                                                            stockMaximo
                                                                ? "btn btn-secondary"
                                                                : "btn btn-success"
                                                        }
                                                        disabled={
                                                            stockMaximo
                                                        }
                                                        onClick={function() {

                                                            aumentar(
                                                                producto.id
                                                            );

                                                        }}
                                                    >
                                                        +
                                                    </button>


                                                    <button
                                                        type="button"
                                                        className="btn btn-warning"
                                                        onClick={function() {

                                                            disminuir(
                                                                producto.id
                                                            );

                                                        }}
                                                    >
                                                        −
                                                    </button>


                                                    <button
                                                        type="button"
                                                        className="btn btn-danger"
                                                        onClick={function() {

                                                            eliminar(
                                                                producto.id
                                                            );

                                                        }}
                                                    >
                                                        Eliminar
                                                    </button>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>
                            );
                        }
                    )}


                    <div className="card mt-4 shadow-sm">

                        <div className="card-body">

                            <h2 className="text-end">
                                Total:{" "}
                                $
                                {total.toLocaleString(
                                    "es-CL"
                                )}
                            </h2>


                            <div className="d-flex flex-wrap justify-content-end gap-2 mt-3">


                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={
                                        vaciarCarrito
                                    }
                                >
                                    Vaciar carrito
                                </button>


                                <Link
                                    to="/checkout"
                                    className="btn btn-success"
                                >
                                    Comprar
                                </Link>

                            </div>

                        </div>

                    </div>

                </>

            )}

        </main>
    );
}


export default Carrito;