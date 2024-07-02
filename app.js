import express from "express";
import userRoutes from "./routes/rutas-de-usuario.js";
import productRoutes from "./routes/rutas-de-producto.js";
import path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filepath = fileURLToPath(import.meta.url);
const __dirname = dirname(__filepath);

const app = express();
const port = process.env.PORT ?? 3_000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/js", express.static(path.join(__dirname, "js")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use("/user", userRoutes);
app.use("/product", productRoutes);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
