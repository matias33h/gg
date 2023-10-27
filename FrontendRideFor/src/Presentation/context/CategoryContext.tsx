import { createContext, useState, useEffect } from 'react';
import { Category } from "../../Domain/entities/Category";
import * as ImagePicker from 'expo-image-picker';
import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { GetAllCategoryUseCase } from '../../Domain/useCases/category/GetAllCategory';
import { CreateCategoryUseCase } from '../../Domain/useCases/category/CreateCategory';
import { UpdateCategoryUseCase } from '../../Domain/useCases/category/UpdateCategory';
import { UpdateWithImageCategoryUseCase } from '../../Domain/useCases/category/UpdateWithImageCategory';
import { DeleteCategoryUseCase } from '../../Domain/useCases/category/DeleteCategory';
import { GetByUserCategoryUseCase } from '../../Domain/useCases/category/GetByUserAddressUseCase';


export interface CategoryContextProps {
    categories: Category[],
    getCategories(idUser: string): Promise<void>,
    create(category: Category, file: ImagePicker.ImagePickerAsset): Promise<ResponseApiDelivery>,
    update(category: Category): Promise<ResponseApiDelivery>,
    updateWithImage(category: Category, file: ImagePicker.ImagePickerAsset): Promise<ResponseApiDelivery>,
    remove(id: string): Promise<ResponseApiDelivery>,
    getByUser(idUser: string): Promise<Category[]> // Agrega la función para obtener las categorías de un usuario
}

export const CategoryContext = createContext({} as CategoryContextProps);

export const CategoryProvider = ({ children }: any) => {
    const [categories, setCategories] = useState<Category[]>([]);

   

    const getCategories = async (idUser: string): Promise<void> => {
        const result = await GetByUserCategoryUseCase(idUser);
        setCategories(result);
    }

    const create = async (category: Category, file: ImagePicker.ImagePickerAsset): Promise<ResponseApiDelivery> => {
        const response = await CreateCategoryUseCase(category, file!);
        getCategories(category.id_user);
        return response;
    }

    const update = async (category: Category): Promise<ResponseApiDelivery> => {
        const response = await UpdateCategoryUseCase(category);
        getCategories(category.id_user);
        return response;
    }

    const updateWithImage = async (category: Category, file: ImagePicker.ImagePickerAsset): Promise<ResponseApiDelivery> => {
        const response = await UpdateWithImageCategoryUseCase(category, file);
        getCategories(category.id_user);
        return response;
    }

    const remove = async (id: string): Promise<ResponseApiDelivery> => {
        const response = await DeleteCategoryUseCase(id);
        getCategories(id);
        return response;
    }

    const getByUser = async (idUser: string): Promise<Category[]> => {
        const result = await GetByUserCategoryUseCase(idUser);
        return result;
    }

    return (
        <CategoryContext.Provider value={{
            categories,
            getCategories,
            create,
            update,
            updateWithImage,
            remove,
            getByUser, // Agrega la función al contexto
        }}>
            {children}
        </CategoryContext.Provider>
    )
}
