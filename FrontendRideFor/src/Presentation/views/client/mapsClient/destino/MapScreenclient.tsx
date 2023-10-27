import React, { useState, useRef,useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity,Modal,SafeAreaView,ScrollView } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { RouteProp } from '@react-navigation/native';
import { mapStyle } from './store';
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator';
import MapViewDirections from 'react-native-maps-directions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ClientOrderStackParamList } from '../../../../navigator/ClientOrderStackNavigator';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import {styles} from './StylesMap'
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


interface Location {
  latitude: number;
  longitude: number;
}

interface MapScreenclientParams {
  origin: Location;
  destination: Location;
}

const GOOGLE_MAPS_APIKEY = 'AIzaSyAb8gmVWDdRdDcjNRx0IXw82LE4dfA4xfg';

interface MapScreenclientProps {
  route: RouteProp<ClientStackParamList, 'MapScreenclient'>;
}

const MapScreenclient: React.FC<MapScreenclientProps> = ({ route }) => {
  const { origin, destination } = route.params;
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [region, setRegion] = useState({
    latitude: (origin.latitude + destination.latitude) / 2,
    longitude: (origin.longitude + destination.longitude) / 2,
    latitudeDelta: Math.abs(origin.latitude - destination.latitude) * 1.2,
    longitudeDelta: Math.abs(origin.longitude - destination.longitude) * 1.2,
  });

  // cambio 


  const bottomSheetRef = useRef<BottomSheet>(null);

  // Función para abrir el BottomSheet
  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  // cambio
  
  

  const [modalVisible, setModalVisible] = useState(false); // Nuevo estado para la visibilidad del modal
  const mapRef = useRef<MapView>(null);

  const zoomIn = () => {
    setRegion(prevRegion => ({
      ...prevRegion,
      latitudeDelta: prevRegion.latitudeDelta / 2,
      longitudeDelta: prevRegion.longitudeDelta / 2,
    }));
  };

  const zoomOut = () => {
    setRegion(prevRegion => ({
      ...prevRegion,
      latitudeDelta: prevRegion.latitudeDelta * 2,
      longitudeDelta: prevRegion.longitudeDelta * 2,
    }));
  };
  const CustomHandle = () => (
    <View style={styles.handleContainer}>
      <View style={styles.handleIndicator} />
      <Text style={styles.handleText}>Selecciona un conductor</Text>
    </View>
  );



  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        customMapStyle={mapStyle}
        onRegionChangeComplete={setRegion}
      >
        <Marker coordinate={origin} title="Origen" />
        <Marker coordinate={destination} title="Destino" />
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="black"
          onReady={result => {
            setDistance(result.distance);
            setDuration(result.duration);
            if (mapRef.current) {
              mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                animated: true,
              });
            }
          }}
        />
      </MapView>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Distancia: {distance !== null ? `${distance.toFixed(2)} km` : ''}
        </Text>
        <Text style={styles.infoText}>
          Tiempo estimado: {duration !== null ? `${duration.toFixed(2)} min` : ''}
        </Text>
      </View>
      <TouchableOpacity style={styles.zoomIn} onPress={zoomIn}>
        <FontAwesome name="plus" size={10} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.zoomOut} onPress={zoomOut}>
        <FontAwesome name="minus" size={10} color="black" />
      </TouchableOpacity>





{/* cambio  */}


    {/* BottomSheetModal en lugar de Modal */}
    <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={['13%', '38%']}
        backgroundStyle={styles.modalContainer}
        handleIndicatorStyle={[styles.handleIndicator, { width: 50, height: 5 }]} // Personalizar el ancho y la altura aquí
        handleComponent={CustomHandle}
   >
        <SafeAreaView style={styles.modalView}>
          {/* Contenido de tu BottomSheet */}
          {/* ... (El mismo contenido que tenías en tu Modal) */}
        </SafeAreaView>

      </BottomSheet>

   





{/* cambio  */}



    </View>
    
    </GestureHandlerRootView>
  );
};

export default MapScreenclient;



  // ... (otros estilos)

