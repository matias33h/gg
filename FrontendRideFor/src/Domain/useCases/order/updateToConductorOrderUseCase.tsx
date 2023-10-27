import { OrderRepositoryImpl } from "../../../Data/repositories/OrderRepository";
import { Order } from "../../entities/Order";

const {updateToConductor}= new OrderRepositoryImpl();

export const UpdateToConductorOrderUseCase = async (order:Order)=>{
    return await updateToConductor(order);
}