
// traigo el controlador de categorias de empresas
const categoriesController=require('../controllers/categoriesController')

// voy a traer passport para asegurara las rutas , el cliente de manra obligaria, nos tiene que enviar el token de session

const passport =require('passport')


// voy a exportar un metodo el cual va a recibir un objeto app y un objeto upload  que me vaa permitir subir las imagenes

// metodo para crear categorias 

module.exports=(app,upload)=>{
    app.get('/api/categories/getAll',categoriesController.getAll )
    app.get('/api/categories/findByUser/:id_user',categoriesController.findByUser )
    app.post('/api/categories/create',upload.array('image',1),categoriesController.create )
    app.put('/api/categories/updateWithImage',upload.array('image',1),categoriesController.updateWithImage )
    app.put('/api/categories/update',categoriesController.update)
    app.delete('/api/categories/delete/:id',categoriesController.delete )
    // app.post('/api/empresas/create',passport.authenticate('jwt',{session:false}),upload.array('image',1),categoriesController.create )
}
