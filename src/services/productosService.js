import productosIniciales from "../data/productos.js";


function normalizarProductos(productos) {

    return productos.map(function(producto) {

        return {
            ...producto,

            stock:
                producto.stock === undefined ||
                producto.stock === null
                    ? 10
                    : Number(producto.stock)
        };

    });
}


export function obtenerProductos() {

    const productosGuardados =
        localStorage.getItem("productosAdmin");


    if (productosGuardados) {

        const productos =
            JSON.parse(productosGuardados);

        return normalizarProductos(productos);
    }


    return normalizarProductos(productosIniciales);
}