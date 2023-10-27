import { OrderRepositoryImpl } from "../../../Data/repositories/OrderRepository";
import { Order } from "../../entities/Order";

const {getByConductorAndStatus}= new OrderRepositoryImpl();

export const GetByConductorAndStatusOrderUseCase = async (idConductor: string, status:string)=>{
    return await getByConductorAndStatus(idConductor, status);
}