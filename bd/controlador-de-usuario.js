import { BD } from "./conexion.js";
import { Usuario } from "../classes/usuario.js";

import mysql from "mysql2";
import { format } from "mysql2";
import { escape } from "mysql2";

class ControladorDeUsuario {
    constructor() {
        this.bd = new BD();
    }

    /**
     * 
     * @param {Usuario} usuario 
     */
    async insertar(usuario) {
        const sql = `INSERT INTO usuario VALUES (NULL, ${escape(usuario.nombre)}, ${escape(usuario.cuatrimestre)}, ${escape(usuario.carrera)}, ${escape(usuario.grupo)}, ${escape(usuario.anio)});`;
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
     * @returns {import("../classes/usuario.js").DatosDeUsuario[]}
     */
    async obtenerUsuarios() {
        const sql = `SELECT * FROM usuario ORDER BY usuario.id DESC LIMIT 10`;
        let usuarios = [];

        try {
            await this.bd.conectar();
            [ usuarios ] = await this.bd.conexion.execute(sql);

        } catch (error) {
            console.error("Error al recuperar los datos del usuario " + error);
            console.error(sql);
        } finally {
            await this.bd.desconectar();
        }

        return usuarios;
    }

    /**
     * 
     * @param {number} id 
     * @returns {import("../classes/usuario.js").DatosDeUsuario}
     */
    async buscarUsuarioPorId(id) {
        const sql = `SELECT * FROM usuario WHERE usuario.id = ${escape(id)}`;
        let usuario = null;

        try {
            await this.bd.conectar();
            [ [ usuario ] ] = await this.bd.conexion.execute(sql);
            console.log(`El usuario fue encontrado correctamente`);

        } catch (error) {
            console.log(`Error buscando al usuario: ${error}`);
            console.log(`El código de SQL es: ${sql}`);
        } finally {
            await this.bd.desconectar();
        }

        return usuario;
    }

    /**
     * 
     * @param {import("../classes/usuario.js").DatosDeUsuario} usuario 
     */
    async editarUsuario(usuario) {
        const { id, ...rest } = usuario;
        const sql = format(`UPDATE usuario SET ? WHERE id = ?`, [ rest, id ]);

        try {
            await this.bd.conectar();
            await this.bd.conexion.execute(sql);
        } catch (error) {
            console.log(`Error editando al usuario: ${error}`);
            console.log(`El código de SQL es: ${sql}`);
        } finally {
            await this.bd.desconectar();
        }
    }

    /**
     * 
     * @param {number} usuario 
     */
    async eliminarUsuario(id) {
        const sql = format(`DELETE FROM usuario WHERE id = ?`, [ id ]);

        try {
            await this.bd.conectar();
            await this.bd.conexion.execute(sql);
        } catch (error) {
            console.log(`Error eliminando al usuario: ${error}`);
            console.log(`El código de SQL es: ${sql}`);
        } finally {
            await this.bd.desconectar();
        }
    }
}

export { ControladorDeUsuario };
