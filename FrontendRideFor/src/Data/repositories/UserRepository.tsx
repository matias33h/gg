import { AxiosError } from "axios";
import * as ImagePicker  from "expo-image-picker";
import mime from "mime";
import { User } from "../../Domain/entities/User";
import { UserRepository } from "../../Domain/repositories/UserRepository";
import { ApiDelivery, ApiDeliveryForImage } from "../sources/remote/api/ApiDelivery";
import { ResponseApiDelivery } from "../sources/remote/models/ResponseApiDelivery";

export class UserRepositoryImpl implements UserRepository {


    async getConductor(): Promise<User[]> {
        try {
            const response = await ApiDelivery.get<User[]>('/users/findConductorMen');
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            return Promise.resolve([])
        }
    }

    async update(user: User): Promise<ResponseApiDelivery> {
        try {
            const response = await ApiDelivery.put<ResponseApiDelivery>('/users/updateWithoutImage', user);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError:ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data)); 
            return Promise.resolve(apiError)
        }
    }

    async updateWithImage(user: User, file: ImagePicker.ImagePickerAsset): Promise<ResponseApiDelivery> {
        try {
            let data = new FormData();data.append('user', JSON.stringify(user));data.append('image', {uri: file.uri,type: mime.getType(file.uri)!,name: file.uri.split('/').pop()} as any)
           
            const response = await ApiDeliveryForImage.put<ResponseApiDelivery>('/users/update', data);
            return Promise.resolve(response.data);

        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError:ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data)); 
            return Promise.resolve(apiError)
        }
    }


    async changeUserRole(userId: string, newRole: string): Promise<ResponseApiDelivery> {
        try {
          const response = await ApiDelivery.put<ResponseApiDelivery>('/users/updateRole', {
            userId: userId,
            newRole: newRole,
          });
          return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError:ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data)); 
            return Promise.resolve(apiError)
        }
      }

}