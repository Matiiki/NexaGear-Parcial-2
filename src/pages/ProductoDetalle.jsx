import React from "react";
import { Link, useParams } from "react-router-dom";

import { obtenerProductos } from "../services/productosService.js";

function ProductoDetalle({ agregarAlCarrito }) {

    const { id } = useParams();

    const productos = obtenerProductos();

    const producto = productos.find(function(item) {
        return item.id === id;
    });

    if (!producto) {

        return (
            <main className="container py-5 text-center">

                <h1>
                    Producto no encontrado
                </h1>

                <Link
                    to="/productos"
                    className="btn btn-primary mt-3"
                >
                    Volver a productos
                </Link>

            </main>
        );
    }

    return (
        <main className="container py-5">

            <div className="row align-items-center">

                <div className="col-12 col-md-6 mb-4">

                    <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="img-fluid rounded"
                        style={{
                            maxHeight: "450px",
                            objectFit: "contain"
                        }}
                    />

                </div>

                <div className="col-12 col-md-6">

                    <p className="text-muted">
                        {producto.categoria}
                    </p>

                    <h1>
                        {producto.nombre}
                    </h1>

                    {producto.oferta ? (

                        <>
                            <p className="text-decoration-line-through text-muted">
                                ${producto.precio.toLocaleString("es-CL")}
                            </p>

                            <p className="fs-3 fw-bold text-danger">
                                ${producto.precioOferta.toLocaleString("es-CL")}
                            </p>
                        </>

                    ) : (

                        <p className="fs-3 fw-bold">
                            ${producto.precio.toLocaleString("es-CL")}
                        </p>

                    )}

                    <p>
                        {producto.descripcion}
                    </p>

                    <button
                        type="button"
                        className="btn btn-primary me-2"
                        onClick={function() {
                            agregarAlCarrito(producto);
                        }}
                    >
                        Agregar al carrito
                    </button>

                    <Link
                        to="/productos"
                        className="btn btn-outline-secondary"
                    >
                        Volver
                    </Link>

                </div>

            </div>

        </main>
    );
}

export default ProductoDetalle;