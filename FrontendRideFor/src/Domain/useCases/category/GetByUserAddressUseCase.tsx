import { CategoryRepositoryImpl } from "../../../Data/repositories/CategoryRepository";

const {getByUser}=new CategoryRepositoryImpl()



export const GetByUserCategoryUseCase = async(idUser:string) => {
  return await getByUser(idUser)
}
