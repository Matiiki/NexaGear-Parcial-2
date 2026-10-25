import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Productos from "./pages/Productos.jsx";
import ProductoDetalle from "./pages/ProductoDetalle.jsx";
import Carrito from "./pages/Carrito.jsx";
import Contacto from "./pages/Contacto.jsx";
import Registro from "./pages/Registro.jsx";
import Categorias from "./pages/Categorias.jsx";
import Ofertas from "./pages/Ofertas.jsx";
import Login from "./pages/Login.jsx";
import Checkout from "./pages/Checkout.jsx";
import CompraExitosa from "./pages/CompraExitosa.jsx";
import PagoError from "./pages/PagoError.jsx";

import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminProductos from "./pages/AdminProductos.jsx";
import AdminCategorias from "./pages/AdminCategorias.jsx";
import AdminUsuarios from "./pages/AdminUsuarios.jsx";
import AdminPedidos from "./pages/AdminPedidos.jsx";
import AdminReportes from "./pages/AdminReportes.jsx";
import AdminPerfil from "./pages/AdminPerfil.jsx";

import {
    obtenerPrecioFinal
} from "./utils/logicaNexaGear.js";


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

        const stockDisponible =
            producto.stock === undefined
                ? 10
                : Number(producto.stock);


        if (stockDisponible <= 0) {

            window.alert(
                "Este producto no tiene stock disponible."
            );

            return;
        }


        const precioFinal =
            obtenerPrecioFinal(producto);


        const productoExistente =
            carrito.find(function(item) {

                return item.id === producto.id;
            });


        if (productoExistente) {

            if (
                productoExistente.cantidad >=
                stockDisponible
            ) {

                window.alert(
                    "No puedes agregar más unidades. Stock máximo disponible: " +
                    stockDisponible
                );

                return;
            }


            const carritoActualizado =
                carrito.map(function(item) {

                    if (
                        item.id === producto.id
                    ) {

                        return {
                            ...item,
                            stock: stockDisponible,
                            cantidad:
                                item.cantidad + 1
                        };
                    }


                    return item;
                });


            setCarrito(
                carritoActualizado
            );

        } else {

            setCarrito([
                ...carrito,
                {
                    ...producto,
                    precio: precioFinal,
                    stock: stockDisponible,
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
                        agregarAlCarrito={
                            agregarAlCarrito
                        }
                    />

                </Route>


                <Route path="/producto/:id">

                    <ProductoDetalle
                        agregarAlCarrito={
                            agregarAlCarrito
                        }
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
                        agregarAlCarrito={
                            agregarAlCarrito
                        }
                    />

                </Route>


                <Route path="/ofertas">

                    <Ofertas
                        agregarAlCarrito={
                            agregarAlCarrito
                        }
                    />

                </Route>


                <Route path="/login">
                    <Login />
                </Route>


                <Route path="/checkout">

                    <Checkout
                        carrito={carrito}
                        setCarrito={setCarrito}
                    />

                </Route>


                <Route path="/compra-exitosa">
                    <CompraExitosa />
                </Route>


                <Route path="/pago-error">
                    <PagoError />
                </Route>


                <Route exact path="/admin">
                    <AdminDashboard />
                </Route>


                <Route path="/admin/productos">
                    <AdminProductos />
                </Route>


                <Route path="/admin/categorias">
                    <AdminCategorias />
                </Route>


                <Route path="/admin/usuarios">
                    <AdminUsuarios />
                </Route>


                <Route path="/admin/pedidos">
                    <AdminPedidos />
                </Route>


                <Route path="/admin/reportes">
                    <AdminReportes />
                </Route>


                <Route path="/admin/perfil">
                    <AdminPerfil />
                </Route>

            </Switch>


            <Footer />
        </>
    );
}


export default App;