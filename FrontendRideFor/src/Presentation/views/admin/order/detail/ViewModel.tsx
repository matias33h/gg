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

 const AdminOrderDetailViewModel = (order:Order) => {

    const [total,setTotal]=useState(0.0)
    const [conductor, setConductor] = useState<User[]>([])
    const [responseMessage, setResponseMessage] = useState('')

    const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState<DropDownProps[]>([])
    const {updateToDispatched} = useContext(OrderContext)

    useEffect(() => {
        setDropDownItems();
    }, [conductor])


    const dispatchOrder = async () => {
        if (value !== null) {
        order.id_conductor = value!
            const result = await updateToDispatched(order);
            setResponseMessage(result.message)
        }
        else {
            setResponseMessage('Selecciona el conductor')
        }
        console.log('CONDUCTOR SELECCIONADO: ' + value)
    }
 
    const setDropDownItems = () => {
        let itemsConductor: DropDownProps[] = [];
        conductor.forEach(conductor => {
            itemsConductor.push({
                label: conductor.name + ' ' + conductor.lastname,
                value: conductor.id!
            })
        });
        setItems(itemsConductor)
    }

    const getConductores = async () => {
        const result = await GetConductorMenUserUSeCase();
        console.log('CONDUCTORES: ' + JSON.stringify(result,null, 3))
        setConductor(result)
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
        getConductores,
        dispatchOrder
    }
  }

  export default AdminOrderDetailViewModel