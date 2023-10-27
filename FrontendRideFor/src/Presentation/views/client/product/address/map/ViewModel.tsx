import MapView, { Camera } from 'react-native-maps'
import * as Location from 'expo-location'
import React, { useEffect, useRef, useState } from 'react'


const ClientAddressMapViewModel = () => {


  const [messagePermissions, setMessagePermissions] = useState('')

  // para elegir la ubicacion 
  const [refPoint, setRefPoint] = useState({
    name:'',
    latitude:0.0,
    longitude:0.0,
  })
  // useState para almacenar la posision 
  const [position, setPosition] = useState<Location.LocationObjectCoords>()

  const mapRef = useRef<MapView | null>(null)






  useEffect(() => {





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
      setMessagePermissions('Permisao de ubicacion denegado')
      return;
    }


    // en caso de que alla obtenido la ubicacion
    // me permite obtener la ubicacion en la que me encuentro una sola vez  

    const location = await Location.getLastKnownPositionAsync()
    // guardo las coordenada en las que me encuentro actualmente 
    // me devuelve las coordenadas en las que estoy ubicado 
    setPosition(location?.coords)


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
    onRegionChanageComplete

  }

}

export default ClientAddressMapViewModel