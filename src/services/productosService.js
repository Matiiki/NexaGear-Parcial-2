import productosIniciales from "../data/productos.js";

export function obtenerProductos() {

    const productosGuardados =
        localStorage.getItem("productosAdmin");

    if (productosGuardados) {
        return JSON.parse(productosGuardados);
    }

    return productosIniciales;
}