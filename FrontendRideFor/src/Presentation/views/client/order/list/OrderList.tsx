import React,{useEffect} from 'react'
import { Text, View, useWindowDimensions,FlatList } from 'react-native'
import useViewModel from './ViewModel'
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
import { OrderListItem } from './item';
import { useNavigation } from '@react-navigation/native';
import { AdminOrderStackParamList } from '../.././../../navigator/AdminOrderStackNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { ConductorOrderStackParamList } from '../../../../navigator/ConductorOrderStackNavigator';
import { ClientOrderStackParamList } from '../../../../navigator/ClientOrderStackNavigator';

interface Props{
  status: string;
} 

export const OrderListView = ({ status }: Props) => {
  const { ordersDispatched, ordersConductor, ordersOnTheWay, ordersPayed,  getUserSession, getOrders, user } = useViewModel();
  const navigation = useNavigation<StackNavigationProp<ClientOrderStackParamList, 'ClientOrderListScreen'>>();

  useEffect(() => {
      // console.log('Calling getOrders with user ID:', user?.id, 'and status:', status);
      getOrders(user?.id!, status);
  }, [user]);

  // console.log('Rendering OrderListView for status:', status, 'with ordersPayed:', ordersPayed);

  return (
      <View>
          <FlatList
              data={
                  status === 'PAGADO'
                      ? ordersPayed
                      : status === 'DESPACHADO'
                      ? ordersDispatched
                      : status === 'EN CAMINO'
                      ? ordersOnTheWay
                      : status === 'ENTREGADO'
                      ? ordersConductor
                      : []
              }
              keyExtractor={(item) => item.id!}
              renderItem={({ item }) => <OrderListItem order={item} navigation={navigation} />}
          />
      </View>
  );
};


const renderScene = ({ route }:any) => {
  switch (route.key) {
    case 'first':
      return <OrderListView status='PAGADO' />;
  //  case 'second':
  //     return <OrderListView status='DESPACHADO' />;
  //   case 'third':
  //     return <OrderListView status='EN CAMINO' />;
    case 'second':
      return <OrderListView status='ENTREGADO' />;
    default:
    return <OrderListView status='PAGADO'/>
  }
};


export const ClientOrderListScreen=()=> {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'LISTA DE VIAJES'},
    // { key: 'second', title: 'DESPACHADO' },
    // { key: 'third', title:  'EN CAMINO' },
    { key: 'second', title: 'REGISTRO' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={props =>(
        <TabBar
        {...props}
        indicatorStyle={{backgroundColor:'white'}}
        activeColor='white'
        inactiveColor='gray'
        scrollEnabled={true}
        style={{ padding:10, backgroundColor:'#00005f' , height:75, alignItems:'center',justifyContent:'center' }}
        />
      )}
    />
  );
}