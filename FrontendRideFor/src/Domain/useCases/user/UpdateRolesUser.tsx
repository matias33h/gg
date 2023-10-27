import { UserRepositoryImpl } from "../../../Data/repositories/UserRepository";
import { ResponseApiDelivery } from "../../../Data/sources/remote/models/ResponseApiDelivery";

const { changeUserRole } = new UserRepositoryImpl();

export const ChangeUserRoleUserUseCase = async(userId: string, newRole: string): Promise<ResponseApiDelivery> => {
    return await changeUserRole(userId, newRole);
}
