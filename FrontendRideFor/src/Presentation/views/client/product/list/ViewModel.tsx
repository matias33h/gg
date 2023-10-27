import React, {useState} from 'react'
import { GetProductsByCategoryUseCase } from '../../../../../Domain/useCases/product/GetProductsByCategory'
import { Product } from '../../../../../Domain/entities/Product'

const ClientProductListViewModel = () => {
  
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async (id_category: string) => {
    const result = await GetProductsByCategoryUseCase(id_category);
    setProducts(result)
  }
    
    return {
        products,
        getProducts
    }
}

export default ClientProductListViewModel