import React from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ProductoDetalle from "./pages/ProductoDetalle.jsx";

import Home from "./pages/Home.jsx";
import Productos from "./pages/Productos.jsx";

function App() {
    return (
        <>
            <Header />

            <Switch>

                <Route exact path="/">
                    <Home />
                </Route>

                <Route exact path="/productos">
                    <Productos />
                </Route>
                
                <Route path="/producto/:id">
    <               ProductoDetalle />
                </Route>

            </Switch>

            <Footer />
        </>
    );
}

export default App;