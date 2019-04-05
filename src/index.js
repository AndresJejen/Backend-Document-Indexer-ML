// Dependencias
const express = require('express');
const bodyparser = require('body-parser');
const graphQLHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();


// MiddleWares
app.use(bodyparser.json());

//rutas

app.use('/graphql',graphQLHttp({
    schema: buildSchema(`
        type RootQuery{
            events: [String!]!
        }

        type RootMutation{
            createEvent(name: String) : String
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: ()=>{
            return ['Evento 1','Evento 2','Evento 3'];
        },
        createEvent: (args) =>{
            const eventName = args.name;
            return eventName;
        }
    },
    graphiql: true
}));

//Lanzamiento del Servidor

app.listen(3000,()=>{
    console.log(`Servidor corriendo en puerto 3000`)
});