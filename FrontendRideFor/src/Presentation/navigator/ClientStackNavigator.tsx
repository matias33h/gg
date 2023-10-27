import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ClientCategoryListScreen } from "../views/client/category/list/CategoryList";
import { ClientProductListScreen } from "../views/client/product/list/ProductList";
import { ClientProductDetailScreen } from "../views/client/product/detail/ProductDetail";
import { Product } from "../../Domain/entities/Product";
import { TouchableOpacity, Image } from 'react-native';
import { ClientShoppingBagScreen } from "../views/client/shopping_bag/ShoppingBag"
import { ShoppingBagProvider } from "../context/ShoppingBagContext";
import { ClientAddressListScreen } from "../views/client/product/address/list/AddressList";
import { ClientAddressCreateScreen } from "../views/client/product/address/create/AddressCreate";
import { ClientAddressMapScreen } from "../views/client/product/address/map/AddressMap";
import { ClientPaymentFormScreen } from "../views/client/payment/form/PaymentForm";
import { ClientPaymentInstallmentsScreen } from "../views/client/payment/installments/PaymentInstallments";
import { ResponseMercadoPagoCardToken } from "../../Data/sources/remote/models/ResponseMercadoPagoCardToken";
import { ClientPaymentStatusScreen } from "../views/client/payment/status/PaymentStatus";
import { ResponseMercadoPagoPayment } from "../../Data/sources/remote/models/ResponseMercadoPagoPayment";
import MapScreenclient from "../views/client/mapsClient/destino/MapScreenclient";


export type ClientStackParamList = {
  ClientCategoryListScreen: undefined,
  ClientProductListScreen: { id_category: string },
  ClientProductDetailScreen: { product: Product },
  ClientShoppingBagScreen: undefined,
  ClientAddressListScreen: undefined,
  ClientAddressCreateScreen:{refPoint:string, latitude:number , longitude:number} | undefined,
  ClientAddressMapScreen:undefined,
  ClientPaymentFormScreen: undefined,
  ClientPaymentInstallmentsScreen: {cardToken: ResponseMercadoPagoCardToken}
  ClientPaymentStatusScreen: { paymentData: ResponseMercadoPagoPayment}
  MapScreenclient: {
    origin: {
      latitude: number;
      longitude: number;
    };
    destination: {
      latitude: number;
      longitude: number;
    };
  };
}


const Stack = createNativeStackNavigator<ClientStackParamList>();

export const ClientStackNavigator = () => {
  return (
    <ShopingBagState>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name='ClientCategoryListScreen'
          component={ClientCategoryListScreen}
          options={({ route, navigation }) => (
            {
              headerShown: true,
              title: 'Categorias',
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('ClientShoppingBagScreen')}>
                  <Image
                    source={require('../../../assets/location.png')}
                    style={{ width: 30, height: 30 }}
                  />
                </TouchableOpacity>
              )
            }
          )}
        />

      {/* <Stack.Screen
  name='MapScreenclient' // Cambia 'MapScreenClient' a 'MapScreenclient'
  component={MapScreenclient} 
  options={({ route, navigation }) => (
    {
      headerShown: true,
      title: 'Categorias',
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('ClientShoppingBagScreen')}>
          <Image
            source={require('../../../assets/location.png')}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      )
    }
  )}
/> */}



        <Stack.Screen
          name='ClientProductListScreen'
          component={ClientProductListScreen}
          options={({ route, navigation }) => (
            {
              headerShown: true,
              title: 'Productos',
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('ClientShoppingBagScreen')}>
                  <Image
                    source={require('../../../assets/location.png')}
                    style={{ width: 30, height: 30 }}
                  />
                </TouchableOpacity>
              )
            }
          )}
        />

        <Stack.Screen
          name='ClientProductDetailScreen'
          component={ClientProductDetailScreen}
        />

        <Stack.Screen
          name='ClientShoppingBagScreen'
          component={ClientShoppingBagScreen}
          options={{
            headerShown: true,
            title: 'Mis Ordenes'
          }}
        />

        <Stack.Screen
          name='ClientAddressListScreen'
          component={ClientAddressListScreen}
          options={({ route, navigation }) => (
            {
              headerShown: true,
              title: 'Mis Direcciones',
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('ClientAddressCreateScreen')}>
                  <Image
                    source={require('../../../assets/add.png')}
                    style={{ width: 30, height: 30 }}
                  />
                </TouchableOpacity>
              )
            }
          )}
        />

        <Stack.Screen
          name='ClientAddressCreateScreen'
          component={ClientAddressCreateScreen}
          options={{
            headerShown: true,
            title: 'Nueva Direccion'
          }}
        />
        <Stack.Screen
          name='MapScreenclient'
          component={MapScreenclient}
          options={{
            headerShown: false,
            // title: 'Nueva Direccion'
          }}
        />

        <Stack.Screen
          name='ClientAddressMapScreen'
          component={ClientAddressMapScreen}
          options={{
            headerShown: true,
            title: 'Ubica tu direccion en el mapa'
          }}
        />

<Stack.Screen
          name='ClientPaymentFormScreen'
          component={ClientPaymentFormScreen}
          options={{
            headerShown: true,
            title: 'Formulario de pago'
          }}
        />



<Stack.Screen
          name='ClientPaymentInstallmentsScreen'
          component={ClientPaymentInstallmentsScreen}
          options={{
            headerShown: true,
            title: 'Numero de cuotas'
          }}
        />

<Stack.Screen
          name='ClientPaymentStatusScreen'
          component={ClientPaymentStatusScreen}
        />


       



      </Stack.Navigator>
    </ShopingBagState>
  )
}

const ShopingBagState = ({ children }: any) => {
  return (
    <ShoppingBagProvider>
      {children}
    </ShoppingBagProvider>
  )
}
