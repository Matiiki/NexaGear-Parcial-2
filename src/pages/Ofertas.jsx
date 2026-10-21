import React from "react";

import ProductoCard from "../components/ProductoCard.jsx";
import { obtenerProductos } from "../services/productosService.js";

import {
    filtrarOfertas
} from "../utils/logicaNexaGear.js";


function Ofertas({ agregarAlCarrito }) {

    const productos = obtenerProductos();

    const productosEnOferta =
        filtrarOfertas(productos);


    return (
        <main className="container py-5">

            <h1 className="text-center mb-4">
                Ofertas
            </h1>

            <p className="text-center mb-5">
                Aprovecha nuestros productos con descuento.
            </p>


            <div className="row">

                {productosEnOferta.length === 0 ? (

                    <div className="alert alert-info text-center">
                        No hay productos en oferta actualmente.
                    </div>

                ) : (

                    productosEnOferta.map(function(producto) {

                        return (
                            <ProductoCard
                                key={producto.id}
                                producto={producto}
                                agregarAlCarrito={agregarAlCarrito}
                            />
                        );

                    })

                )}

            </div>

        </main>
    );
}

export default Ofertas;