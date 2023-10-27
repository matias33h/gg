import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react'
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native'
import { RootStackParamList } from '../../navigator/MainStackNavigator';
import { Rol } from '../../../Domain/entities/Rol';
import { MyColors } from '../../theme/AppTheme';

interface Props {
    rol: Rol,
    height: number,
    width: number,
    navigation: StackNavigationProp<RootStackParamList, "RolesScreen", undefined>,
    onPress: () => void, // Agregar prop onPress para manejar el evento onPress
    isActive: boolean, // Agregar prop isActive para determinar si el rol está activo
}

export const RolesItem = ({ rol, height, width, navigation, onPress, isActive }: Props) => {
    return (
        <TouchableOpacity
          onPress={onPress}
          style={{
            ...styles.container,
            height: height,
            width: width,
            borderColor: isActive ? 'blue' : 'transparent', // Cambia el borde para resaltar el rol activo
          }}
        >
        <View style={ styles.imageContainer }>
            <Image 
                style={styles.image}
                source={{ uri: rol.image}}
            />
            <View style={styles.titleContainer}>
                <Text style={ styles.title }>{ rol.name }</Text>
            </View>
        </View>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        paddingBottom: 20,
        paddingHorizontal: 7,
    },
    imageContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 18
    },
    image: {
        flex: 1,
        resizeMode: 'contain'
    },
    titleContainer: {
        height: 50,
        backgroundColor: MyColors.primary,
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: 'white'
    }
})
