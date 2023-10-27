const { error } = require('console');
const User=require('../model/user');
const Rol=require('../model/rol')
const bcrypt=require('bcryptjs');
const keys=require('../config/keys')
const jwt = require('jsonwebtoken');
const storage=require('../utils/cloud_storage')


// voy a exportar un objeto completo y va a tener metodos

module.exports={
   

    findConductorMen(req, res) {
        User.findConductorMen((err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con al listar los conductores',
                    error: err
                });
            }

            return res.status(201).json(data);
        });
    },


//    async findConductorModal(req, res){
//         try {
//           const [drivers] = await db.query(`
//             SELECT users.name, users.lastname 
//             FROM users
//             INNER JOIN user_has_roles ON users.id = user_has_roles.id_user
//             INNER JOIN roles ON user_has_roles.id_rol = roles.id
//             WHERE roles.name = 'Conductor'
//           `);
      
//           res.json(drivers);
//         } catch (error) {
//           res.status(500).json({ error: error.message });
//         }
//       },


 //    voy a crear un metodo para buscar por id
    login(req,res){
        // lo primero que necesito ees el email y el password

        const email=req.body.email;
        const password=req.body.password;

        // voy a llamar al modelo User con el metodo findbyEmail para buscar por email
        User.findByEmail(email,async(err,myUser)=>{

            console.log("Error",err)
            console.log("usuario",myUser)

            if(err){
                return res.status(501).json({
                        success:false,    //tipo de repuesta porque es una respuesta no exitosa
                        message:'Hubo un error con el registro del usuario ',
                        error:err
                })
            }


            // validacion en caso de que no venga informacion
            //  si no viene la data retornamos el error
            if(!myUser){
                return res.status(401).json({      //el cliente no tiene autorizacion para realizar esta peticion (401)
                    success:false,    //tipo de repuesta porque es una respuesta no exitosa
                    message:'El Email no fue encontrado ',
                    error:err
            })

        }
        
        
        // voy a comparar las contraseñas incriptadas 
        // esta comparando el password del login con el pasword incriptado, cuando me registre
        
        
        //   si es password valido voy a ccrear el token de notificaciones
        const isPasswordValid=await bcrypt.compare(password,myUser.password);
        
            if(isPasswordValid){

                const token=jwt.sign({id:myUser.id,email:myUser.email},keys.secretOrKey,{});

                const data={
                    id:myUser.id,
                    name:myUser.name,
                    lastname:myUser.lastname,
                    email:myUser.email,
                    phone:myUser.phone,
                    image:myUser.image,
                    sesion_token:`JWT ${token}`,
                    roles: myUser.roles
                }



                //si no hubol un error vamos a retornar una respuesta faborable
                
                            return res.status(201).json({
                                success:true,    //tipo de repuesta porque es una respuesta exitosa
                                message:'El usuario fue autenticado',
                                data:data  //aca viene toda la informacio del usuario "en data"       *** tedata es el id del nuevo usuario que se registro 
                            })
            }
            else{
                return res.status(401).json({      //el cliente no tiene autorizacion para realizar esta peticion (401)
                    success:false,    //tipo de repuesta porque es una respuesta no exitosa
                    message:'El password es incorrecto ',
                    error:err
            })
                
            }






         })



    },
   
   
   
   
   
    // es para registrar nuevo usuario

    register(req,res){
            const user=req.body  // de esta manera capturo los datos que me envie el cliente
             User.create(user,(err,data)=>{
                if(err){
                    return res.status(501).json({
                            success:false,    //tipo de repuesta porque es una respuesta no exitosa
                            message:'Hubo un error con el registro del usuario ',
                            error:err
                    })
                }

                //si no hubol un error vamos a retornar una respuesta faborable

                return res.status(201).json({
                    success:true,    //tipo de repuesta porque es una respuesta exitosa
                    message:'El registro del usuario se realizo correctamente',
                    data:data  //data es el id del nuevo usuario que se registro
                })


             })
    },

    async registerWithImage(req, res) {
        const user = JSON.parse(req.body.user);
    
        // para almacenar la imagen 
        // esto son los archivos que me va a enviar los usuarios 
        const files = req.files
        if (files.length > 0) {
            const path = `image_${Date.now()}`;  // nombre con el cual se va a crear el archivo en Firebase el cual no se va a repetir 
            const url = await storage(files[0], path);  // le vamos a enviar la imagen del usuario que está en la posición cero que es la única
    
            if (url != undefined && url != null) {
                // si se cumple la condición al modelo user le vamos a agregar el campo image 
                user.image = url;
            }
        }
    
        User.create(user, async (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }
    
            // en vez de retornar la data que era el id del nuevo usuario que se registro voy
            // a agregarle el id diciéndole que es igual a la data
            user.id = `${data}`;
            const token = jwt.sign({ id: user.id, email: user.email }, keys.secretOrKey, {});
    
            // al usuario le asignamos el token
            user.session_token = `JWT ${token}`;
    
            // Crear los roles 1, 2 y 3 para el usuario
          // Crear los roles 1, 2 y 3 para el usuario
try {
    await Rol.create(user.id, 1, (err, roleId1) => {
        if (err) {
            throw err;
        }
        // Aquí puedes manejar el resultado si es necesario
        console.log('Rol 1 creado con éxito:', roleId1);
    });
    await Rol.create(user.id, 2, (err, roleId2) => {
        if (err) {
            throw err;
        }
        // Aquí puedes manejar el resultado si es necesario
        console.log('Rol 2 creado con éxito:', roleId2);
    });
    await Rol.create(user.id, 3, (err, roleId3) => {
        if (err) {
            throw err;
        }
        // Aquí puedes manejar el resultado si es necesario
        console.log('Rol 3 creado con éxito:', roleId3);
    });
} catch (err) {
    return res.status(501).json({
        success: false,
        message: 'Hubo un error con el registro de los roles de usuario',
        error: err
    });
}
    
            // Si no hubo un error, vamos a retornar una respuesta favorable
            return res.status(201).json({
                success: true,
                message: 'El registro del usuario se realizó correctamente',
                data: user // No voy a retornar el id sino que retornaré el user completo
            });
        });
    },
    
    async updateUserRole(req, res) {
        try {
            const userId = req.body.userId;
            const newRole = req.body.newRole;
    
            console.log('ID del usuario:', userId);
            console.log('Nuevo rol seleccionado:', newRole);
    
            // Obten los roles del usuario
            Rol.findUserRoles(userId, async (err, userRoles) => {
                if (err) {
                    console.log('Error al obtener los roles del usuario:', err);
                    return res.status(500).json({
                        success: false,
                        message: 'Error al obtener los roles del usuario',
                        error: err
                    });
                }
    
                if (!userRoles || userRoles.length === 0) {
                    return res.status(404).json({
                        success: false,
                        message: 'Usuario no tiene roles asignados'
                    });
                }
    
                // Actualiza los roles
                const rolesToUpdate = userRoles.map((role) => {
                    const isActive = role.name === newRole;
                    return { roleName: role.name, isActive };
                });
    
                try {
                    for (const roleToUpdate of rolesToUpdate) {
                        await Rol.updateRoleActiveStatus(userId, roleToUpdate.roleName, roleToUpdate.isActive);
                    }
    
                    console.log('Roles del usuario actualizados con éxito:', rolesToUpdate);
    
                    // Elimina los roles inactivos
                    await Rol.deleteInactiveRoles(userId, rolesToUpdate, (deleteErr, deleteResult) => {
                        if (deleteErr) {
                            console.log('Error al eliminar roles inactivos:', deleteErr);
                            return res.status(500).json({
                                success: false,
                                message: 'Error al eliminar roles inactivos',
                                error: deleteErr
                            });
                        }
                    
                        console.log('Roles inactivos eliminados con éxito:', deleteResult);
                        console.log('Roles del usuario actualizados con éxito:', rolesToUpdate);
                    
                        return res.status(200).json({
                            success: true,
                            message: 'Roles del usuario actualizados y roles inactivos eliminados con éxito',
                            data: rolesToUpdate
                        });
                    });
                } catch (updateError) {
                    console.log('Error al actualizar los roles del usuario:', updateError);
                    return res.status(500).json({
                        success: false,
                        message: 'Error al actualizar los roles del usuario',
                        error: updateError
                    });
                }
            });
        } catch (error) {
            console.error('Error al actualizar el rol del usuario:', error);
            return res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error
            });
        }
    },

