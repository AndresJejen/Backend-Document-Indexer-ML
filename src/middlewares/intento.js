"use strict"

function funcion(req,res,next){
    console.log("Esto es el Middleware")
    next();
}

function funcion2(req,res,next){
    console.log("Middleware2");
    next();
}

module.exports = {funcion,funcion2};