import { Router } from "express";
import { Usuario } from "../classes/usuario.js";

import { ControladorDeUsuario } from "../bd/controlador-de-usuario.js";

import { renameUserDataToSpanish } from "../classes/usuario.js";

const route = Router();

route.get("/", (request, response) => {
    response.render("formulario");
});

route.get("/add", (request, response) => {
    response.render("formulario");
});

route.post("/add", async (request, response) => {
    console.log(request.body);
    const usuario = new Usuario(request.body);

    console.log(usuario.datos);
    if (Object.entries(usuario.datos).every(([ key, value ]) => key == "id" || value !== undefined)) {
        const controladorDeUsuario = new ControladorDeUsuario();
        
        controladorDeUsuario
            .insertar(usuario)
            .then(() => {
                response.render("mostrar-datos", { user: request.body });
            })
            .catch(() => {
                response.render("error");
            })
        ;
    } else {
        response.render("error");
    }
});

route.get("/show", async (request, response) => {
    const controladorDeUsuario = new ControladorDeUsuario();
    let usuarios = await controladorDeUsuario.obtenerUsuarios();

    response.render("mostrar-usuarios", { usuarios });
});

route.get("/edit/:id", async (request, response) => {
    const controladorDeUsuario = new ControladorDeUsuario();
    const usuario = await controladorDeUsuario.buscarUsuarioPorId(request.params.id);

    response.render("editar-usuario", { usuario });
});

route.post("/edit", async (request, response) => {
    const controladorDeUsuario = new ControladorDeUsuario();
    
    await controladorDeUsuario.editarUsuario(renameUserDataToSpanish(request.body));
    
    response.redirect("/user/show");
});

route.get("/delete/:id", async (request, response) => {
    const controladorDeUsuario = new ControladorDeUsuario();
    await controladorDeUsuario.eliminarUsuario(request.params.id);
    response.redirect("/user/show");
});

export default route;
