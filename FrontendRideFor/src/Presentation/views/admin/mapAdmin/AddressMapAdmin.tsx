import React ,{useEffect}from 'react'
import { View,Text,ToastAndroid, Image } from 'react-native';
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps'
import styles from './Style'
import useViewModel from './ViewModel'
import { RoundedButton } from '../../../components/RoundedButton';
import stylesMap from './StyleMapAdmin';
import { StackScreenProps } from '@react-navigation/stack';
import { ClientStackParamList } from '../../../navigator/ClientStackNavigator';
import { CategoryStackParamList } from '../../../navigator/AdminCategoryNavigator';

interface Props extends StackScreenProps<CategoryStackParamList,'AdminAddressMapScreen'>{}

export const AdminAddressMapScreen = ({navigation,route}:Props) => {

  const {messagePermissions,position,mapRef,name,latitude,longitude,onRegionChanageComplete}=useViewModel()

  useEffect(() => {
    if(messagePermissions !=''){
      ToastAndroid.show(messagePermissions,ToastAndroid.LONG)
    }
  }, [messagePermissions])
  

  return (
    <View style={styles.container}>
      
      <MapView
    // ref nos va a permitir acceder a los metos de mapView 
      ref={mapRef}

        customMapStyle={stylesMap}
        style={{ height: '100%', width: '100%'}}
        provider={PROVIDER_GOOGLE}
        // // ESTE METODO SE EJECUTA CADA VEZ QUE ME MUEVO 
        // onRegionChange={}
        // este es un evento que se dispara cada vez que nos movemos ene le mapa pero terminamos de hacer esa accion  osea dejamos el cursor estatico en un lugar
        onRegionChangeComplete={(region)=>{

          onRegionChanageComplete(region.latitude, region.longitude);
        }}

      />

      <Image
      style={styles.imageLocation}
      source={require('../../../../../assets/location_home.png')}
      />

      <View  style={styles.refPoint}>
        <Text style={styles.refPointText}>{ name }</Text>
      </View>

      <View style={styles.buttonRefPoint}>
        <RoundedButton
        text='SELECCIONAR PUNTO'
        onPress={()=>{
          navigation.navigate({
            name:'AdminCategoryCreateScreen',
            merge:true,
            params:{refPoint:name,latitude:latitude,longitude:longitude}
          })
        }}
        />
      </View>
    
    </View>
  )
}
