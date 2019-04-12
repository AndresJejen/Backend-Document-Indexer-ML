// Dependencias
const express = require('express');                   //Importación framework express
const bodyparser = require('body-parser');            //Parser de Json
const graphQLHttp = require('express-graphql');       //Express + Graphql Middleware
const mongoose = require('mongoose');                 //Libreria control de Mongo

//Importa el modulo de configuraciones globales
const config = require('../config');                   

//schemas y resolvers GraphQL
const GraphQLschemas = require('./graphql/schemas');
const GraphQLresolvers = require('./graphql/resolvers');

//valores de app
const app = express();

// MiddleWares
app.use(bodyparser.json());
const isAuth = require('./middlewares/is_Auth');
app.use(isAuth);

//rutas
app.use('/api',graphQLHttp({
    schema: GraphQLschemas,
    rootValue: GraphQLresolvers,
    graphiql: true
}));

//const uri = 'mongodb://127.0.0.1:27017/Pagina';
const uri = `${config.MONGODB_HEAD}${config.MONGODB_USER}:${config.MONGODB_PASSWORD}@${config.MONGODB_SERVER}/${config.MONGODB_DB}?retryWrites=true`;

//Conexion Base de datos y lanzamiento del servidor
mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => {
        //Lanzamiento del Servidor
        app.listen(3000,()=>{
            console.log(`Servidor corriendo en puerto 3000`)
        });
        console.log('Connection to MongoDbAtlas successful OK')       
    })
  .catch((err) => console.error(err));



