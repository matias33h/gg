import React, {useState, useEffect} from 'react'
import { View, Text, TouchableOpacity, Image, ActivityIndicator, ToastAndroid } from 'react-native';
import { CustomTextInput } from '../../../../components/CustomTextInput';
import { ModalPickImage } from '../../../../components/ModalPickImage';
import { RoundedButton } from '../../../../components/RoundedButton';
import { MyColors, MyStyles } from '../../../../theme/AppTheme';
import styles from './Styles';
import useViewModel from './ViewModel';
import { StackScreenProps } from '@react-navigation/stack';
import { CategoryStackParamList } from '../../../../navigator/AdminCategoryNavigator';



interface Props extends StackScreenProps<CategoryStackParamList, 'AdminCategoryCreateScreen'>{};

export const AdminCategoryCreateScreen = ({navigation,route}:Props) => {

  const { name, description, email, phone, refPoint, responseMessage, loading, image, onChange, takePhoto, pickImage, onChangeRefpoint, createCategory } = useViewModel();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (responseMessage !== '') {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    }
  }, [responseMessage])

  useEffect(() => {
    if (route.params?.refPoint) {
    //   si route.params?.refPoint existe,  le establecemos a la propiedad refPoint su valor que nos envain por parametro 
    onChangeRefpoint(route.params?.refPoint,route.params?.latitude,route.params?.longitude)
    }


    // cuando el punto de referencia cambie su estado 
}, [route.params?.refPoint])

  

  return (
    <View style={styles.container}>

    <TouchableOpacity

        style={styles.imageContainer}
        onPress={() => setModalVisible(true)}
    >


        {
            image == ''
                ?
                <Image
                    style={styles.image}
                    source={require('../../../../../../assets/image_new.png')}
                />
                :
                <Image source={{ uri: image }} style={styles.image} />
        }




    </TouchableOpacity>
    <View style={styles.form}>
        {/* <ScrollView> */}
        <CustomTextInput
            placeholder='Nombre de la Empresa'
            image={require('../../../../../../assets/th.jpg')}
            keyboardType='default'
            property='name'
            value={name}
            onChangeText={onChange}

        />
        <CustomTextInput
            placeholder='Descripcion de la Empresa'
            image={require('../../../../../../assets/description.png')}
            keyboardType='default'
            property='description'
            value={description}
            onChangeText={onChange}

        />

        <CustomTextInput
            placeholder='Email de la empresa'
            image={require('../../../../../../assets/th.jpg')}
            keyboardType='default'
            property='email'
            value={email}
            onChangeText={onChange}

        />

        <CustomTextInput
            placeholder='Telefono'
            image={require('../../../../../../assets/th.jpg')}
            keyboardType='default'
            property='phone'
            value={phone}
            onChangeText={onChange}

        />

            <   TouchableOpacity
                onPress={()=>navigation.navigate('AdminAddressMapScreen')}
                >

                <CustomTextInput
                    placeholder='Punto de referencia'
                    image={require('../../../../../../assets/th.jpg')}
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






    <ModalPickImage
        // traigo los metodos,pickImage
        openGallery={pickImage}
        openCamera={takePhoto}
        modalUseState={modalVisible}
        setModalUseState={setModalVisible}
    /> 



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
            text='Crear Perfil de Empresa'
            onPress={() => createCategory()}
        />

    </View>




    {/* {Success && <Text style={styles.successMess}>{responseMessage}</Text>} */}




</View>
  )
}
