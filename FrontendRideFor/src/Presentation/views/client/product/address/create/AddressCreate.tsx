import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, ActivityIndicator, ToastAndroid } from 'react-native';
import { CustomTextInput } from '../../../../../components/CustomTextInput';
import { ModalPickImage } from '../../../../../components/ModalPickImage';
import { RoundedButton } from '../../../../../components/RoundedButton';
import { MyColors, MyStyles } from '../../../../../theme/AppTheme';
import styles from './Styles';
import useViewModel from './ViewModel';
import { StackScreenProps } from '@react-navigation/stack';
import { ClientStackParamList } from '../../../../../navigator/ClientStackNavigator';


interface Props extends StackScreenProps<ClientStackParamList, 'ClientAddressCreateScreen'>{};

export const ClientAddressCreateScreen = ({navigation,route}:Props) => {

    const { address, neighborhood, responseMessage, refPoint, loading, onChange, onChangeRefpoint,createAddress } = useViewModel();
    const [modalVisible, setModalVisible] = useState(false);






    useEffect(() => {
        if (route.params?.refPoint) {
        //   si route.params?.refPoint existe,  le establecemos a la propiedad refPoint su valor que nos envain por parametro 
        onChangeRefpoint(route.params?.refPoint,route.params?.latitude,route.params?.longitude)
        }


        // cuando el punto de referencia cambie su estado 
    }, [route.params?.refPoint])
    


   


    useEffect(() => {
        if (responseMessage !== '') {
            ToastAndroid.show(responseMessage, ToastAndroid.LONG);
        }
    }, [responseMessage])


    return (
        <View style={styles.container}>

            <TouchableOpacity

                style={styles.imageContainer}
                onPress={() => setModalVisible(true)}
            >
                <Image
                    style={styles.image}
                    source={require('../../../../../../../assets/map.png')}
                />


            </TouchableOpacity>



            <View style={styles.form}>
                {/* <ScrollView> */}
                <CustomTextInput
                    placeholder='Nombre de la direccion'
                    image={require('../../../../../../../assets/google-maps.png')}
                    keyboardType='default'
                    property='address'
                    value={address}
                    onChangeText={onChange}

                />
                <CustomTextInput
                    placeholder='Barrio'
                    image={require('../../../../../../../assets/neighborhood.png')}
                    keyboardType='default'
                    property='neighborhood'
                    value={neighborhood}
                    onChangeText={onChange}

                />


                <TouchableOpacity
                onPress={()=>navigation.navigate('ClientAddressMapScreen')}
                >
                
                <CustomTextInput
                    placeholder='Punto de referencia'
                    image={require('../../../../../../../assets/pin.png')}
                    keyboardType='default'
                    property='refPoint'
                    value={refPoint}
                    onChangeText={onChange}
                    editable={false}
                    />

                 </TouchableOpacity>


                {/* <CustomTextInput
        placeholder='Número de Identificación Fiscal'
        image={require('../../../../../../../assets/description.png')}
        keyboardType='default'
        property='description'
        value={description}
        onChangeText={onChange}

        />
        <CustomTextInput
        placeholder='Dirección de la Empresa'
        image={require('../../../../../../../assets/description.png')}
        keyboardType='default'
        property='description'
        value={description}
        onChangeText={onChange}

        />
        <CustomTextInput
        placeholder='Número de Teléfono'
        image={require('../../../../../../../assets/description.png')}
        keyboardType='default'
        property='description'
        value={description}
        onChangeText={onChange}

        />
        <CustomTextInput
        placeholder='Correo Electrónico'
        image={require('../../../../../../../assets/description.png')}
        keyboardType='default'
        property='description'
        value={description}
        onChangeText={onChange}

        /> */}


                {/* </ScrollView> */}





                {
                    loading &&

                    <ActivityIndicator
                        style={MyStyles.loading}
                        size="large"
                        color={MyColors.primary} />

                }

            </View >




            <View style={styles.buttoContainer}>
                <RoundedButton
                    text='Agregar Direccion'
                    onPress={() => createAddress()}
                />

            </View>




            {/* {Success && <Text style={styles.successMess}>{responseMessage}</Text>} */}




        </View>
    )
}
