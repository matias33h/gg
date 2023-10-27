const Address = require('../model/address')

// como voy a subir la imagen voy  a utilizar storage 
// const storage = require('../utils/cloud_storage')

module.exports = {

    findByUser(req,res){
        const id_user= req.params.id_user;

        Address.findByUser(id_user, (err, data) => {
            
            if (err) {
                return res.status(501).json({
                    success: false, //tipo de repuesta porque es una respuesta no exitosa
                    message: 'Hubo un error al tratar de obtener las direcciones ',
                    error: err
                });
            }
            
            return res.status(201).json(data)



        })
    },

    // metodo para almacenar los datos del usuario y imagen
     create(req, res) {

        
        const address= req.body;
        console.log('ADRRESS: ', address)
        //    utilizo el mondelo category para utilizar el metodo create pasandole una categorya 
        Address.create(address, (err, id) => {



            if (err) {
                return res.status(501).json({
                    success: false, //tipo de repuesta porque es una respuesta no exitosa
                    message: 'Hubo un error con el registro de la direccion ',
                    error: err
                })
            }


            //si no hubol un error vamos a retornar una respuesta faborable
            return res.status(201).json({
                success: true, //tipo de repuesta porque es una respuesta exitosa
                message: 'La direccion se creo correctamente',
                data: `${id}` // voy a retornar el id de la categoria
            })





        })
    },

}