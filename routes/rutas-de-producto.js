import { Router } from "express";
import { Usuario } from "../classes/usuario.js";

import { ControladorDeUsuario } from "../bd/controlador-de-usuario.js";

import { renameUserDataToSpanish } from "../classes/usuario.js";
import { ControladorDeProducto } from "../bd/producto.js";

const route = Router();

route.get("/", (request, response) => {
    response.render("producto/registrar-producto");
});

route.get("/add", (request, response) => {
    response.render("producto/registrar-producto");
});


route.post("/add", async (request, response) => {
    console.log(request.body);

    const controladorDeProducto = new ControladorDeProducto();
    controladorDeProducto.insertar(request.body);

    response.redirect("/product/show");

    // const usuario = new Usuario(request.body);

    // console.log(usuario.datos);
    // if (Object.entries(usuario.datos).every(([ key, value ]) => key == "id" || value !== undefined)) {
    //     const controladorDeUsuario = new ControladorDeUsuario();
        
    //     controladorDeUsuario
    //         .insertar(usuario)
    //         .then(() => {
    //             response.render("mostrar-datos", { user: request.body });
    //         })
    //         .catch(() => {
    //             response.render("error");
    //         })
    //     ;
    // } else {
    //     response.render("error");
    // }
});

route.get("/show", async (request, response) => {
    const controladorDeProducto = new ControladorDeProducto();
    let productos = await controladorDeProducto.obtenerTodos();

    response.render("producto/mostrar-producto", { productos });
});


route.get("/edit/:id", async (request, response) => {
    const controladorDeProducto = new ControladorDeProducto();
    const producto = await controladorDeProducto.buscarPorId(request.params.id);

    response.render("producto/editar-producto", { producto });
});

route.post("/edit", async (request, response) => {
    const controladorDeProducto = new ControladorDeProducto();
    
    await controladorDeProducto.editar(request.body);
    
    response.redirect("/product/show");
});

route.get("/delete/:id", async (request, response) => {
    const controladorDeProducto = new ControladorDeProducto();
    await controladorDeProducto.eliminar(request.params.id);
    response.redirect("/product/show");
});

export default route;
