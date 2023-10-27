const Product = require('../model/product')
const storage = require('../utils/cloud_storage')
const asyncForEach = require('../utils/async_foreach')

module.exports = {

      findByCategory(req,res){
        // voy a resibir un parametro el error o  la data

        const id_category = req.params.id_category;

        Product.findByCategory(id_category, (err, data)=>{
            if (err) {
                return res.status(501).json({
                    success: false, //tipo de repuesta porque es una respuesta no exitosa
                    message: 'Hubo un error al listar eñ Perfil de Empresa  ',
                    error: err
                })
            }

           return res.status(201).json(data);  //rtetorno la lista de pérfil de empresas

        })
    },

        create (req, res) {
           
           
            const product=JSON.parse(req.body.product)  // de esta manera capturo los datos que me envie el cliente

            const files=req.files

            var inserts = 0;

            if (files.length === 0) {
                return res.status(501).json({
                    success:false,    //tipo de repuesta porque es una respuesta no exitosa
                    message:'Hubo un error con el registro del conductor ',
            })
            }
            else {
                Product.create(product,(err, id_product)=>{
    
                    if(err){
                        return res.status(501).json({
                                success:false,    //tipo de repuesta porque es una respuesta no exitosa
                                message:'Hubo un error con el la actualizaciom del producto ',
                                error:err
                        })
                    }

                    product.id = id_product;

                    const start = async () => {
                        await asyncForEach(files, async (file) => {
                            const path=`image_${Date.now()}`  //nombre con el cual se va a crear el archivoen firebase el cual no se va a repetir 
                            const url = await storage(file,path)  //le vamos a enviar la imagen del usuario que esta en la poscion cero que es la unica
                
                            if(url !=undefined && url != null){
                              

                                if (inserts == 0) {
                                    product.image1 = url;
                                }
                                else if (inserts == 1) {
                                    product.image2 = url;
                                }
                                else if (inserts == 2) {
                                    product.image3 = url;
                                }
                            }

                            await Product.update(product, (err, data) => {
                                if(err){
                                    return res.status(501).json({
                                            success:false,    //tipo de repuesta porque es una respuesta no exitosa
                                            message:'Hubo un error con el actualizacion del producto ',
                                            error:err
                                    })
                                }

                                inserts = inserts +1;

                                if (inserts == files.length) {
                                    return res.status(201).json({
                                        success:true,    //tipo de repuesta porque es una respuesta exitosa
                                        message:'El registro del conductor se actualizo correctamente',
                                        data: data //no voy a retornar el id sino que retornare el user completo 
                                    })
                                }
                            });
                        })
                    }

                    start()
    
                 
    
                 })
            }
        },


        update(req, res) {
            const product = req.body;

            Product.update(product, (err, data) => {
                
                
                if(err){
                    return res.status(501).json({
                            success:false,    //tipo de repuesta porque es una respuesta no exitosa
                            message:'Hubo un error con el registro del producto ',
                            error:err
                    })
                }

                return res.status(201).json({
                    success:true,    //tipo de repuesta porque es una respuesta exitosa
                    message:'El registro del conductor se actualizo correctamente',
                    data: data //no voy a retornar el id sino que retornare el user completo 
                })
            })
        },

        updateWithImage(req, res) {
            const product=JSON.parse(req.body.product)  // de esta manera capturo los datos que me envie el cliente

            const files=req.files

            var inserts = 0;

            if (files.length === 0) {
                return res.status(501).json({
                    success:false,    //tipo de repuesta porque es una respuesta no exitosa
                    message:'Hubo un error con el registro del conductor ',
            })
            }
            else {
                Product.update(product,(err, id_product)=>{
    
                    if(err){
                        return res.status(501).json({
                                success:false,    //tipo de repuesta porque es una respuesta no exitosa
                                message:'Hubo un error con el registro del producto ',
                                error:err
                        })
                    }

                    product.id = id_product;

                    const start = async () => {
                        await asyncForEach(files, async (file) => {
                            const path=`image_${Date.now()}`  //nombre con el cual se va a crear el archivoen firebase el cual no se va a repetir 
                            const url = await storage(file,path)  //le vamos a enviar la imagen del usuario que esta en la poscion cero que es la unica
                
                            if(url !=undefined && url != null){
                              

                                if (inserts == 0) {
                                    product.image1 = url;
                                }
                                else if (inserts == 1) {
                                    product.image2 = url;
                                }
                                else if (inserts == 2) {
                                    product.image3 = url;
                                }
                            }

                            await Product.update(product, (err, data) => {
                                if(err){
                                    return res.status(501).json({
                                            success:false,    //tipo de repuesta porque es una respuesta no exitosa
                                            message:'Hubo un error con el registro del producto ',
                                            error:err
                                    })
                                }

                                inserts = inserts +1;

                                if (inserts == files.length) {
                                    return res.status(201).json({
                                        success:true,    //tipo de repuesta porque es una respuesta exitosa
                                        message:'El registro del conductor se realizo correctamente',
                                        data: data //no voy a retornar el id sino que retornare el user completo 
                                    })
                                }
                            });
                        })
                    }

                    start()
    
                 
    
                 })
            }
        },
        
        



        delete(req,res){
            // voy a resibir un parametro el error o  la data
    
            const id = req.params.id;
    
            Product.delete(id, (err, id)=>{
                if (err) {
                    return res.status(501).json({
                        success: false, //tipo de repuesta porque es una respuesta no exitosa
                        message: 'Hubo un error al eliminar eñ Perfil de Empresa  ',
                        error: err
                    })
                }
    
               return res.status(201).json({
                success: true,
                message: 'El producto se elimino',
                data: `${id}`
               });  //rtetorno la lista de pérfil de empresas
    
            });
        },

}