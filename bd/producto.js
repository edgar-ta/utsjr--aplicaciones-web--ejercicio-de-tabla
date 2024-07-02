/**
 * @typedef Producto
 * @property {number} id
 * @property {string} codigo
 * @property {string} nombre
 * @property {number} descuento
 * @property {number} precio
 * @property {number} stock
 */

import { format } from "mysql2";
import { escape } from "mysql2";
import { BD } from "./conexion.js";

class RegistroDeProducto {
    /** @type {number} */
    #id;

    /** @type {string} */
    #codigo;

    /** @type {string} */
    #nombre;

    /** @type {number} */
    #descuento;

    /** @type {number} */
    #precio;

    /** @type {number} */
    #stock;

    /**
     * 
     * @param {Producto} producto 
     */
    constructor(producto) {
        this.id = producto.id;
        this.codigo = producto.codigo;
        this.nombre = producto.nombre;
        this.descuento = producto.descuento;
        this.precio = producto.precio;
        this.stock = producto.stock;
    }

    get id() { return this.#id; }
    set id(valor) { this.#id = valor; }

    get codigo() { return this.#codigo; }
    set codigo(valor) { this.#codigo = valor; }

    get nombre() { return this.#nombre; }
    set nombre(valor) { this.#nombre = valor; }

    get descuento() { return this.#descuento; }
    set descuento(valor) { this.#descuento = valor; }

    get precio() { return this.#precio; }
    set precio(valor) { this.#precio = valor; }

    get stock() { return this.#stock; }
    set stock(valor) { this.#stock = valor; }

    /**
     * @returns {Producto}
     */
    get datos() {
        return {
            id: this.id,
            codigo: this.codigo,
            nombre: this.nombre,
            descuento: this.descuento,
            precio: this.precio,
            stock: this.stock,
        };
    }
}

class ControladorDeProducto {
    constructor() {
        this.bd = new BD();
    }


    /**
     * 
     * @param {Producto | RegistroDeProducto} producto 
     */
    async insertar(producto) {
        if (producto instanceof RegistroDeProducto) {
            producto = producto.datos;
        }

        const sql = format(
            `INSERT INTO producto VALUES (NULL, 1, ?, ?, ?, ?, ?);`, 
            [ 
                producto.codigo, 
                producto.nombre, 
                producto.descuento,
                producto.precio,
                producto.stock,
            ]
        );
        try {
            await this.bd.conectar();
            await this.bd.conexion.execute(sql);
        } catch (error) {
            console.log(`Error: ${error}`);
            console.log(`Sentencia: ${sql}`);
        } finally {
            await this.bd.desconectar();
        }
    }

    /**
     * 
     * @returns {Producto[]}
     */
    async obtenerTodos() {
        const sql = `SELECT * FROM producto ORDER BY producto.nombre DESC LIMIT 10`;
        let productos = [];

        try {
            await this.bd.conectar();
            [ productos ] = await this.bd.conexion.execute(sql);

        } catch (error) {
            console.error("Error al recuperar los datos del producto " + error);
            console.error(sql);
        } finally {
            await this.bd.desconectar();
        }

        return productos;
    }

    /**
     * 
     * @param {number} id 
     * @returns {Producto}
     */
    async buscarPorId(id) {
        const sql = `SELECT * FROM producto WHERE producto.id = ${escape(id)}`;
        let producto = null;

        try {
            await this.bd.conectar();
            [ [ producto ] ] = await this.bd.conexion.execute(sql);
            console.log(`El producto fue encontrado correctamente`);

        } catch (error) {
            console.log(`Error buscando al producto: ${error}`);
            console.log(`El código de SQL es: ${sql}`);
        } finally {
            await this.bd.desconectar();
        }

        return producto;
    }

    /**
     * 
     * @param {Producto} producto 
     */
    async editar(producto) {
        const { id, ...rest } = producto;
        const sql = format(`UPDATE producto SET ? WHERE id = ?`, [ rest, id ]);

        try {
            await this.bd.conectar();
            await this.bd.conexion.execute(sql);
        } catch (error) {
            console.log(`Error editando al producto: ${error}`);
            console.log(`El código de SQL es: ${sql}`);
        } finally {
            await this.bd.desconectar();
        }
    }

    /**
     * 
     * @param {number} id 
     */
    async eliminar(id) {
        const sql = format(`DELETE FROM producto WHERE id = ?`, [ id ]);

        try {
            await this.bd.conectar();
            await this.bd.conexion.execute(sql);
        } catch (error) {
            console.log(`Error eliminando al producto: ${error}`);
            console.log(`El código de SQL es: ${sql}`);
        } finally {
            await this.bd.desconectar();
        }
    }

}

export { 
    RegistroDeProducto,
    ControladorDeProducto
};
