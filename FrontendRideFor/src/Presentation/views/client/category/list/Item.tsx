// Item.tsx
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet, Linking } from 'react-native';
import { Category } from '../../../../../Domain/entities/Category';
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importar el paquete de iconos
import axios from 'axios';

interface Props {
  category: Category;
  width: number;
  navigation: StackNavigationProp<ClientStackParamList, 'ClientCategoryListScreen', undefined>;
}

export const ClientCategoryItem = ({ category, width, navigation }: Props) => {
  const defaultLocation = '123 Main St, City, Country';
  const [address, setAddress] = useState('');
  const [categoryAddressMap, setCategoryAddressMap] = useState<{ [categoryId: number]: string }>({});

  const callPhoneNumber = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const sendEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  const openMaps = (location: string) => {
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${location}`);
  };

  useEffect(() => {
    const apiKey = 'AIzaSyAb8gmVWDdRdDcjNRx0IXw82LE4dfA4xfg';
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${category.lat},${category.lng}&key=${apiKey}`;

    console.log('Latitud:', category.lat);
    console.log('Longitud:', category.lng);

    axios.get(apiUrl)
      .then(response => {
        if (response.data.status === 'OK') {
          const address = response.data.results[0].formatted_address;
          setCategoryAddressMap({ ...categoryAddressMap, [category.id!]: address });
          setAddress(address);
        } else {
          console.error('No se pudo encontrar la dirección.');
        }
      })
      .catch(error => {
        console.error('Error al hacer la solicitud a la API de Google Maps: ' + error);
      });
  }, []);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ClientProductListScreen', { id_category: category.id! });
      }}
      style={styles.container}
    >
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: category.image }} />
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.title}>{category.name}</Text>
          <View style={styles.contactInfo}>
            <View style={styles.iconContainer}>
              <Icon name="phone" size={20} color="#333" onPress={() => callPhoneNumber(category.phone)} />
              <Text style={styles.contactText}>{category.phone}</Text>
            </View>
            <View style={styles.iconContainer}>
              <Icon name="envelope" size={20} color="#333" onPress={() => sendEmail(category.email)} />
              <Text style={styles.contactText}>{category.email}</Text>
            </View>
            <View style={styles.iconContainer}>
  <Icon
    name="map-marker"
    size={20}
    color="#333"
    onPress={() => openMaps(categoryAddressMap[Number(category.id)] || defaultLocation)}
  />
  <Text style={styles.contactText}>{categoryAddressMap[Number(category.id)] || 'Cargando...'}</Text>
</View>

          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};



const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  cardInfo: {
    flex: 1,
    padding: 16,
  },
  title: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactInfo: {
    marginTop: 8,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  contactText: {
    marginLeft: 8,
    color: '#555',
  },
});
