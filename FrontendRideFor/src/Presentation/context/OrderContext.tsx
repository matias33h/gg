import { Order } from '../../Domain/entities/Order';
import { ResponseApiDelivery } from '../../Data/sources/remote/models/ResponseApiDelivery';
import { Children, createContext, useState, useEffect } from 'react';
import { GetByStatusOrderUseCase } from '../../Domain/useCases/order/GetByStatusOrder';
import { UpdateToDispatchedOrderUseCase } from '../../Domain/useCases/order/updateToDispatchOrder';
import { GetByConductorAndStatusOrderUseCase } from '../../Domain/useCases/order/GetByConductorAndStatusOrder';
import { UpdateToOnTheWayOrderUseCase } from '../../Domain/useCases/order/updateToOnTheWayOrder';
import { UpdateToConductorOrderUseCase } from '../../Domain/useCases/order/updateToConductorOrderUseCase';
import { GetByClientAndStatusOrderUseCase } from '../../Domain/useCases/order/GetByClientAndStatusOrder';

export interface OrderContextProps {
    ordersPayed: Order[],
    ordersDispatched: Order[],
    ordersOnTheWay: Order[],
    ordersConductor: Order[],
    getOrdersByStatus(status: string): Promise<void>,
    getOrdersByConductorAndStatus(idConductor: string, status: string): Promise<void>,
    getOrdersByClientAndStatus(idClient: string, status: string): Promise<void>,
    updateToDispatched(order: Order): Promise<ResponseApiDelivery>,
    updateToOnTheWay(order: Order): Promise<ResponseApiDelivery>,
    updateToConductor(order: Order): Promise<ResponseApiDelivery>,
}

export const OrderContext = createContext({} as OrderContextProps);

export const OrderProvider = ({children}: any) => {

    const [ordersPayed, setOrdersPayed] = useState<Order[]>([]);
    const [ordersDispatched, setOrdersDispatched] = useState<Order[]>([]);
    const [ordersOnTheWay, setOrdersOnTheWay] = useState<Order[]>([]);
    const [ordersConductor, setOrdersConductor] = useState<Order[]>([]);

    useEffect(() => {
        setOrdersPayed([]);
        setOrdersDispatched([]);
        setOrdersOnTheWay([]);
        setOrdersConductor([]);
    }, [])
    

    const getOrdersByStatus = async (status: string) => {
        const result = await GetByStatusOrderUseCase(status);
        if (status === 'PAGADO') {
            setOrdersPayed(result);
        }
        else if (status === 'DESPACHADO') {
            setOrdersDispatched(result);
        }
        else if (status === 'EN CAMINO') {
            setOrdersOnTheWay(result);
        }
        else if (status === 'ENTREGADO') {
            setOrdersConductor(result);
        }
    }
    
    const getOrdersByConductorAndStatus = async (idConductor: string, status: string) => {
        const result = await GetByConductorAndStatusOrderUseCase(idConductor, status);
        if (status === 'PAGADO') {
            setOrdersPayed(result);
        }
        else if (status === 'DESPACHADO') {
            setOrdersDispatched(result);
        }
        else if (status === 'EN CAMINO') {
            setOrdersOnTheWay(result);
        }
        else if (status === 'ENTREGADO') {
            setOrdersConductor(result);
        }
    }
    
    
    const getOrdersByClientAndStatus = async (idClient: string, status: string) => {
        const result = await GetByClientAndStatusOrderUseCase(idClient, status);
        if (status === 'PAGADO') {
            setOrdersPayed(result);
        }
        else if (status === 'DESPACHADO') {
            setOrdersDispatched(result);
        }
        else if (status === 'EN CAMINO') {
            setOrdersOnTheWay(result);
        }
        else if (status === 'ENTREGADO') {
            setOrdersConductor(result);
        }
    }

    const updateToDispatched = async (order: Order) => {
        const result = await UpdateToDispatchedOrderUseCase(order);
        getOrdersByStatus('PAGADO');
        getOrdersByStatus('DESPACHADO');
        return result;
    }
    
    const updateToOnTheWay = async (order: Order) => {
        const result = await UpdateToOnTheWayOrderUseCase(order);
        getOrdersByConductorAndStatus(order.id_conductor!,  'DESPACHADO');
        getOrdersByConductorAndStatus(order.id_conductor!, 'EN CAMINO');
        return result;
    }
    
    const updateToConductor = async (order: Order) => {
        const result = await UpdateToConductorOrderUseCase(order);
        getOrdersByConductorAndStatus(order.id_conductor!, 'EN CAMINO');
        getOrdersByConductorAndStatus(order.id_conductor!,  'ENTREGADO');
        return result;
    }

    return (
        <OrderContext.Provider
            value={{
                ordersPayed,
                ordersDispatched,
                ordersOnTheWay,
                ordersConductor,
                getOrdersByStatus,
                getOrdersByConductorAndStatus,
                getOrdersByClientAndStatus,
                updateToDispatched,
                updateToOnTheWay,
                updateToConductor
            }}
        >
            {children}
        </OrderContext.Provider>
    )
}