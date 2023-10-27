import axios from 'axios';

const ApiMercadoPago = axios.create({
    baseURL: 'https://api.mercadopago.com/v1',
    headers: {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer TEST-4636253862192345-101214-bee6fb92078df016c66a43080eb723ca-749376662'
    }
})

export { ApiMercadoPago} 