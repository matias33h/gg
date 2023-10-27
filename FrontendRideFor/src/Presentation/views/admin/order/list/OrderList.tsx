import React,{useEffect} from 'react'
import { Text, View, useWindowDimensions,FlatList } from 'react-native'
import useViewModel from './ViewModel'
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
import { OrderListItem } from './item';
import { useNavigation } from '@react-navigation/native';
import { AdminOrderStackParamList } from '../../../../navigator/AdminOrderStackNavigator';
import { StackNavigationProp } from '@react-navigation/stack';

interface Props{
  status: string;
} 

 const OrderListView = ({status}:Props) => {

const {ordersDispatched, ordersConductor, ordersOnTheWay, ordersPayed,getOrders}=useViewModel()
const navigation=useNavigation<StackNavigationProp<AdminOrderStackParamList,'AdminOrderListScreen'>>()

useEffect(() =>{
getOrders(status)

},[])

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
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
      renderItem={({item})=><OrderListItem order={item} navigation={navigation}/>}
      />
    </View>
  )
}


const renderScene = ({ route }:any) => {
  switch (route.key) {
    case 'first':
      return <OrderListView status='PAGADO' />;
    case 'second':
      return <OrderListView status='DESPACHADO' />;
    case 'third':
      return <OrderListView status='EN CAMINO' />;
    case 'fourth':
      return <OrderListView status='ENTREGADO' />;
    default:
    return <OrderListView status='PAGADO'/>
  }
};




export const AdminOrderListScreen=()=> {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title:  'PAGADO' },
    { key: 'second', title: 'DESPACHADO' },
    { key: 'third', title:  'EN CAMINO' },
    { key: 'fourth', title: 'ENTREGADO' },
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