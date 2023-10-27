import React, { useState,useEffect, useContext} from 'react';
import { Order } from "../../../../../Domain/entities/Order"
import { GetConductorMenUserUSeCase } from '../../../../../Domain/useCases/user/GetConductorMenUser';
import { User } from '../../../../../Domain/entities/User';
import { UpdateToDispatchedOrderUseCase } from '../../../../../Domain/useCases/order/updateToDispatchOrder';
import { OrderContext } from '../../../../context/OrderContext';

interface DropDownProps {
    label: string,
    value: string
}

 const ClientOrderDetailViewModel = (order:Order) => {

    const [total,setTotal]=useState(0.0)
    const [conductor, setConductor] = useState<User[]>([])
    const [responseMessage, setResponseMessage] = useState('')

    const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState<DropDownProps[]>([])
    const {updateToOnTheWay} = useContext(OrderContext)

   

    const updateToOnTheWayOrder = async () => {
     
       
         const result = await updateToOnTheWay(order);
        setResponseMessage(result.message)
     
        console.log('CONDUCTOR SELECCIONADO: ' + value)
    }
 

    const getTotal = ()=>{

        order.products?.forEach(p => {
           setTotal(total + (p.price * p.quantity!))
        });
    }

    return {
        total,
        conductor,
        open,
        value,
        items,
        setOpen,
        setValue,
        setItems,
        getTotal,
        responseMessage,
        updateToOnTheWayOrder
    }
  }

  export default ClientOrderDetailViewModel