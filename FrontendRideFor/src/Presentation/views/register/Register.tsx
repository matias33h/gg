import React, { useEffect, useState } from 'react'
import { Image, ActivityIndicator, View, Text, ScrollView, ToastAndroid, TouchableOpacity } from 'react-native';
import { CustomTextInput } from '../../components/CustomTextInput';
import { RoundedButton } from '../../components/RoundedButton';
import useViewModel from './ViewModel';
import styles from './Styles';
import { ModalPickImage } from '../../components/ModalPickImage';
import { StackScreenProps } from '@react-navigation/stack';
import { MyColors } from '../../theme/AppTheme';
import { RootStackParamList } from '../../navigator/MainStackNavigator';


interface Props extends StackScreenProps<RootStackParamList, 'RegisterScreen'>{};

export const RegisterScreen = ({navigation, route}: Props) => {

  const { name, lastname, email, image, phone, password, confirmPassword, loading, errorMessage, user, onChange, register, pickImage, takePhoto } = useViewModel();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (errorMessage != '') {
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
    }
  }, [errorMessage])

  useEffect(() => {      
    if (user?.id !== null && user?.id !== undefined) {
        navigation.replace('HomeScreen');
    }
  }, [user])
  

  return (
    // COLUMN
    <View style={styles.container}>

        <Image
          source={ require('../../../../assets/city.jpg') } 
          style={ styles.imageBackground }
          />

        <View style={ styles.logoContainer }>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            {
              image == ''
              ? <Image 
                  source={ require('../../../../assets/user_image.png') }
                  style={ styles.logoImage }
              />
              : <Image 
                  source={{ uri: image }}
                  style={ styles.logoImage }
                />
            }
            
          </TouchableOpacity>

          <Text style={ styles.logoText }>SELECCIONA UNA IMAGEN</Text>
        </View>

        <View style={ styles.form }>

          <ScrollView>

            <Text style={ styles.formText }>REGISTRARSE</Text>

            <CustomTextInput 
              placeholder='Nombres'
              keyboardType='default'
              image={ require('../../../../assets/user.png') }
              property='name'
              onChangeText={ onChange }
              value={ name }
              />


            <CustomTextInput 
              placeholder='Apellidos'
              keyboardType='default'
              image={ require('../../../../assets/my_user.png') }
              property='lastname'
              onChangeText={ onChange }
              value={ lastname }
              />
            
            <CustomTextInput 
              placeholder='Correo electronico'
              keyboardType='email-address'
              image={ require('../../../../assets/email.png') }
              property='email'
              onChangeText={ onChange }
              value={ email }
              />

            <CustomTextInput 
              placeholder='Telefono'
              keyboardType='numeric'
              image={ require('../../../../assets/phone.png') }
              property='phone'
              onChangeText={ onChange }
              value={ phone }
              />
            
            <CustomTextInput 
              placeholder='Contraseña'
              keyboardType='default'
              image={ require('../../../../assets/password.png') }
              property='password'
              onChangeText={ onChange }
              value={ password }
              secureTextEntry={ true }
              />
            
            <CustomTextInput 
              placeholder='Confirmar Contraseña'
              keyboardType='default'
              image={ require('../../../../assets/confirm_password.png') }
              property='confirmPassword'
              onChangeText={ onChange }
              value={ confirmPassword }
              secureTextEntry={ true }
              />

            <View style={{ marginTop: 30 }}>
                
                <RoundedButton text='CONFIRMAR' onPress={ () => register()} />

            </View>

          </ScrollView>

        </View>
        

        <ModalPickImage
          openGallery={ pickImage }
          openCamera={ takePhoto }
          modalUseState={ modalVisible }
          setModalUseState={ setModalVisible }
          />

        {
          loading && 
          <ActivityIndicator 
            style={styles.loading} 
            size="large" 
            color={ MyColors.primary }  
          />
        }
        

    </View>
    );
}
    
// HOT RELOAD


    



// RECONOCIMIENTO FACIAL 



// import React, { useState } from 'react';
// import { View, Text, Image, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native';
// import styles from './Styles';
// import { CustomTextInput } from '../../components/CustomTextInput';
// import { RoundedButton } from '../../components/RoundedButton';
// import useViewModel from './ViewModel';
// import { ModalPickImage } from '../../components/ModalPickImage';
// import { StackScreenProps } from '@react-navigation/stack';
// import { MyColors } from '../../theme/AppTheme';
// import { RootStackParamList } from '../../navigator/MainStackNavigator';

// interface Props extends StackScreenProps<RootStackParamList, 'RegisterScreen'> {};

// export const RegisterScreen = ({ navigation }: Props) => {
//   const { name, email, phone, password, image, loading, onChange, register, pickImage, takePhoto } = useViewModel();
//   const [modalVisible, setModalVisible] = useState(false);

//   const handleRegister = async () => {
//     if (loading) return;

//     try {
//       // Asegúrate de que la imagen esté en formato base64
//       const response = await fetch('http://<Tu-Dirección-IP>:5000/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username: name,
//           email: email,
//           phone: phone,
//           password: password,
//           image: image, // Asegúrate de que image esté en base64
//         }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         ToastAndroid.show('Registro exitoso', ToastAndroid.LONG);
//         navigation.navigate('OtraPantalla'); // Reemplaza con la pantalla a la que quieras navegar
//       } else {
//         ToastAndroid.show(data.message, ToastAndroid.LONG);
//       }
//     } catch (error) {
//       console.error(error);
//       ToastAndroid.show('Ocurrió un error en el registro', ToastAndroid.LONG);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* ... Resto de tu código */}

//       <RoundedButton text='CONFIRMAR' onPress={handleRegister} />

//       {/* ... Resto de tu código */}
//     </View>
//   );
// };
