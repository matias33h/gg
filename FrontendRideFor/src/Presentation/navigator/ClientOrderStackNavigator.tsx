import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { Image, TouchableOpacity } from 'react-native';
import { AdminOrderListScreen } from '../views/admin/order/list/OrderList';
// import { AdminOrderDetailScreen } from '../views/admin/order/detail/OrderDetail';
import { Order } from '../../Domain/entities/Order';
import { OrderProvider } from '../context/OrderContext';
// import ConductorOrderListScreen from '../views/conductor/order/list/OrderList';
// import { ConductorOrderDetailScreen } from '../views/conductor/order/list/order/detail/OrderDetail';
// import { ConductorOrderMapScreen } from '../views/conductor/order/list/order/map/OrderMap';
import { ClientOrderListScreen } from '../views/client/order/list/OrderList';
import { ClientOrderDetailScreen } from '../views/client/order/detail/OrderDetail';
import { ClientOrderMapScreen } from '../views/client/order/map/OrderMap';
import MapScreenclient from '../views/client/mapsClient/destino/MapScreenclient';

export type ClientOrderStackParamList = {
  ClientOrderListScreen:undefined,
  ClientOrderDetailScreen:{order:Order},
  ClientOrderMapScreen: {order:Order},

}

const Stack = createNativeStackNavigator<ClientOrderStackParamList>();

export const ClientOrderStackNavigator = () => {
  return (

    <OrderStatus>
       <Stack.Navigator screenOptions={{
          headerShown: false
        }}>

            <Stack.Screen
              name="ClientOrderListScreen"
              component={ClientOrderListScreen}
            />
            
            <Stack.Screen
              name="ClientOrderDetailScreen"
              component={ClientOrderDetailScreen}
              options={{
                headerShown: true,
                title: 'Detalle de la orden'
              }}
            />


<Stack.Screen
              name="ClientOrderMapScreen"
              component={ClientOrderMapScreen}
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