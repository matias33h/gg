import React, { useState, useEffect, useContext } from 'react';
import { CategoryContext } from '../../../../context/CategoryContext';
import { UserContext } from '../../../../context/UserContext'; // Importa UserContext
import { GetByUserCategoryUseCase } from '../../../../../Domain/useCases/category/GetByUserAddressUseCase';
import { Category } from '../../../../../Domain/entities/Category';

const AdminCategoryListViewModel = () => {
    const [responseMessage, setResponseMessage] = useState('');
    const {remove, getByUser } = useContext(CategoryContext);
    const { user, getUserSession } = useContext(UserContext); // Obtén el usuario actual
    const [ categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        ObtenerCategorias()
        if (user.id) {
            // Si tienes un usuario válido, busca sus categorías específicas
            getByUser(user.id);
        } else {
            // De lo contrario, obtén todas las categorías
            
        }
    }, [user]);

    const ObtenerCategorias = async () => {
        const result = await GetByUserCategoryUseCase(user.id!)
        setCategories(result);
    }

    const deleteCategory = async (idCategory: string) => {
        const result = await remove(idCategory);
        setResponseMessage(result.message);
        ObtenerCategorias()
        getUserSession()
    }

    return {
        categories,
        ObtenerCategorias,
        responseMessage,
        deleteCategory
    }
}

export default AdminCategoryListViewModel;
