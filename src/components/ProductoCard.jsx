import React from "react";
import { Link } from "react-router-dom";


function ProductoCard({
    producto,
    agregarAlCarrito
}) {

    const stock =
        producto.stock === undefined
            ? 10
            : Number(producto.stock);


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


                    {stock > 0 ? (

                        <p className="text-success fw-bold">
                            Stock disponible: {stock}
                        </p>

                    ) : (

                        <p className="text-danger fw-bold">
                            Sin stock
                        </p>

                    )}


                    {producto.oferta ? (

                        <>
                            <p className="text-decoration-line-through text-muted mb-1">
                                $
                                {producto.precio.toLocaleString(
                                    "es-CL"
                                )}
                            </p>

                            <p className="fw-bold fs-5 text-danger mt-auto">
                                $
                                {producto.precioOferta.toLocaleString(
                                    "es-CL"
                                )}
                            </p>
                        </>

                    ) : (

                        <p className="fw-bold fs-5 mt-auto">
                            $
                            {producto.precio.toLocaleString(
                                "es-CL"
                            )}
                        </p>

                    )}


                    <Link
                        to={`/producto/${producto.id}`}
                        className="btn btn-outline-primary mb-2"
                    >
                        Ver producto
                    </Link>


                    <button
                        type="button"
                        className={
                            stock > 0
                                ? "btn btn-primary"
                                : "btn btn-secondary"
                        }
                        disabled={stock <= 0}
                        onClick={function() {

                            agregarAlCarrito(
                                producto
                            );

                        }}
                    >

                        {stock > 0
                            ? "Agregar al carrito"
                            : "Sin stock"}

                    </button>

                </div>

            </div>

        </div>
    );
}


export default ProductoCard;