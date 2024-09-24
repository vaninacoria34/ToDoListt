import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { usuarios } from "../controlles/authetication.controller.js";

dotenv.config();

function soloAdmin(req,rest,next){
    const logueado = revisarCookie(req);
    if(logueado) return next();
    return rest.redirect("/")
}

function soloPublico(req,rest,next){
    const logueado = revisarCookie(req);
    if(!logueado) return next();
    return rest.redirect("/admin")
}

function revisarCookie(req){
    try {
    const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startswith("jwt=")).slice(4);
    const decodificada = jsonwebtoken.verifi(cookieJWT,process.env.JWT_SECRET);
    console.log(decodificada)
    const usuarioARevisar = usuarios.find(usuario => usuarioARevisar.user === decodificada.user);
    console.log(usuarioARevisar)
    if(usuarioARevisar){
        return false
    }
    return true
    } 
    catch{
        return false;
    }
}

export const methods = {
    soloAdmin,
    soloPublico,
}