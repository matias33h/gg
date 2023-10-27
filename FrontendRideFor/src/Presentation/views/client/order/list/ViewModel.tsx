import React,{useState, useContext, useEffect} from 'react'
import { GetByStatusOrderUseCase } from '../../../../../Domain/useCases/order/GetByStatusOrder'
import { Order } from '../../../../../Domain/entities/Order'
import { OrderContext } from '../../../../context/OrderContext'
import { UserContext } from '../../../../context/UserContext'



export const ClientOrderListViewModel = () => {
  
  // const [orders,setOrders]=useState<Order[]>([])
  const {ordersDispatched, ordersConductor, ordersOnTheWay, ordersPayed, getOrdersByClientAndStatus} = useContext(OrderContext)
  const {user, saveUserSession, getUserSession} = useContext(UserContext)




  const getOrders = async (idClient: string, status: string) => {
    // console.log('Calling getOrders with idClient:', idClient, 'and status:', status);
    const result = await getOrdersByClientAndStatus(idClient, status);
    // console.log('Orders result:', JSON.stringify(result, null, 3));
    // setOrders(result)
    
    
};

  return {
    ordersDispatched,
    ordersConductor,
    ordersOnTheWay,
    ordersPayed,
    user,
    getUserSession,
    getOrders,
  }
}

export default ClientOrderListViewModel