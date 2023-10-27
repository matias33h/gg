// const mysql=require('mysql')


// //Configuracion para conectarme a la base de datos

// const db =mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'m4ti4s25',
//     database:'bd_ridefor'
// })

// db.connect(function(err){
//     if(err) throw err;
//     console.log('Conectado a bd_ridefor')

// })


// module.exports = db;  



const mysql = require('mysql2');

// Configuración para conectarse a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'ridefor'
});

db.connect(function(err) {
  if (err) throw err;
  console.log('Conectado a bd_ridefor');
});

module.exports = db;
