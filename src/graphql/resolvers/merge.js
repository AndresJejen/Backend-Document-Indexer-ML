const {dateToString} = require('../../helpers/date');

const User = require('../../models/user');
const Doc = require('../../models/docs');

//Función de retorno a GraphQl 
//documentos
const transformDoc = doc =>{
    return { 
        ...doc._doc, 
        _id: doc.id, 
        date: dateToString(doc._doc.date),
        helper: user.bind(this,doc.helper)
    };
};

//Docs consulted
const transformConsulted = consult =>{
    return {
        ...consult._doc,
        _id: consult.id,
        user: user.bind(this,consult._doc.user),
        doc: singleDoc.bind(this,consult._doc.doc),
        CreatedAt: dateToString(consult._doc.createdAt),
        UpdatedAt: dateToString(consult._doc.updatedAt)
   }
};

const user = async userId =>{
    try{
        console.log('Consulta en P_user bind');
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

const singleDoc = async docId =>{
    try {
        console.log('Consulta en singleDoc bind');
        const doc = await Doc.findById(docId);
        return transformDoc(doc);
    } catch (err) {
        console.error(`Error en consultar un documento especifico ${err}`)
        throw err;
    }
}

//Retornar los todos documentos - i.e. propagate alternative
const docu = async docsId => {
    console.log('Consulta en docu bind');
    try{
        const docs = await Doc.find({_id : {$in: docsId}});
        return docs.map(doc =>{                                    
            return transformDoc(doc);
            })
    }
    catch (err){
        console.error(`Error en consultar documentos de un usuario especifico ${err}`)
        throw err;
    }; 
}

// exports.user = user;
// exports.singleDoc = singleDoc;
// exports.docu = docu;
exports.transformDoc = transformDoc;
exports.transformConsulted = transformConsulted;