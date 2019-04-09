//importaciones temporales
const bcrypt = require('bcryptjs');

//Temporal Modelo
const Doc = require('../../models/docs');
const User = require('../../models/user');
const Consult = require('../../models/docsconsultados');


//evitar el ciclo infinito de populate el user -> createddocs -> helper -> createddocs ...

const singleDoc = async docId =>{
    try {
        const doc = await Doc.findById(docId);
        return {
            ...doc._doc,
            _id: doc.id,
            helper: user.bind(this,doc.helper)
        };
    } catch (err) {
        console.error(`Error en consultar un documento especifico ${err}`)
        throw err;
    }
}

const docu = async docsId => {
    try{
        const docs = await Doc.find({_id : {$in: docsId}});
        return docs.map(doc =>{                                    //remember alert from video
                return { 
                    ...doc._doc, 
                    _id: doc.id, 
                    date: new Date(doc._doc.date).toISOString(),
                    helper: user.bind(this,doc.helper)
                };
            })
    }
    catch (err){
        console.error(`Error en consultar documentos de un usuario especifico ${err}`)
        throw err;
    }; 
}

const user = async userId =>{
    try{
        const user = await User.findById(userId);
            return {
                ...user._doc,
                password: null,
                _id:user.id, 
                documentsadded : docu.bind(this,user.documentsadded)}
    }
    catch(err) {
        console.error(`Error en consultar Usuario especifico ${err}`)
        throw err;
    };
}

module.exports = {
    docs: async ()=>{                                                   //Resolver query docs
        try{
            const docs = await Doc.find();
            return docs.map(doc => {
                return {
                    ...doc._doc, 
                    _id: doc.id,
                    date: new Date(doc._doc.date).toISOString(),
                    helper: user.bind(this, doc._doc.helper)
                };
            });
        }
        catch(err) {
            console.error(`Error en consultar todos los documentos ${err}`)
            throw err;
        };
    },
    //Find all Documents consulted
    docconsulted: async () =>{
        try {
            const consults =  await Consult.find();
            return consults.map(consult => {
                return{
                    ...consult._doc,
                    _id: consult.id,
                    user: user.bind(this,consult._doc.user),
                    doc: singleDoc.bind(this,consult._doc.doc),
                    CreatedAt: new Date(consult._doc.createdAt).toISOString(),
                    UpdatedAt: new Date(consult._doc.updatedAt).toISOString()
                }
            });     
        } catch (err) {
            console.error(`Error en documentos consultados ${err}`)
            return {"Error": 'Error en documentos consultados ' + err};
            throw err;
        }
    },
    createDoc: async (args) =>{                                     // Resolver create a new Doc 
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
            helper : '5caa64d94c22f22c601627b6'
        });
        let createddoc;
        try{
            const result = await doc.save();
            createddoc =  {
                ...result._doc, 
                _id: result._doc._id.toString()
                ,helper: user.bind(this, result._doc.helper)
            };
            const helper = await User.findById('5caa64d94c22f22c601627b6');
            if (!helper){
                throw new Error('Usuario inexistente.');
            }
            helper.documentsadded.push(doc);
            
            await helper.save();

            return createddoc;
        }
        catch(err) {
            console.error(`Error en guarda un nuevo documento ${err}`)
            throw err;
        };
    },
    createUser: async (args) =>{                                                //Resolver Create a new User
        try{
            const Existinguser = await User.findOne({email: args.userInput.email });
            if (Existinguser){
                throw new Error('Esta Email ya está registrado.');
            }

            const hashedPassword = await bcrypt.hash(args.userInput.password,12);

            const helper = new User({
                name: args.userInput.name,
                email: args.userInput.email,
                password: hashedPassword,
                level: args.userInput.level
            });

            const result = await helper.save();
                            
            return {
                ...result._doc,
                password: null, 
                _id: result.id
            };
        }    
        catch(err) {
            console.error(`Error en guardar un nuevo usuario ${err}`)
            throw err;
        };
   },
   docconsult: async args =>{
       const fetchedDoc = await Doc.findOne({_id: args.DocId});
       const consult = new Consult({
           user: '5caa64d94c22f22c601627b6',
           doc: fetchedDoc
       });
       const result = await consult.save();
       return {
            ...result._doc,
            _id: result.id,
            user: user.bind(this,result._doc.user),
            doc: singleDoc.bind(this,result._doc.doc),
            CreatedAt: new Date(result._doc.createdAt).toISOString(),
            UpdatedAt: new Date(result._doc.updatedAt).toISOString()
       }
   }
};