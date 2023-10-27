import { ProductRepositoryImpl } from "../../../Data/repositories/ProductRepository";
import { Product } from "../../entities/Product";
import React from 'react'
const {update} = new ProductRepositoryImpl();

export const UpdateProductUseCase = async (product: Product) => {
    return await update(product)
}