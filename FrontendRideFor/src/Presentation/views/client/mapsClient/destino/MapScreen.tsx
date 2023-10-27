import React from 'react';
import MapView, { Polyline } from 'react-native-maps';

// Definir una interfaz para los parámetros de la ruta
interface RouteParams {
  origin: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
}

// Definir una interfaz para las props del componente
interface MapScreenProps {
  route: {
    params: RouteParams;
  };
}

const MapScreen: React.FC<MapScreenProps> = ({ route }) => {
  const { origin, destination } = route.params;

  const routeCoordinates = [
    origin,
    // Agrega más puntos intermedios si es necesario
    destination,
  ];

  return (
    <MapView style={{ flex: 1 }}>
      <Polyline
        coordinates={routeCoordinates}
        strokeWidth={2}
        strokeColor="blue"
      />
    </MapView>
  );
};

export default MapScreen;
