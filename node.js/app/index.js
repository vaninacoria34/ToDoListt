import express from "express";
import cookieParser from "cookie-parser";

//Fix para__dirname
import path from 'path';
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import {methods as authetication} from "./controlles/authetication.controller.js"
import {methods as authorization} from "./middlewares/authorization.js";


//Server
const app = express();
app.set("port", 3000);
app.listen(app.get("port"));
console.log("Servidor corriendo en puerto", app.get("port"));


//Configuraciones
app.use(express.static(__dirname + "/public"));
app.use(express.json()),
app.use(cookieParser())

//Rutas
app.get("/",authorization.soloPublico,(req,res)=> res.sendFile(__dirname + "/pages/login.html"));
app.get("/register",authorization.soloPublico,(req,res)=> res.sendFile(__dirname + "/pages/register.html"));
app.get("/admin",authorization.soloAdmin,(req,res)=> res.sendFile(__dirname + "/pages/admin/admin.html"));
app.post("/api/login",authetication.login);
app.post("/api/register",authetication.register);