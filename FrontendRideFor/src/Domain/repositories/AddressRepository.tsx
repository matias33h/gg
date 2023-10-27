import { ResponseApiDelivery } from '../../Data/sources/remote/models/ResponseApiDelivery';
import { Address } from '../entities/Address';


export interface AddressRepository {
    create(address: Address):Promise<ResponseApiDelivery>;
    getByUser(isUser: string):Promise<Address[]>;


}