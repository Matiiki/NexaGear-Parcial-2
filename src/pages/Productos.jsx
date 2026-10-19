import React from "react";

import productos from "../data/productos.js";
import ProductoCard from "../components/ProductoCard.jsx";

function Productos() {
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
                        />
                    );
                })}

            </div>

        </main>
    );
}

export default Productos;