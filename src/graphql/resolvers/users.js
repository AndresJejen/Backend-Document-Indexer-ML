//importaciones temporales
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Modelos de datos
const User = require('../../models/user');

//Configuraciones
const { JWTSECRET } = require('../../../config');                   //Importa el modulo de configuraciones globales

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
   },
   login: async ({email,password})=>{
        const user = await User.findOne({email: email});
        if(!user){
            throw new Error('User does not exist!');
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if(!isEqual){
            throw new Error('Password incorrect!');
        }
        const token = jwt.sign({userId: user.id, email: user.email},JWTSECRET,{
            expiresIn: '2h'
        });
        return {
            userId : user.id,
            token : token,
            tokenExpiration : 2
        }
   }
};