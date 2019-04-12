//importaciones temporales
const bcrypt = require('bcryptjs');

//Modelos de datos
const User = require('../../models/user');

module.exports = {
    //Resolver Create a new User
    createUser: async (args) =>{                                                
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
   }
};