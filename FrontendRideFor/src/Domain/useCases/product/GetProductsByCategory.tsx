import React from 'react'
import { ProductRepositoryImpl } from '../../../Data/repositories/ProductRepository'


const { getProductByCategory} = new ProductRepositoryImpl()

export const GetProductsByCategoryUseCase =  async (id_category: string) => {
  return await getProductByCategory(id_category);
  
}

