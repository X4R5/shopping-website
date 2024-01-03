var {expressjwt: jwt} = require('express-jwt');
require('dotenv').config();

const jwtCheck = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    // isRevoked: isRevoked,
    getToken: (req) => {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            // Authorization: Bearer <token>
            // return req.headers.authorization.split(' ')[1];
            return req.headers.authorization.split(' ')[1];
        }
        return null;
    }
}).unless({path: ['/api/users/login', '/api/users/register', 
{url: '/api/products' , methods: ['GET']}]});   

// async function isRevoked(req, payload, done) {
//     if (!payload.isAdmin) {
//         done(null, true);
//     }
//     done();
// }

module.exports = jwtCheck;