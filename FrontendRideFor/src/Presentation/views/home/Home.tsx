import React, { useState, useEffect, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Image, View, Text, TextInput, ToastAndroid, StyleSheet, TouchableOpacity } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'
import useViewModel from './ViewModel';
import styles from './Styles';
import { CustomTextInput } from '../../components/CustomTextInput';
import { RootStackParamList } from '../../navigator/MainStackNavigator';
import { UserContext } from '../../context/UserContext';


interface Props extends StackScreenProps<RootStackParamList, 'HomeScreen'>{};

export const HomeScreen = ({navigation, route}: Props) => {

    const { email, password, errorMessage, onChange, login } = useViewModel();
    const { user } = useContext(UserContext)
    
    useEffect(() => {
        if (errorMessage !== '') {
            ToastAndroid.show(errorMessage, ToastAndroid.LONG);
        }
    }, [errorMessage])

   

    useEffect(() => {
        if (user?.id !== null && user?.id !== undefined && user?.id !== '') {
            console.log("Usuarios roles: ", user.roles)
          if (user.roles?.length === 3) {
            
            navigation.replace('RolesScreen');
          } else if (user.roles?.some((role) => role.id === '1')) {
            navigation.replace('ClientTabsNavigator');
          }else if (user.roles?.some((role) => role.id === '2')) {
            navigation.replace('ConductorTabsNavigator');
          } else if (user.roles?.some((role) => role.id === '3')) {
            navigation.replace('AdminTabsNavigator');
          }
        }
      }, [user, navigation]);
    
    
    return (
    // COLUMN
    <View style={styles.container}>
        <Image
            source={ require('../../../../assets/pueblo.jpg') } 
            style={ styles.imageBackground }
        />

        <View style={ styles.logoContainer }>
            <Image 
                source={ require('../../../../assets/auto2.jpg') }
                style={ styles.logoImage }
            />

            <Text style={ styles.logoText }>RIDEFOR</Text>
        </View>

        <View style={ styles.form }>

            <Text style={ styles.formText }>INGRESAR</Text>
            
            <CustomTextInput 
                image={ require('../../../../assets/email.png') }
                placeholder='Correo electronico'
                keyboardType='email-address'
                property='email'
                onChangeText={ onChange }
                value={ email }
            />
        
            <CustomTextInput 
                image={ require('../../../../assets/password.png') }
                placeholder='Contraseña'
                keyboardType='default'
                property='password'
                onChangeText={ onChange }
                value={ password }
                secureTextEntry={ true }
            />

            <View style={{ marginTop: 30 }}>
                
                <RoundedButton text='LOGIN' onPress={ () => login()} />

            </View>

            <View style={ styles.formRegister }>
                <Text>No tienes cuenta?</Text>
                
                <TouchableOpacity onPress={ () => navigation.navigate('RegisterScreen') }>
                    <Text style={ styles.formRegisterText }>Registrate</Text>
                </TouchableOpacity>
                
            </View>

        </View>
        
    </View>
    );
}
    
