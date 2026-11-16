
import React, { useEffect, useState } from "react";
import {
    Switch,
    Route,
    Redirect,
    useLocation
} from "react-router-dom";

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

import Vendedor from "./pages/Vendedor.jsx";

import { obtenerPrecioFinal } from "./utils/logicaNexaGear.js";


function App() {

    const location = useLocation();

    let usuario = null;

    try {
        usuario = JSON.parse(
            localStorage.getItem("sesionUsuario")
        );
    } catch (error) {
        usuario = null;
    }

    const rol = usuario
        ? (usuario.rol || "CLIENTE")
        : null;


    const [carrito, setCarrito] = useState(function() {

        const guardado = localStorage.getItem("carrito");

        return guardado ? JSON.parse(guardado) : [];
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
            window.alert("Producto sin stock.");
            return;
        }

        const existente = carrito.find(function(item) {
            return item.id === producto.id;
        });

        if (existente) {

            if (existente.cantidad >= stockDisponible) {
                window.alert("No hay más stock disponible.");
                return;
            }

            setCarrito(
                carrito.map(function(item) {
                    if (item.id === producto.id) {
                        return {
                            ...item,
                            cantidad: item.cantidad + 1,
                            stock: stockDisponible
                        };
                    }
                    return item;
                })
            );

        } else {

            setCarrito([
                ...carrito,
                {
                    ...producto,
                    precio: obtenerPrecioFinal(producto),
                    stock: stockDisponible,
                    cantidad: 1
                }
            ]);
        }
    }


    // El vendedor no puede entrar a las vistas de la tienda.
    if (
        rol === "VENDEDOR" &&
        !location.pathname.startsWith("/vendedor")
    ) {
        return (
            <Redirect to="/vendedor/productos" />
        );
    }


    return (
        <>
            <Header carrito={carrito} />

            <Switch>

                {/* VISTAS EXCLUSIVAS DEL VENDEDOR */}

                <Route path="/vendedor">
                    {rol === "VENDEDOR" ? (
                        <Switch>

                            <Route
                                exact
                                path="/vendedor/productos"
                            >
                                <Vendedor seccion="productos" />
                            </Route>

                            <Route path="/vendedor/productos/:id">
                                <Vendedor seccion="productos" />
                            </Route>

                            <Route
                                exact
                                path="/vendedor/pedidos"
                            >
                                <Vendedor seccion="pedidos" />
                            </Route>

                            <Route path="/vendedor/pedidos/:id">
                                <Vendedor seccion="pedidos" />
                            </Route>

                            <Redirect to="/vendedor/productos" />

                        </Switch>
                    ) : (
                        <Redirect to="/" />
                    )}
                </Route>


                {/* VISTAS EXCLUSIVAS DEL ADMINISTRADOR */}

                <Route path="/admin">
                    {rol === "ADMINISTRADOR" ? (
                        <Switch>

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

                            <Redirect to="/admin" />

                        </Switch>
                    ) : (
                        <Redirect to="/" />
                    )}
                </Route>


                {/* TIENDA: CLIENTES Y ADMINISTRADOR */}

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

                <Route path="/contacto">
                    <Contacto />
                </Route>

                <Route path="/registro">
                    <Registro />
                </Route>

                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/carrito">
                    <Carrito
                        carrito={carrito}
                        setCarrito={setCarrito}
                    />
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

                <Route>
                    <main className="container py-5 text-center">
                        <h1>Página no encontrada</h1>
                        <LinkInicio />
                    </main>
                </Route>

            </Switch>

            <Footer />
        </>
    );
}


function LinkInicio() {
    return (
        <a href="#/" className="btn btn-primary mt-3">
            Volver al inicio
        </a>
    );
}

export default App;
