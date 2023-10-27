const express=require('express');
const app=express();
const http=require('http')
const server =http.createServer(app)
const morgan=require('morgan')
const cors=require('cors')
const passport=require('passport')
const multer=require('multer')
const io = require('socket.io')(server);
const mercadopago = require('mercadopago')


mercadopago.configure({
    sandbox: true,
    access_token: 'TEST-4636253862192345-101214-bee6fb92078df016c66a43080eb723ca-749376662'
})
//Importaremos sockets

const ordersSocket = require('./sockets/ordersScoket');


// voy a importar todas las rutas
// *******
const usersRoutes=require('./routes/userRoutes')
const empresasRoutes=require('./routes/categoryRoutes');
const productRoutes=require('./routes/productRoutes');
const addressRoutes=require('./routes/addressRoutes');
const ordersRoutes=require('./routes/orderRoutes');
const mercadoPagoRoutes=require('./routes/mercadoPagoRoutes');
// const modalConductor=require('./routes/modalConductor')
// const driversRouter = require('./routes/modalConductor');

// ********



const port=process.env.PORT || 3000;
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors());
// metodos 
app.use(passport.initialize())
app.use(passport.session())


// vamos a ejecutar la funcion pasandole ese objeto passport
require('./config/passport')(passport)

app.disable('x-powered-by')  //configuracion para la seguridad



app.set('port',port);


//LLAMADO A LOS SOCKETS
ordersSocket(io);

const upload = multer({
    storage:multer.memoryStorage()
})


// llamado a las rutas *******************

// la ruta recibe un parametro que es la apliccion app
usersRoutes(app,upload);
empresasRoutes(app,upload);
addressRoutes(app);
productRoutes(app,upload);
ordersRoutes(app);
mercadoPagoRoutes(app)
// app.use('/api', driversRouter);





server.listen(3000,'192.168.217.234' || 'localhost', function(){

    console.log('aplicacion de Node.js iniciada en el puerto  ' + port )

})

app.get('/',(req,res)=>{

res.send('ruta raiz del backend')

})

app.get('/test',(req,res)=>{

res.send('esta es la ruta test')

})

// manejo de error  

app.use((err,req,res,next)=>{
    console.log(err)
    res.status(err.status || 500).send(err.stack)


})



