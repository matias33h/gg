module.exports = (io) => {

    const namespace = io.of('/orders/conductor');

    namespace.on('connection', (socket) => {
        console.log('UN CLIENTE SE CONECTO A SOCKET IO -> /orders/conductor');

        socket.on('position', (data) => {
            console.log('CLIENTE EMITIO: ', data);
            namespace.emit(`position/${data.id_order}`, {id_order: data.id_order, lat: data.lat, lng: data.lng})
        })


        socket.on('disconnect', (data) => {
            console.log('UN CLIENTE SE DESCONECTO DE SOCKET IO')
        })
    })

}  