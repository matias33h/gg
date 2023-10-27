import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { Order } from "../entities/Order";

export interface OrderRepository{
    create(order:Order):Promise<ResponseApiDelivery>;
    getByStatus(status:string):Promise<Order[]>;
    getByConductorAndStatus(idConductor: string, status:string):Promise<Order[]>;
    getByClientAndStatus(idClient: string, status:string):Promise<Order[]>;
    updateToDispatched(order:Order):Promise<ResponseApiDelivery>;
    updateToOnTheWay(order:Order):Promise<ResponseApiDelivery>;
    updateToConductor(order:Order):Promise<ResponseApiDelivery>;
    
}