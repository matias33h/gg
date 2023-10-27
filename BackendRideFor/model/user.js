const db=require('../config/config')
const bcrypt=require('bcryptjs')
const util = require('util');
const jwt = require('jsonwebtoken');



const User={};


// voy a agregar un nuevo metodo

User.findById=(id, result)=>{
    // consulta: quiero obtener el id,email,name etc del usuario de la tabla users (WHERE DICE QUE EL ID VA A SER IGUAL A UN PARAMETRO ENTONCES COLOCO SIGNO DE PREGUNTA) esta es la consulta que me va a permitir obtener un usuario por id
    const sql=`
    SELECT
        U.id,
        U.email,
        U.name,
        U.lastname,
        U.phone,
        U.image,
        U.password,
        JSON_ARRAYAGG(
        JSON_OBJECT(
            'id',CONVERT(R.id, char),
            'name',R.name,
            'image',R.image,
            'route',R.route
        )
        
        ) AS roles
    FROM
        users AS U
    INNER JOIN
        user_has_roles AS UHR
    ON 
        UHR.id_user = U.id
    INNER JOIN 
        roles AS R
    ON
        UHR.id_rol = R.id
    WHERE
        U.id=?
    GROUP BY
        U.id
    `;

    // lprimero le paso la consulta (sql)y luego los parametros y lo tercero seria pasarle la funcion que captura el error

    if (typeof result === 'function') {
        db.query(sql, [id], (err, user) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            } else {
                console.log('Usuario obtenido:', user);
                result(null, user); // se utiliza para pasar el resultado de la operación 
            }
        });
    } else {
        // Si result no es una función válida, muestra un mensaje de error
        console.error('Error: "result" no es una función válida.');
        // También puedes lanzar un error o manejarlo de la manera que mejor se adapte a tu aplicación.
    }
}



User.findConductorMen = (result) => {
    const sql = `
    SELECT
        U.id,
        U.email,
        U.name,
        U.lastname,
        U.image,
        U.phone
    FROM
        users AS u
    INNER JOIN
        user_has_roles AS UHR
    ON 
        UHR.id_user = U.id
    INNER JOIN
        roles AS R
    ON
        R.id = UHR.id_rol
    WHERE
        R.id = 2;
    `;

    db.query(
        sql,
        (err, data) => {
            if(err){
                console.log('Error: ' ,err)
                result(err,null)
            }
            else{
                result(null,data) 
            }
        }
    );
}

User.findByEmail=(email,result)=>{
    // consulta: quiero obtener el id,email,name etc del usuario de la tabla users (WHERE DICE QUE EL ID VA A SER IGUAL A UN PARAMETRO ENTONCES COLOCO SIGNO DE PREGUNTA) esta es la consulta que me va a permitir obtener un usuario por id
    const sql=`
    SELECT
        U.id,
        U.email,
        U.name,
        U.lastname,
        U.phone,
        U.image,
        U.password,
        JSON_ARRAYAGG(
        JSON_OBJECT(
            'id', CONVERT(R.id, char),
            'name',R.name,
            'image',R.image,
            'route',R.route
        )
        
        ) AS roles
    FROM
        users AS U
    INNER JOIN
        user_has_roles AS UHR
    ON 
        UHR.id_user = U.id
    INNER JOIN 
        roles AS R
    ON
        UHR.id_rol = R.id
    WHERE
            email=?
    GROUP BY
            U.id
    `;

    // lprimero le paso la consulta (sql)y luego los parametros y lo tercero seria pasarle la funcion que captura el error
    db.query(
        sql,
        [email],
        (err,user) => {
            if(err){
                console.log('Error: ' ,err)
                result(err,null)
            }
            else{
                console.log('Usuario obtenido: ',user[0]);
                result(null,user[0]) 
                // se utiliza para pasar el resultado de la operación 

            }


        }
         



    )
}




// voy a crear metodos para crear un nuevo registro en la tabla usuarios
//   VALUES(?,?,?,?,?,?,?,?)     : ESTOY DEFINIENDO PARAMETROS PARA CADA UNO DE LOS CAMPOS

User.create =async(user,result)=>{

    const hash=await bcrypt.hash(user.password,10)

    const sql=`
        INSERT INTO  
            users(
                email,
                name,
                lastname,
                phone,
                image,
                password,
                created_at,
                updated_at
            )        
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)      
    `;
    // CON EL OBJETO DB QUIERO PASAR UN QUERY EN SQL y tengo que pasar los 8 parametros que hacen referencia a los balores a los campos de mi tabla 

    db.query(

        sql,
        [
            user.email,
            user.name,
            user.lastname,
            user.phone,
            user.image,
            hash,
            new Date(),
            new Date()
        ],
        (err,res) => {
            if(err){
                console.log('Error: ' ,err)
                result(err,null)
            }
            else{
                console.log('Id del nuevo usuario: ', res.insertId);
                result(null,res.insertId) // se utiliza para pasar el resultado de la operación 

            }


        }
        )
}

// metodo update para actualizar  todos los campos 

User.update=(user,result)=>{

    const sql=`
    UPDATE
        users

      SET
        name=?,
        lastname=?,
        phone=?,
        image=?,
        updated_at=?
      where

       id=?

    `;

    db.query(

        sql,
        [
          
            user.name,
            user.lastname,
            user.phone,
            user.image,
            new Date(),
            user.id
        ],
        (err,res) => {
            if(err){
                console.log('Error: ' ,err)
                result(err,null)
            }
            else{
                console.log('Usuario actualizado: ', user.id);
                result(null,user.id) // se utiliza para pasar el resultado de la operación 

            }


        }
        )
}


// es para actualizar solo los campos de perfil sin la imagen 


User.updateWithoutImage = (user, result) => {
    const sql = `
    UPDATE
        users
    SET
        name=?,
        lastname=?,
        phone=?,
        updated_at=?
    WHERE
        id=?
    `;

    db.query(
        sql,
        [
            user.name,
            user.lastname,
            user.phone,
            new Date(),
            user.id
        ],
        (err, res) => {
            if (err) {
                console.log('Error: ', err);
                result(err, null);
            } else {
                console.log('Usuario actualizado: ', user.id);
                result(null, user.id);
            }
        }
    );
}



module.exports=User;