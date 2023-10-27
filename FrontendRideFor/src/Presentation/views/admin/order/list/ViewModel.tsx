import React,{useState, useContext} from 'react'
import { GetByStatusOrderUseCase } from '../../../../../Domain/useCases/order/GetByStatusOrder'
import { Order } from '../../../../../Domain/entities/Order'
import { OrderContext } from '../../../../context/OrderContext'



export const AdminOrderListViewModel = () => {
  
  // const [orders,setOrders]=useState<Order[]>([])
  const {ordersDispatched, ordersConductor, ordersOnTheWay, ordersPayed, getOrdersByStatus} = useContext(OrderContext)

  const getOrders = async(status:string)=>{
    
    const result= await getOrdersByStatus(status);
    // setOrders(result)
    console.log('ORDENES' + JSON.stringify(result,null,3))
  }

  return {
    ordersDispatched,
    ordersConductor,
    ordersOnTheWay,
    ordersPayed,
    getOrders
  }
}

export default AdminOrderListViewModel