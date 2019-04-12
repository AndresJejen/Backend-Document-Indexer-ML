"use strict"
//Dependencias
const jwt = require('jsonwebtoken');

//Configuracion
const { JWTSECRET } = require('../../config');

module.exports = (req,res,next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader){
        req.isAuth = false;
        return next();
    }
    const token = authHeader.split(' ')[1];  //Bearer  Token value
    if(!token || token === ''){
        req.isAuth = false;
        return next();
    }

    let decodedToken; 
    try {
        decodedToken = jwt.verify(token, JWTSECRET);
    } catch (err) {
        console.error(`Ocurrió un erro al verificar el token: ${err}`);
        req.isAuth = false;
        return next();
    }

    if(!decodedToken){
        req.isAuth = false;
        return next();
    }

    req.isAuth = true;
    req.userId = decodedToken.userId;
    return next();
}