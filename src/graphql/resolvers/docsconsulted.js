//Modelos de datos
const Consult = require('../../models/docsconsultados');
const Doc = require('../../models/docs');

//Helpers
const { dateToString } = require('../../helpers/date');

//
const { transformConsulted } = require('./merge');

module.exports = {
    //Find all Documents consulted
    docconsulted: async () =>{
        try {
            const consults =  await Consult.find();
            return consults.map(consult => {
                return transformConsulted(consult);
            });     
        } catch (err) {
            console.error(`Error en documentos consultados ${err}`)
            throw err;
        }
    },
   // Crear nueva consulta de un documento
   docconsult: async args =>{
       const fetchedDoc = await Doc.findOne({_id: args.DocId});
       const consult = new Consult({
           user: '5caa64d94c22f22c601627b6',
           doc: fetchedDoc
       });
       const result = await consult.save();
       return transformConsulted(result);
   }
};