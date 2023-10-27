import React ,{useEffect}from 'react'
import { View,Text,ToastAndroid, Image, TouchableOpacity } from 'react-native';
import MapView,{Marker, PROVIDER_GOOGLE} from 'react-native-maps'
import styles from './Style'
import useViewModel from './ViewModel'
import { RoundedButton } from '../../../../components/RoundedButton';
import stylesMap from './StyleMap';
import { StackScreenProps } from '@react-navigation/stack';
// import { ClientAddressCreateScreen } from '../../create/AddressCreate';
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator';
import { ConductorOrderStackParamList } from '../../../../navigator/ConductorOrderStackNavigator';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '../../../../contants/GoogleMapApiKey';
import { ClientOrderStackParamList } from '../../../../navigator/ClientOrderStackNavigator';

interface Props extends StackScreenProps<ClientOrderStackParamList,'ClientOrderMapScreen'>{}

export const ClientOrderMapScreen = ({navigation,route}:Props) => {

  const {order} = route.params;
  const {messagePermissions,positionOnce,socket,position,mapRef,name,origin, responseMessage}=useViewModel(order)

  useEffect(() => {
    if(messagePermissions !=''){
      ToastAndroid.show(messagePermissions,ToastAndroid.LONG)
    }
  }, [messagePermissions])

  useEffect(() => {
    const unsuscribe = navigation.addListener('beforeRemove', () => {
      console.log('EVENTO: beforeRemove')
      socket.disconnect()
    })
    return unsuscribe
  }, [navigation])

  useEffect(() => {
    if (responseMessage !== '') {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG)
    }
  
  
  }, [responseMessage])
  
  
  

  return (
    <View style={styles.container}>
      
      <MapView
    // ref nos va a permitir acceder a los metos de mapView 
      ref={mapRef}

        customMapStyle={stylesMap}
        zoomControlEnabled={true}
        style={{ height: '64%', width: '100%', position: 'absolute', top: 0}}
        provider={PROVIDER_GOOGLE}
        // // ESTE METODO SE EJECUTA CADA VEZ QUE ME MUEVO 
        // onRegionChange={}
        // este es un evento que se dispara cada vez que nos movemos ene le mapa pero terminamos de hacer esa accion  osea dejamos el cursor estatico en un lugar
      >
        {
          position.latitude !== 0.0 &&
          <Marker 
        
          coordinate={position}
      
        >

      <Image  
        style={styles.markerImage}
        source={require('../../../../../../assets/delivery.png')}
      />

        </Marker>
        }

{
          order.address !== undefined &&
          <Marker 
        
          coordinate={{ latitude: order.address.lat, longitude: order.address.lng}}
      
        >

      <Image  
        style={styles.markerImage}
        source={require('../../../../../../assets/home.png')}
      />

        </Marker>
        }

        {/* HABILITAR DIRECTIONS API */}


        
        {

        (origin.latitude !== 0.0 && positionOnce.latitude !== 0.0) && 

        <MapViewDirections
        origin={origin}
        destination={positionOnce}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={3}
        strokeColor='orange'
        
        />
        }
        

      </MapView>

      {/* <Image
      style={styles.imageLocation}
      source={require('../../../../../../../../assets/location_home.png')}
      /> */}

    <View style={styles.info}>

    <View style={styles.infoRow}>

      <View style={styles.infoText}>
        <Text style={styles.title}>Barrio</Text>
        <Text style={styles.infoDescription}>{order.address?.neighborhood}</Text>
      </View>

      <Image
      style={styles.infoImage}
      source={require('../.../../../../../../../assets/my_user.png')}
      />

      </View>

      <View style={styles.infoRow}>

      <View style={styles.infoText}>
        <Text style={styles.title}>Direccion</Text>
        <Text style={styles.infoDescription}>{order.address?.address} </Text>
      </View>

      <Image
      style={styles.infoImage}
      source={require('../../../../../../assets/location_home.png')}
      />

      </View>

      <View style={styles.divider}></View>

    <View style={styles.infoClient}>
      <Image 
        style={styles.imageClient}
        source={{uri: order.conductor?.image}}
      />
      <Text style={styles.nameClient}>{order.conductor?.name} {order.conductor?.lastname}</Text>
      <Image 
        style={styles.imagePhone}
        source={require('../../../../../../assets/phone.png')}
      />
    </View>

    


    </View>

    
        <TouchableOpacity style={styles.backContainer} onPress={() => navigation.goBack()}>
          <Image 
            style={styles.back}
            source={require('../../../../../../assets/back.png')}

          />
        </TouchableOpacity>

    </View>
  )
}
