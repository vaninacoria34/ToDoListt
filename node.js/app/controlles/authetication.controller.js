import bcryptjs from "bcryptjs";
import JsonWebToken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const usuarios = [{
    user: "a",
    email: "a@a.com",
    password: "a"
}]


async function login(req,res) {
    console.log(req.body);
    const user = req.body.user;
    const password = req.body.password;    
    if(!user || !password){
        return res.status(400).send({status: "Error", message:"Los campos están incompletos"})
    }
    const usuarioARevisar = usuarios.find(usuario => usuarioARevisar.user === user);
    if(!usuarioARevisar){
        return res.status(400).send({status:"Error",message:"Error durante login"})
    }
    const loginCorrecto = await bcryptjs.compare(password,usuarioARevisar.password);
    if(!loginCorrecto){
        return res.status(400).send({status:"Error",message:"Error durante login"})        
    }
    const token = JsonWebToken.sign(
        {user:usuarioARevisar.user},
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRATION});

        const cookieOption = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            path: "/"
        }
        res.cookie("jwt",token,cookieOption);
        res.send({status:"ok",message:"Usuario logeado"})
}

async function register(req,res) {
    const user = req.body.user;
    const password = req.body.password;
    const email = req.body.email;
    if(!user || !password || !email){
        return res.status(400).send({status: "Error", message:"Los campos están incompletos"})
    }
    const usuarioARevisar = usuarios.find(usuario => usuarioARevisar.user === user);
    if(usuarioARevisar){
       return res.status(400).send({status:"Error",message:"Este usuario ya existe"})
    }
    const salt = await bcryptjs.genSalt(5);
    const hashPassword = await bcryptjs.hash(password,salt);
    const nuevoUsuario ={
        user, email, password: hashPassword
    }
    usuarios.push(nuevoUsuario);
    console.log(usuarios);
    return res.status(201).send({status:"ok",message:'Usuario ${nuevoUsuario.user} agregado', redirect:"/"})
}

export const methods = {
    login,
    register
}