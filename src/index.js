// Dependencias
const express = require('express');
const bodyparser = require('body-parser');
const graphQLHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();


// MiddleWares
app.use(bodyparser.json());

//Variable documentos
const Docs = [];


//rutas
app.use('/graphql',graphQLHttp({
    schema: buildSchema(`
         
        type Doc{
            _id : ID!
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
            return Docs;
        },
        createDoc: (args) =>{
            const Doc = {
                _id : Math.random().toString(),
                name: args.docInput.name,
                author: args.docInput.author,
                mlanguage: args.docInput.mlanguage,
                typedoc: args.docInput.typedoc,
                wlanguage: args.docInput.wlanguage,
                ilevel: args.docInput.ilevel,
                flevel: args.docInput.flevel,
                date: args.docInput.date,
                link: args.docInput.link
            };
            Docs.push(Doc);
            return Doc;
        }
    },
    graphiql: true
}));

//Lanzamiento del Servidor

app.listen(3000,()=>{
    console.log(`Servidor corriendo en puerto 3000`)
});