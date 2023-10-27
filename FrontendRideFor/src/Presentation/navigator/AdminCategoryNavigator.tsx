import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { Category } from '../../Domain/entities/Category';
import { CategoryProvider } from '../context/CategoryContext';
import { AdminCategoryCreateScreen } from '../views/admin/category/create/CategoryCreate';
import { AdminCategoryUpdateScreen } from '../views/admin/category/update/CategoryUpdate';
import { AdminCategoryListScreen } from '../views/admin/category/list/CategoryList'; 
import { Image, TouchableOpacity } from 'react-native';
import { AdminProductNavigator } from './AdminProductNavigator';
import { AdminAddressMapScreen } from '../views/admin/mapAdmin/AddressMapAdmin';
import { ClientAddressCreateScreen } from '../views/client/product/address/create/AddressCreate';

export type CategoryStackParamList = {
    AdminCategoryListScreen: undefined,
    AdminCategoryCreateScreen: {refPoint:string, latitude:number , longitude:number} | undefined,
    AdminCategoryUpdateScreen: { category: Category }, 
    AdminProductNavigator: { category: Category },
    AdminAddressMapScreen:undefined
}

const Stack = createNativeStackNavigator<CategoryStackParamList>();

export const AdminCategoryNavigator = () => {
  return (
    <CategoryState>

        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>

            <Stack.Screen
              name="AdminCategoryListScreen"
              component={AdminCategoryListScreen}
              options={ ({route, navigation}) => (
                {
                  headerShown: true,
                  title: 'Empresas',
                  headerRight: () => (
                    <TouchableOpacity onPress={() => navigation.navigate('AdminCategoryCreateScreen')}>
                      <Image 
                        source={ require('../../../assets/add.png') }
                        style={{ width:35, height: 35 }}
                      />
                    </TouchableOpacity>
                  )
                }
              )}
            />
            
            <Stack.Screen
              name="AdminCategoryCreateScreen"
              component={AdminCategoryCreateScreen}
              options={{
                headerShown: true,
                title: 'Nueva empresa'
              }}
            />

            <Stack.Screen
              name="AdminCategoryUpdateScreen"
              component={AdminCategoryUpdateScreen}
              options={{
                headerShown: true,
                title: 'Editar categoria'
              }}
            />
            
            <Stack.Screen
              name="AdminProductNavigator"
              component={AdminProductNavigator}
              
            />

       


          <Stack.Screen
          name='AdminAddressMapScreen'
          component={AdminAddressMapScreen}
          options={{
            headerShown: true,
            title: 'Ubica tu direccion en el mapa'
          }}
        />

        </Stack.Navigator>
        
    </CategoryState>
  )
}

const CategoryState = ({children}: any) => {
  return (
    <CategoryProvider>
      { children }
    </CategoryProvider>
  )
}
