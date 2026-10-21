import React, { useState } from "react";

import ProductoCard from "../components/ProductoCard.jsx";
import { obtenerProductos } from "../services/productosService.js";

function Categorias({ agregarAlCarrito }) {

    const productos = obtenerProductos();

    const [categoriaSeleccionada, setCategoriaSeleccionada] =
        useState("Todas");

    const categorias = [
        "Todas",
        ...new Set(
            productos.map(function(producto) {
                return producto.categoria;
            })
        )
    ];

    const productosFiltrados =
        categoriaSeleccionada === "Todas"
            ? productos
            : productos.filter(function(producto) {
                return producto.categoria === categoriaSeleccionada;
            });

    return (
        <main className="container py-5">

            <h1 className="text-center mb-4">
                Categorías
            </h1>

            <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">

                {categorias.map(function(categoria) {

                    return (
                        <button
                            key={categoria}
                            type="button"
                            className={
                                categoriaSeleccionada === categoria
                                    ? "btn btn-primary"
                                    : "btn btn-outline-primary"
                            }
                            onClick={function() {
                                setCategoriaSeleccionada(categoria);
                            }}
                        >
                            {categoria}
                        </button>
                    );

                })}

            </div>

            <div className="row">

                {productosFiltrados.map(function(producto) {

                    return (
                        <ProductoCard
                            key={producto.id}
                            producto={producto}
                            agregarAlCarrito={agregarAlCarrito}
                        />
                    );

                })}

            </div>

        </main>
    );
}

export default Categorias;