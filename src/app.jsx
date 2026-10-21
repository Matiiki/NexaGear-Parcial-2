import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Registro from "./pages/Registro.jsx";
import Home from "./pages/Home.jsx";
import Productos from "./pages/Productos.jsx";
import ProductoDetalle from "./pages/ProductoDetalle.jsx";
import Carrito from "./pages/Carrito.jsx";
import Contacto from "./pages/Contacto.jsx";
import Categorias from "./pages/Categorias.jsx";
import Ofertas from "./pages/Ofertas.jsx";
import Login from "./pages/Login.jsx";
import Checkout from "./pages/Checkout.jsx";
import CompraExitosa from "./pages/CompraExitosa.jsx";
import PagoError from "./pages/PagoError.jsx";
import AdminProductos from "./pages/AdminProductos.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminCategorias from "./pages/AdminCategorias.jsx";
import { obtenerPrecioFinal } from "./utils/logicaNexaGear.js";

function App() {

    const [carrito, setCarrito] = useState(function() {

        const carritoGuardado =
            localStorage.getItem("carrito");

        return carritoGuardado
            ? JSON.parse(carritoGuardado)
            : [];
    });


    useEffect(function() {

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );

    }, [carrito]);


    function agregarAlCarrito(producto) {

    const precioFinal =
        obtenerPrecioFinal(producto);

    const productoExistente = carrito.find(function(item) {
        return item.id === producto.id;
    });


    if (productoExistente) {

        const carritoActualizado =
            carrito.map(function(item) {

                if (item.id === producto.id) {

                    return {
                        ...item,
                        cantidad: item.cantidad + 1
                    };
                }

                return item;
            });

        setCarrito(carritoActualizado);

    } else {

        setCarrito([
            ...carrito,
            {
                ...producto,
                precio: precioFinal,
                cantidad: 1
            }
        ]);
    }
}


    return (
        <>
            <Header carrito={carrito} />

            <Switch>

                <Route exact path="/">
                    <Home />
                </Route>

                <Route exact path="/productos">
                    <Productos
                        agregarAlCarrito={agregarAlCarrito}
                    />
                </Route>

                <Route path="/producto/:id">
                    <ProductoDetalle
                        agregarAlCarrito={agregarAlCarrito}
                    />
                </Route>

                <Route path="/contacto">
                    <Contacto />
                </Route>

                <Route path="/registro">
                    <Registro />
                </Route>

                <Route path="/carrito">
                    <Carrito
                        carrito={carrito}
                        setCarrito={setCarrito}
                    />
                </Route>

                <Route path="/categorias">
                    <Categorias
                        agregarAlCarrito={agregarAlCarrito}
                    />
                </Route>

                <Route path="/ofertas">
                    <Ofertas
                         agregarAlCarrito={agregarAlCarrito}
                    />
                </Route>
                <Route path="/login">
                    <Login />
                    </Route>

                <Route path="/checkout">
                    <Checkout carrito={carrito} />
                </Route>

                <Route path="/compra-exitosa">
                     <CompraExitosa />
                
                </Route>

                <Route path="/pago-error">
                    <PagoError />
                </Route>
                <Route path="/admin/productos">
                    <AdminProductos />
                </Route>
                
                <Route exact path="/admin">
                    <AdminDashboard />
                </Route>

                <Route path="/admin/categorias">
                    <AdminCategorias />
                </Route>

            </Switch>

            <Footer />
        </>
    );
}

export default App;