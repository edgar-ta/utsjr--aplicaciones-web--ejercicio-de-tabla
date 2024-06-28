import mysql from "mysql2/promise";

class BD {
    constructor() {
        this.conexion = null;
        this.mysql = mysql;
    }

    async conectar() {
        try {
            this.conexion = await this.mysql.createConnection({
                host: "127.0.0.5",
                user: "root",
                password: "root",
                database: "aplicaciones_web",
                port: "3306"
            });
            console.log("Conexión creada");
        } catch (error) {
            console.error(`Error creando la conexión: \n${error.message}`);
        }
    }

    async desconectar() {
        if (this.conexion != null) {
            try {
                await this.conexion.end();
                console.log("Conexión eliminada");
            } catch {
                console.log("La conexión no se pudo eliminar");
            }
        }
    }
}

export { BD };

