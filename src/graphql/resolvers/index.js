//Resolvers 
const docsResolver = require('./docs');
const consultsResolver = require('./docsconsulted');
const usersResolver = require('./users');

const rootResolver = {
    ...usersResolver,
    ...docsResolver,
    ...consultsResolver
};

module.exports = rootResolver;