async updateWithImage(req,res){
    const user=JSON.parse(req.body.user)  // de esta manera capturo los datos que me envie el cliente




    // para almacenar la imagen 
    // esto son los archivos que me va a enviar los usuarios 
    const files=req.files
    if(files.length>0){
        const path=`image_${Date.now()}`  //nombre con el cual se va a crear el archivoen firebase el cual no se va a repetir 
        const url =await storage(files[0],path)  //le vamos a enviar la imagen del usuario que esta en la poscion cero que es la unica

        if(url !=undefined && url != null){
            // si se cumple la condicion al modelo user le vamos a agrtegar el campo image 

            user.image=url


        }
    }



     User.update(user,(err,data)=>{
  


        if(err){
            return res.status(501).json({
                    success:false,    //tipo de repuesta porque es una respuesta no exitosa
                    message:'Hubo un error con el registro del usuario ',
                    error:err
            })
        }

 
            //si no hubol un error vamos a retornar una respuesta faborable
            return res.status(201).json({
                success:true,    //tipo de repuesta porque es una respuesta exitosa
                message:'El Usuario se actualizo correctamente',
                data:user //no voy a retornar el id sino que retornare el user completo 
            })
    








     })
},



// ES PARA ACTUALIZAR SIN LA IMAGEN 


async updateWithoutImage(req,res){
    const user=req.body // de esta manera capturo los datos que me envie el cliente




     User.updateWithoutImage(user,(err,data)=>{
  


        if(err){
            return res.status(501).json({
                    success:false,    //tipo de repuesta porque es una respuesta no exitosa
                    message:'Hubo un error con el registro del usuario ',
                    error:err
            })
        }

 
            //si no hubol un error vamos a retornar una respuesta faborable
            return res.status(201).json({
                success:true,    //tipo de repuesta porque es una respuesta exitosa
                message:'El Usuario se actualizo correctamente',
                data:user //no voy a retornar el id sino que retornare el user completo 
            })
    








     })
},






}