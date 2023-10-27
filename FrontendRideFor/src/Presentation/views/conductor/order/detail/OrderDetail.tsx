import React, { useEffect } from 'react'
import { Text, View,FlatList, Image, ToastAndroid } from 'react-native'
import styles from './Style'
import { StackScreenProps } from '@react-navigation/stack'
import { AdminOrderStackParamList } from '../../../../navigator/AdminOrderStackNavigator'
import { OrderDetailItem } from './item'
import { DateFormatter } from '../../../../utils/DateFormatter'
import useViewModel from './ViewModel'
import { RoundedButton } from '../../../../components/RoundedButton'
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from 'react-native-toast-message'
import { ConductorOrderStackParamList } from '../../../../navigator/ConductorOrderStackNavigator'

interface Props extends StackScreenProps<ConductorOrderStackParamList,'ConductorOrderDetailScreen'>{};


export const ConductorOrderDetailScreen = ({navigation,route}:Props) => {

  const {order} = route.params;
  const {total, getTotal, responseMessage, updateToOnTheWayOrder } = useViewModel(order);
  
  
  useEffect(() =>{
    if(responseMessage !== ''){
    ToastAndroid.show(responseMessage, ToastAndroid.LONG)
}

},[responseMessage])
  
  useEffect(() =>{
    if(total==0.0){
    getTotal()
}
},[])


  return (
    <View style={styles.container}>
      <View style={styles.conduct}>
      <FlatList
      data={order.products}
      keyExtractor={(item)=>item.id!}
      renderItem={({item}) => <OrderDetailItem product={item}/>}
      />

      </View>
      <View style={styles.info}>
        <View style={styles.infoRow}>

          <View style={styles.infoText}>
            <Text style={styles.title}>Fecha del pedido</Text>
            <Text style={styles.infoDescription}>{DateFormatter(order.timestamp!)}</Text>
          </View>
          
          <Image
          style={styles.infoImage}
          source={require('../.../../../../../../../assets/ee.png')}
          />

        </View>
        <View style={styles.infoRow}>

          <View style={styles.infoText}>
            <Text style={styles.title}>Cliente y telefono</Text>
            <Text style={styles.infoDescription}>{order.client?.name} {order.client?.lastname} - {order.client?.phone}</Text>
          </View>
          
          <Image
          style={styles.infoImage}
          source={require('../.../../../../../../../assets/user.png')}
          />

        </View>

        <View style={styles.infoRow}>

          <View style={styles.infoText}>
            <Text style={styles.title}>Direccion de entrega</Text>
            <Text style={styles.infoDescription}>{order.address?.address} - {order.address?.neighborhood} </Text>
          </View>
          
          <Image
          style={styles.infoImage}
          source={require('../.../../../../../../../assets/google-maps.png')}
          />

        </View>
    <View style={styles.infoRow}>

        <View style={styles.infoText}>
          <Text style={styles.title}>REPARTIDOR ASIGNADO</Text>
          <Text style={styles.infoDescription}>{order.conductor?.name} {order.conductor?.lastname} </Text>
        </View>
        
        <Image
        style={styles.infoImage}
        source={require('../.../../../../../../../assets/my_user.png')}
        />

      </View>
    

     

        <View style={styles.totalInfo}>
          <Text style={styles.total}>TOTAL:</Text>
          <View style={styles.button}>
              {
                order.status === 'DESPACHADO' &&
                <RoundedButton text='INICAR VIAJE' onPress={()=>updateToOnTheWayOrder()}/>}
                 {
                order.status === 'EN CAMINO' &&
                <RoundedButton text='IR A LA RUTA' onPress={()=> navigation.navigate('ConductorOrderMapScreen', {order: order})}/>}
          </View>
        </View>
      </View>
    
    </View>
  )
}
