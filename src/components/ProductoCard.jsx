import React from "react";
import { Link } from "react-router-dom";

function ProductoCard({ producto, agregarAlCarrito }) {

    return (
        <div className="col-12 col-md-6 col-lg-4 mb-4">

            <div className="card h-100 shadow-sm">

                <img
                    src={producto.imagen}
                    className="card-img-top p-3"
                    alt={producto.nombre}
                    style={{
                        height: "220px",
                        objectFit: "contain"
                    }}
                />

                <div className="card-body d-flex flex-column">

                    <h5 className="card-title">
                        {producto.nombre}
                    </h5>

                    <p className="text-muted">
                        {producto.categoria}
                    </p>

                    <p>
                        {producto.descripcion}
                    </p>


                    {/* PRECIO */}
                    {producto.oferta ? (
                        <>
                            <p className="text-decoration-line-through text-muted mb-1">
                                ${producto.precio.toLocaleString("es-CL")}
                            </p>

                            <p className="fw-bold fs-5 text-danger mt-auto">
                                ${producto.precioOferta.toLocaleString("es-CL")}
                            </p>
                        </>
                    ) : (
                        <p className="fw-bold fs-5 mt-auto">
                            ${producto.precio.toLocaleString("es-CL")}
                        </p>
                    )}


                    {/* VER PRODUCTO */}
                    <Link
                        to={`/producto/${producto.id}`}
                        className="btn btn-outline-primary mb-2"
                    >
                        Ver producto
                    </Link>


                    {/* AGREGAR AL CARRITO */}
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={function() {
                            agregarAlCarrito(producto);
                        }}
                    >
                        Agregar al carrito
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ProductoCard;