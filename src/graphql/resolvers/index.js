//importaciones temporales
const bcrypt = require('bcryptjs');

//Temporal Modelo
const Doc = require('../../models/docs');
const User = require('../../models/user');


//evitar el ciclo infinito de populate el user -> createddocs -> helper -> createddocs ...
const docu = docsId => {
    return Doc.find({_id : {$in: docsId}})
        .then(docs =>{
            return docs.map(doc =>{
                return { 
                    ...doc._doc, 
                    _id: doc.id, 
                    date: new Date(doc._doc.date).toISOString(),
                    helper: user.bind(this,doc.helper)
                };
            })
        })
        .catch(err => {
            console.error(`Error en consultar eventos de un usuario especifico ${err}`)
            throw err;
        }); 
}

const user = userId =>{
    return User.findById(userId)
        .then(user =>{
            return {
                ...user._doc,
                password: null,
                _id:user.id, 
                documentsadded : docu.bind(this,user.documentsadded)}
        })
        .catch(err => {
            console.error(`Error en consultar Usuario especifico ${err}`)
            throw err;
        });
}

module.exports = {
    docs: ()=>{
        // console.log(Docs);
        return Doc
        .find()
        .then(docs =>{
            return docs.map(doc => {
                return {
                    ...doc._doc, 
                    _id: doc.id,
                    date: new Date(doc._doc.date).toISOString(),
                    helper: user.bind(this, doc._doc.helper)
                }
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
            link: args.docInput.link,
            helper : '5ca988df6c4db63fc8b90855'
        });
        let createddoc;
        return doc
            .save()
            .then( result => {
                createddoc =  {
                    ...result._doc, 
                    _id: result._doc._id.toString()
                    ,helper: user.bind(this, result._doc.helper)
                };
                return User.findById('5ca988df6c4db63fc8b90855');
            })
            .then(user => {
                if (!user){
                    throw new Error('Usuario inexistente.');
                }
                user.documentsadded.push(doc);
                return user.save();
            })
            .then(result => {
                return createddoc;
            })
            .catch(err => {
                console.error(`Error en guarda un nuevo documento ${err}`)
                throw err;
            });
    },
    createUser: (args) =>{

        return User.findOne({email: args.userInput.email })
            .then(user => {
                if (user){
                    throw new Error('Esta Email ya está registrado.');
                }
                return bcrypt.hash(args.userInput.password,12);
            })
            .then( hashedPassword => {
                const user = new User({
                    name: args.userInput.name,
                    email: args.userInput.email,
                    password: hashedPassword,
                    level: args.userInput.level
                });

                return user
                    .save()
                    .then( result => {
                        //console.log(result);
                        return {
                            ...result._doc,
                            password: null, 
                            _id: result.id
                        };
                    })
                    .catch(err => {
                        console.error(`Error en guardar un nuevo usuario ${err}`)
                        throw err;
                    });
            })
            .catch(
                err => {
                    console.error("Error al crear Hash de password",err);
                    throw err;
                }
            );
    }
}