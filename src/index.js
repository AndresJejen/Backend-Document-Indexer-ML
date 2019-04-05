// Dependencias
const express = require('express');                   //Importación framework express
const bodyparser = require('body-parser');            //Parser de Json
const graphQLHttp = require('express-graphql');       //Express + Graphql Middleware
const { buildSchema } = require('graphql');           //COnstructor de schema GraphQL
const mongoose = require('mongoose');                 //Libreria control de Mongo
const config = require('../config');                   //Importa el modulo de configuraciones globales

//valores de app
const app = express();

// MiddleWares
app.use(bodyparser.json());

//Temporal Modelo
const Doc = require('./models/docs');


//rutas
app.use('/graphql',graphQLHttp({
    schema: buildSchema(`
         
        type Doc{
            _id : ID!
            titulo : String!
            name: String!
            author: String!
            mlanguage: String!
            typedoc: String!
            wlanguage: String!
            ilevel: String!
            flevel: String!
            date: String!
            link: String!
        }

        input InputDoc{
            name: String!
            titulo : String!
            author: String!
            mlanguage: String!
            typedoc: String!
            wlanguage: String!
            ilevel: String!
            flevel: String!
            date: String!
            link: String!
        }

        type RootQuery{
            docs: [Doc!]!
        }

        type RootMutation{
            createDoc(docInput: InputDoc) : Doc
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        docs: ()=>{
            // console.log(Docs);
            return Doc
            .find()
            .then(docs =>{
                return docs.map(doc => {
                    return {...doc._doc, _id: doc.id}
                })
            })
            .catch(err => {
                console.error(`Error en consultar todos los documentos ${err}`)
                throw err;
            });
        },
        createDoc: (args) =>{
            const doc = new Doc({
                name: args.docInput.name,
                titulo: args.docInput.titulo,
                author: args.docInput.author,
                mlanguage: args.docInput.mlanguage,
                typedoc: args.docInput.typedoc,
                wlanguage: args.docInput.wlanguage,
                ilevel: args.docInput.ilevel,
                flevel: args.docInput.flevel,
                date: new Date(),
                link: args.docInput.link
            });
            return doc
                .save()
                .then( result => {
                    //console.log(result);
                    return {...result._doc, _id: doc.id};
                })
                .catch(err => {
                    console.error(`Error en guarda un dato ${err}`)
                    throw err;
                });
        }
    },
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



