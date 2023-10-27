import MapView, { Camera } from 'react-native-maps'
import * as Location from 'expo-location'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Order } from '../../../../../Domain/entities/Order'
import { OrderContext } from '../../../../context/OrderContext'
import socket from '../../../../utils/SocketIO'

const ClientOrderMapViewModel = (order: Order) => {


  const [messagePermissions, setMessagePermissions] = useState('')
  const [responseMessage, setResponseMessage] = useState('')

  // para elegir la ubicacion 
  const [refPoint, setRefPoint] = useState({
    name:'',
    latitude:0.0,
    longitude:0.0,
  })
  // useState para almacenar la posision 
  const [position, setPosition] = useState({
    latitude: 0.0,
    longitude: 0.0
  })
  const [origin, setOrigin] = useState({
    latitude: order.address?.lat!,
    longitude: order.address?.lng!
  });
  // const [destination, setDestination] = useState({
  //   latitude: 
  //   longitude: 
  // });

  // const [isPositionSetted, setIsPositionSetted] = useState(false)
  const [positionOnce, setPositionOnce] = useState({
    latitude: 0.0,
    longitude: 0.0
  })
  
  const mapRef = useRef<MapView | null>(null)


  var positionSuscription: Location.LocationSubscription


  useEffect(() => {
    if (position.latitude !== 0.0 && position.longitude !== 0.0){
      if(positionOnce.latitude === 0.0 && positionOnce.longitude === 0.0){

        setPositionOnce(position)
      }
    }
  }, [position])
 
  useEffect(() => {

    socket.connect();
    socket.on('connect', () => {
      console.log('SOCKET IO CONNECTED');
      
    })

    socket.on(`position/${order.id!}`, (data: any) => {
      setPosition({
        latitude: data.lat,
        longitude: data.lng
      })
    })

    const requestPermissions = async () => {

      // requestForegroundPermissionsAsync= este es el que va a pedir los permisos de ubicacion al usuario 

      const foreground = await Location.requestForegroundPermissionsAsync();

      // si los permiso fueron consedidos se va a ejecutar el metodo startForegroundUpdate

      if (foreground.granted) {
        startForegroundUpdate()
      }
    }

    requestPermissions()



  }, [])




  // Metodo para elegir la ubicaion
  
  




  // voy a obtener la ubicacion

  const startForegroundUpdate = async () => {
    const { granted } = await Location.getForegroundPermissionsAsync();
    // voy a a veriguar si el usuario no abilito los permisos  setsetMessagePermissions podemos ver quye le ususrio no consigio los permisos
    if (!granted) {
      setMessagePermissions('Permiso de ubicacion denegado')
      return;
    }

    const location = await Location.getLastKnownPositionAsync()
    // guardo las coordenada en las que me encuentro actualmente 
    // me devuelve las coordenadas en las que estoy ubicado 
   
   


    // esto es para que la camara se hacerque al lugar que se coloca la posision 
    const newCamera: Camera = {
      center: { latitude: location?.coords.latitude!, longitude: location?.coords.longitude! },
      zoom: 15,
      heading: 3,
      pitch: 2,
      altitude: 5,
    };

    // me va a mostrar el mapa por dos segundos hasta que nos lleve a el punto que le indicamos
    // realiza una animacion de dos segundos hasta que no lleva a newcamera 

    mapRef.current?.animateCamera(newCamera, { duration: 2000 })

    
  }

 


  return {
    messagePermissions,
    position,
    mapRef,
    ...refPoint,
    responseMessage,
    origin,
    socket,
    positionOnce
  

  }

}

export default ClientOrderMapViewModel