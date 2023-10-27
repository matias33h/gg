import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { Image, TouchableOpacity } from 'react-native';
import { AdminOrderListScreen } from '../views/admin/order/list/OrderList';
// import { AdminOrderDetailScreen } from '../views/admin/order/detail/OrderDetail';
import { Order } from '../../Domain/entities/Order';
import { OrderProvider } from '../context/OrderContext';
import {ConductorOrderListScreen }from '../views/conductor/order/list/OrderList';
import { ConductorOrderDetailScreen } from '../views/conductor/order/detail/OrderDetail';
import { ConductorOrderMapScreen } from '../views/conductor/order/map/OrderMap';

export type ConductorOrderStackParamList = {
  ConductorOrderListScreen:undefined,
  ConductorOrderDetailScreen:{order:Order},
  ConductorOrderMapScreen: {order:Order},
}

const Stack = createNativeStackNavigator<ConductorOrderStackParamList>();

export const ConductorOrderStackNavigator = () => {
  return (

    <OrderStatus>
       <Stack.Navigator screenOptions={{
          headerShown: false
        }}>

            <Stack.Screen
              name="ConductorOrderListScreen"
              component={ConductorOrderListScreen}
            />
            
            <Stack.Screen
              name="ConductorOrderDetailScreen"
              component={ConductorOrderDetailScreen}
              options={{
                headerShown: true,
                title: 'Detalle de la orden'
              }}
            />

<Stack.Screen
              name="ConductorOrderMapScreen"
              component={ConductorOrderMapScreen}
            />

        </Stack.Navigator>
        
 
    </OrderStatus>

        
  )
}


const OrderStatus = ({children}: any) => {
  return (
    <OrderProvider>
      {children}
    </OrderProvider>
  )
}