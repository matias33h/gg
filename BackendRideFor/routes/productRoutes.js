
// traigo el controlador de categorias de empresas
const productController=require('../controllers/productControllers')

// voy a traer passport para asegurara las rutas , el cliente de manra obligaria, nos tiene que enviar el token de session

const passport =require('passport')


// voy a exportar un metodo el cual va a recibir un objeto app y un objeto upload  que me vaa permitir subir las imagenes

// metodo para crear categorias 

module.exports=(app,upload)=>{
    app.get('/api/products/findByCategory/:id_category',productController.findByCategory );
    app.post('/api/products/create',upload.array('image', 3),productController.create );
    app.put('/api/products/updateWithImage',upload.array('image',3),productController.updateWithImage )
    app.put('/api/products/update',productController.update)
    app.delete('/api/products/delete/:id',productController.delete )
    // app.post('/api/empresas/create',passport.authenticate('jwt',{session:false}),upload.array('image',1),categoriesController.create )
}
