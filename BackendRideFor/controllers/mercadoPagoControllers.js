const mercadopago = require('mercadopago')
const Order = require('../model/order')
const OrderHasProducts = require('../model/order_has_products')


mercadopago.configure({
    sandbox: true,
    access_token: 'TEST-4636253862192345-101214-bee6fb92078df016c66a43080eb723ca-749376662'
})

module.exports = {
    async createPayment(req, res) {

        var payment = req.body;

        console.log('PAYMENT: ', payment);

        const payment_data = {
            token: payment.token,
            issuer_id: payment.issuer_id,
            payment_method_id: payment.payment_method_id,
            transaction_amount: payment.transaction_amount,
            installments: parseInt(payment.installments),
            payer: {
                email: payment.payer.email,
                identification: {
                    type: payment.payer.identification.type,
                    number: payment.payer.identification.number
                },
            } ,
        }

        const data = await mercadopago.payment.create(payment_data).catch((err => {
            
            console.log('Error de mercado pago', err);
            return res.status(501).json({
                success: false, //tipo de repuesta porque es una respuesta no exitosa
                message: 'Error al crear el pago',
                error: err
            })
        }))
            if (data !== undefined && data !== null) {
                console.log('Los datos del cliente son correctos', data.response);

                    const order = payment.order;

                    Order.create(order, async (err, id) => {



                        if (err) {
                            return res.status(501).json({
                                success: false, //tipo de repuesta porque es una respuesta no exitosa
                                message: 'Hubo un error al momento de crear la orden',
                                error: err
                            });
                        }
            
                        for (const product of order.products) {
                            await OrderHasProducts.create(id,product.id,product.quantity,(err,id_data)=>{
                                if (err) {
                                    return res.status(501).json({
                                        success: false, //tipo de repuesta porque es una respuesta no exitosa
                                        message: 'Hubo un error con la creacion de los productos en la orden',
                                        error: err
                                    });
                                }
            
            
                            });
                        }
            
            
            
                        //si no hubol un error vamos a retornar una respuesta faborable
                        return res.status(201).json({
                            success: true, //tipo de repuesta porque es una respuesta exitosa
                            message: 'La orden se ha creado correctamente',
                            data: data.response // voy a retornar el id de la categoria
                        })
            
            
            
            
            
                    })

                }
                else {
                    return res.status(501).json({
                        success: false, //tipo de repuesta porque es una respuesta no exitosa
                        message: 'Error con algun dato en la peticion',
                    })   
                }
                            
                }
            }
