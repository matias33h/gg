import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, TouchableOpacity } from 'react-native';
import { ProfileInfoScreen } from '../views/profile/info/ProfileInfo';
// import { ConductorOrderListScreen } from '../views/conductor/order/list/OrderList';
// Importa tu componente ConductorNavigator
import { AdminOrderStackNavigator } from './AdminOrderStackNavigator';
import { ConductorOrderStackNavigator } from './ConductorOrderStackNavigator';
import {OtraVistaScreen} from '../views/conductor/otro/Otro'

const Tab = createBottomTabNavigator();

export const ConductorTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
     

<Tab.Screen 
        name="OtraVistaScreen" 
        component={OtraVistaScreen} 
        options={{
          headerShown: true,
          title: 'Conductor',
          tabBarLabel: 'Conductor',
          tabBarIcon: ({ color }) => (
            <Image
              source={ require('../../../assets/orders.png') }
              style={{ width: 25, height: 25 }}
              />
          )
        }}
      />
      
      <Tab.Screen 
        name="ConductorOrderStackNavigator" 
        component={ConductorOrderStackNavigator} 
        options={{
          title: 'Pedidos',
          tabBarLabel: 'Pedidos',
          tabBarIcon: ({ color }) => (
            <Image
              source={ require('../../../assets/orders.png') }
              style={{ width: 25, height: 25 }}
              />
          )
        }}
      />


      <Tab.Screen 
        name="ProfileInfoScreen" 
        component={ProfileInfoScreen} 
        options={{
          title: 'Perfil',
          tabBarLabel: 'Perfil',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Image
              source={ require('../../../assets/user_menu.png') }
              style={{ width: 25, height: 25 }}
              />
          )
        }}
      />
    </Tab.Navigator>
  );
};

