const JwtStrategy =require('passport-jwt').Strategy
const ExtractJwt =require('passport-jwt').ExtractJwt
const Keys = require('./keys')
// const jwt = require('jsonwebtoken');

// voy a instanciar un usuario  que sera el modelo User
const User=require('../model/user')



// module.exports=(passport)=>{
//     let opts={}  // a este objeto le vamos a agregar jwtDFrontRequest
//     opts.jwtFrontRequest= ExtractJwt.fromAuthHeaderWithScheme('jwt'); //indica que se utilizará un esquema de autenticación basado en encabezados Authorization con el prefijo jwt.
//     opts.secretOrKey = Keys.secretOrKey;
//   // se establece con la clave secreta (secretOrKey) obtenida desde el archivo keys.
   
//          // La función de devolución de llamada (jwt_payload, done) se ejecuta cuando se autentica y decodifica un token JWT válido. jwt_payload contiene los datos del token decodificado.
//     passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{      //JwtStrategy es la estrategia de autenticación basada en JWT proporcionada por passport-jwt.  || opts se pasa como opción de configuración para la estrategia.
//     // llamamos al usuario y le decimos que queremos obtener un usuario  por id y el id sera lo que traiga el jwt 
//         User.findById(jwt_payload.id,(err,user)=>{
//             if(err){
//                 return done(err,false)
//             }
//             if(user){
//                 return done(null,user)
//             }
//             else{

//                 return done(null,false)
//             }
//         })


//     }))

// }

module.exports = (passport) => {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = Keys.secretOrKey;
  
    passport.use(
      new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id, (err, user) => {
          if (err) {
            return done(err, false);
          }
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      })
    );
  };
  