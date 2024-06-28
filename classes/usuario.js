/**
 * @typedef {"TI" | "PIP" | "QI"} CarreraDisponible
 */

/**
 * @typedef {1 | 2 | 3 | 4} GrupoDisponible
 */

/**
 * @typedef DatosDeUsuario
 * @property {number} id
 * @property {string} nombre
 * @property {number} cuatrimestre
 * @property {CarreraDisponible} carrera
 * @property {GrupoDisponible} grupo
 * @property {number} anio
 */

/**
 * @typedef DatosDeUsuarioEnIngles
 * @property {number} id
 * @property {string} name
 * @property {number} period
 * @property {CarreraDisponible} career
 * @property {GrupoDisponible} group
 * @property {number} year
 */


/**
 * 
 * @param {DatosDeUsuario} data 
 * @returns {DatosDeUsuarioEnIngles}
 */
function renameUserDataToEnglish(data) {
    const { anio: year, carrera: career, cuatrimestre: period, grupo: group, id, nombre: name } = data;
    return {
        id,
        name,
        period,
        career,
        group,
        year
    };
}

/**
 * 
 * @param {DatosDeUsuarioEnIngles} data 
 * @returns {DatosDeUsuario}
 */
function renameUserDataToSpanish(data) {
    const { career: carrera, group: grupo, id, name: nombre, period: cuatrimestre, year: anio } = data;
    return {
        id,
        nombre,
        cuatrimestre,
        carrera,
        grupo,
        anio
    };
}

class Usuario {
    /** @type {number} */
    #id;

    /** @type {string} */
    #nombre;

    /** @type {number} */
    #cuatrimestre;

    /** @type {CarreraDisponible} */
    #carrera;

    /** @type {GrupoDisponible} */
    #grupo;

    /** @type {number} */
    #anio;

    /**
     * 
     * @param {DatosDeUsuario} param0 
     */
    constructor({
        id,
        name: nombre ,
        period: cuatrimestre, 
        career: carrera ,
        group: grupo ,
        year: anio
    }) {
        this.#id = id;
        this.#nombre = nombre;
        this.#cuatrimestre = cuatrimestre;
        this.#carrera = carrera;
        this.#grupo = grupo;
        this.#anio = anio;
    }

    static printCallingSetterMessage(property) {
        console.log(`Calling setter for property: "${property}"`);
    }

    set id(value) { 
        Usuario.printCallingSetterMessage("id");
        this.#id = value; 
    }
    get id() { return this.#id; }

    set nombre(value) { 
        Usuario.printCallingSetterMessage("nombre");
        const regex = /([A-ZÁÉÍÓÚÜ'][a-záéíóúü']+)( [A-ZÁÉÍÓÚÜ'][a-záéíóúü']+)*/;
        if (regex.test(value)) {
            this.#nombre = value; 
        }
    }
    get nombre() { return this.#nombre; }

    set cuatrimestre(value) {
        if (value >= 1 && value <= 11) {
            this.#cuatrimestre = value;
        }
    }
    get cuatrimestre() {
        return this.#cuatrimestre;
    }
    
    set carrera(value) {
        this.#carrera = value;
    }
    get carrera() {
        return this.#carrera;
    }

    set grupo(value) {
        if (value >= 1 && value <= 4) {
            this.#grupo = value;
        }
    }
    get grupo() {
        return this.#grupo;
    }

    set anio(value) {
        if (value >= 2000 && value <= 2024) {
            this.#anio = value;
        }
    }
    get anio() {
        return this.#anio;
    }

    /**
     * @returns {DatosDeUsuario}
     */
    get datos() {
        return {
            id: this.id,
            nombre: this.nombre,
            cuatrimestre: this.cuatrimestre, 
            carrera: this.carrera,
            grupo: this.grupo,
            anio: this.anio,
        };
    }
};


export { Usuario, renameUserDataToEnglish, renameUserDataToSpanish };
