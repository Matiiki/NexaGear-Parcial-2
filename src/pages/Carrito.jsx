import React from "react";
import { Link } from "react-router-dom";

function Carrito({ carrito, setCarrito }) {

    function aumentarCantidad(id) {

        const carritoActualizado = carrito.map(function(producto) {

            if (producto.id === id) {
                return {
                    ...producto,
                    cantidad: producto.cantidad + 1
                };
            }

            return producto;
        });

        setCarrito(carritoActualizado);
    }


    function disminuirCantidad(id) {

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


    function eliminarProducto(id) {

        const nuevoCarrito = carrito.filter(function(producto) {
            return producto.id !== id;
        });

        setCarrito(nuevoCarrito);
    }


    function vaciarCarrito() {
        setCarrito([]);
    }


    const total = carrito.reduce(function(acumulado, producto) {

        return acumulado +
            producto.precio * producto.cantidad;

    }, 0);


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
                    {carrito.map(function(producto) {

                        const subtotal =
                            producto.precio * producto.cantidad;

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
                                                Precio:
                                                {" "}
                                                $
                                                {producto.precio.toLocaleString(
                                                    "es-CL"
                                                )}
                                            </p>

                                            <p className="mb-1">
                                                Cantidad:
                                                {" "}
                                                {producto.cantidad}
                                            </p>

                                            <p className="fw-bold mb-3">
                                                Subtotal:
                                                {" "}
                                                $
                                                {subtotal.toLocaleString(
                                                    "es-CL"
                                                )}
                                            </p>

                                        </div>


                                        <div className="col-12 col-md-7">

                                            <div className="d-flex flex-wrap gap-2 justify-content-md-end">

                                                <button
                                                    type="button"
                                                    className="btn btn-success"
                                                    onClick={function() {
                                                        aumentarCantidad(
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
                                                        disminuirCantidad(
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
                                                        eliminarProducto(
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

                    })}


                    <div className="card mt-4 shadow-sm">

                        <div className="card-body">

                            <h2 className="text-end">
                                Total:
                                {" "}
                                ${total.toLocaleString("es-CL")}
                            </h2>


                            <div className="d-flex flex-wrap justify-content-end gap-2 mt-3">

                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={vaciarCarrito}
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