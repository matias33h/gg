import React,{useState, useContext, useEffect} from 'react'
import { GetByStatusOrderUseCase } from '../../../../../Domain/useCases/order/GetByStatusOrder'
import { Order } from '../../../../../Domain/entities/Order'
import { OrderContext } from '../../../../context/OrderContext'
import { UserContext } from '../../../../context/UserContext'
import { GetByConductorAndStatusOrderUseCase } from '../../../../../Domain/useCases/order/GetByConductorAndStatusOrder'



const ConductorOrderListViewModel = () => {
  
  // const [orders,setOrders]=useState<Order[]>([])
  const {ordersDispatched, ordersConductor, ordersOnTheWay, ordersPayed, getOrdersByConductorAndStatus} = useContext(OrderContext)
  const {user} = useContext(UserContext)




  const getOrders = async( idConductor: string, status:string)=>{
  

    const result= await getOrdersByConductorAndStatus( idConductor, status );
  
    // setOrders(result)
    console.log('ORDENES' + JSON.stringify(result,null,3))
  }

  return {
    ordersDispatched,
    ordersConductor,
    ordersOnTheWay,
    ordersPayed,
    user,
    getOrders,
  }
}

export default ConductorOrderListViewModel