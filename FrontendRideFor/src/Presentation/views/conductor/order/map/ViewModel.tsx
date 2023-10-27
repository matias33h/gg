import MapView, { Camera } from 'react-native-maps'
import * as Location from 'expo-location'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Order } from '../../../../../Domain/entities/Order'
import { OrderContext } from '../../../../context/OrderContext'
import socket from '../../../../utils/SocketIO'

const ConductorOrderMapViewModel = (order: Order) => {


  const [messagePermissions, setMessagePermissions] = useState('')
  const [responseMessage, setResponseMessage] = useState('')

  // para elegir la ubicacion 
  const [refPoint, setRefPoint] = useState({
    name:'',
    latitude:0.0,
    longitude:0.0,
  })
  // useState para almacenar la posision 
  const [position, setPosition] = useState<Location.LocationObjectCoords>()
  const [origin, setOrigin] = useState({
    latitude: 0.0,
    longitude: 0.0
  });
  const [destination, setDestination] = useState({
    latitude: order.address?.lat!,
    longitude: order.address?.lng!
  });


  const mapRef = useRef<MapView | null>(null)


  var positionSuscription: Location.LocationSubscription

  const {updateToConductor} = useContext(OrderContext)
  useEffect(() => {
  
    // LLAMADO AL SOCKET

    socket.connect()
    socket.on('connect', () => {
      console.log('---------- SOCKET IO CONNECTION -------')
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

  const updateToEntregadoOrder = async () => {
    const result = await updateToConductor(order)
    setResponseMessage(result.message)
  }


  // Metodo para elegir la ubicaion
  
  const onRegionChanageComplete=async(latitude:number, longitude:number )=>{
    try {
      const place=await Location.reverseGeocodeAsync({
        latitude:latitude,
        longitude:longitude
      })

      let city  //ciudad 
      let street; //calle
      let streetNumber; //numero de calle 

      // esto me va a devolver un lugar que lo llamarre p 
      place.find(p=>{
        city=p.city
        street=p.street
        streetNumber=p.streetNumber
        // como ya terngo los valores puedo restablecer los valores a setRefPoint que es el punto de referencia 
        setRefPoint({
        name: `${street}, ${streetNumber},${city}`,
        latitude:latitude,
        longitude:longitude
        })

      })
      
    } catch (error) {
      console.log('ERROR: ' + Error)
      
    }
  }







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
    setPosition(location?.coords)
    setOrigin({
      latitude: location?.coords.latitude!,
      longitude:  location?.coords.longitude!
    })


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

    positionSuscription?.remove();

    positionSuscription = await Location.watchPositionAsync({
      accuracy: Location.Accuracy.Balanced
    },
    location => {   
      // console.log('POSITION: ' + JSON.stringify(location.coords, null, 3))
      socket.emit('position', {
        id_order: order.id!,
        lat: location?.coords.latitude,
        lng: location?.coords.longitude
      })
      setPosition(location?.coords)
      const newCamera: Camera = {
        center: { latitude: location?.coords.latitude!, longitude: location?.coords.longitude! },
        zoom: 18,
        heading: 3,
        pitch: 2,
        altitude: 5,
      };
      mapRef.current?.animateCamera(newCamera, { duration: 2000 })

    }
    )
    // en caso de que alla obtenido la ubicacion
    // me permite obtener la ubicacion en la que me encuentro una sola vez  

  }

  const stopForegroundUpdate = () => {
    positionSuscription?.remove();
    setPosition(undefined)
  }


  return {
    messagePermissions,
    position,
    mapRef,
    ...refPoint,
    responseMessage,
    origin,
    destination,
    socket,
    onRegionChanageComplete,
    stopForegroundUpdate,
    updateToEntregadoOrder

  }

}

export default ConductorOrderMapViewModel