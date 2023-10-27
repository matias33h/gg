import io from 'socket.io-client';

const socket = io('http://172.22.160.1:3000/orders/conductor');
export default socket;