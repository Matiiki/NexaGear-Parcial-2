import React from "react";

import ProductoCard from "../components/ProductoCard.jsx";
import { obtenerProductos } from "../services/productosService.js";

function Productos({ agregarAlCarrito }) {

    const productos = obtenerProductos();

    return (
        <main className="container py-5">

            <h1 className="text-center mb-4">
                Nuestros productos
            </h1>

            <p className="text-center mb-5">
                Encuentra periféricos y accesorios para mejorar tu setup.
            </p>

            <div className="row">

                {productos.map(function(producto) {

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

export default Productos;