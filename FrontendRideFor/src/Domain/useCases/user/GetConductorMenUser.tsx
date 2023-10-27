import React from 'react'
import { UserRepositoryImpl } from '../../../Data/repositories/UserRepository'
const { getConductor } = new UserRepositoryImpl

export const GetConductorMenUserUSeCase = async () => {
  return await getConductor();
}
