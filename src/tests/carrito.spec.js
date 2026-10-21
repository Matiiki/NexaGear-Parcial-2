import {
    calcularSubtotal,
    calcularTotal,
    aumentarCantidad,
    eliminarProducto
} from "../utils/logicaNexaGear.js";


describe("Carrito NexaGear", function() {

    it("debe calcular correctamente el subtotal de un producto", function() {

        const resultado =
            calcularSubtotal(29990, 2);

        expect(resultado).toBe(59980);
    });


    it("debe calcular correctamente el total del carrito", function() {

        const carrito = [
            {
                precio: 29990,
                cantidad: 2
            },
            {
                precio: 14990,
                cantidad: 1
            }
        ];

        const total =
            calcularTotal(carrito);

        expect(total).toBe(74970);
    });


    it("debe aumentar la cantidad de un producto", function() {

        const carrito = [
            {
                id: "mouse",
                cantidad: 1
            }
        ];

        const carritoActualizado =
            aumentarCantidad(carrito, "mouse");

        expect(
            carritoActualizado[0].cantidad
        ).toBe(2);
    });


    it("debe eliminar un producto del carrito", function() {

        const carrito = [
            {
                id: "mouse",
                nombre: "Logitech G203"
            },
            {
                id: "teclado",
                nombre: "HyperX Alloy Origins"
            }
        ];

        const nuevoCarrito =
            eliminarProducto(
                carrito,
                "mouse"
            );

        expect(nuevoCarrito.length).toBe(1);

        expect(
            nuevoCarrito[0].id
        ).toBe("teclado");
    });

});