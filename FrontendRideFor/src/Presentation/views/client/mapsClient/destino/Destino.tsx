

import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, Alert, Image, Platform, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { GaussianBlur } from 'react-native-image-filter-kit';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

const GOOGLE_API_KEY = 'AIzaSyAb8gmVWDdRdDcjNRx0IXw82LE4dfA4xfg'; // Asegúrate de proteger tu clave API

type RootStackParamList = {
  MapScreenclient: {
    origin: { latitude: number; longitude: number };
    destination: { latitude: number; longitude: number };
  };
  // Otras pantallas pueden ser añadidas aquí
};

type NavigationProps = StackNavigationProp<RootStackParamList>;

export const ClientViajeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  const [origin, setOrigin] = useState<{ latitude: number; longitude: number } | null>(null);
  const [destination, setDestination] = useState<{ latitude: number; longitude: number } | null>(null);

  const handleStartTrip = () => {
    if (origin && destination) {
      navigation.navigate('MapScreenclient', {
        origin,
        destination,
      });
    } else {
      Alert.alert('Error', 'Por favor, seleccione el origen y el destino antes de comenzar el viaje.');
    }
  };

  const handleSelectPlace = (placeType: 'origin' | 'destination') => (data: any, details: any) => {
    if (details && details.geometry) {
      const { lat, lng } = details.geometry.location;
      const location = { latitude: lat, longitude: lng };
      if (placeType === 'origin') setOrigin(location);
      if (placeType === 'destination') setDestination(location);
    }
  };

  return (
    <View style={styles.container}>
   
   <Image
        source={require('../../../../../../assets/ff.jpg')}
        style={styles.imageBackground}
      />

          <View style={styles.contentContainer}>
           <BlurView intensity={0} style={styles.overlay}>
            <View style={styles.autocompleteContainer}>
              <GooglePlacesAutocomplete
                placeholder='Origen'
                fetchDetails={true}
                debounce={400}
                styles={autocompleteStyles}
                onPress={handleSelectPlace('origin')}
                query={{ key: GOOGLE_API_KEY, language: 'es' }}
              />
              <GooglePlacesAutocomplete
                placeholder='Destino'
                fetchDetails={true}
                debounce={400}
                styles={autocompleteStyles}
                onPress={handleSelectPlace('destination')}
                query={{ key: GOOGLE_API_KEY, language: 'es' }}
              />
            </View>
        </BlurView>
            <View style={styles.bottomButton}>

            <TouchableOpacity onPress={handleStartTrip}>
              <LinearGradient
                colors={['#00feff', '#0b0979', '#8a28c7']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <Text style={styles.buttonText}>Comenzar Viaje</Text>
              </LinearGradient>
            </TouchableOpacity>
              {/* <Button title="Comenzar Viaje" onPress={handleStartTrip} /> */}
            </View>
          </View>







    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  imageBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  gradientButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  autocompleteContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    zIndex: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
  },
});

const autocompleteStyles = {
  textInputContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  textInput: {
    marginLeft: 0,
    marginRight: 0,
    height: 38,
    color: '#5d5d5d',
    fontSize: 16,
  },
  predefinedPlacesDescription: {
    color: '#1faadb',
  },
};
