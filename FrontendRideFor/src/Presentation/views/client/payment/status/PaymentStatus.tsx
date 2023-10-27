import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext } from 'react'
import { Image, Text, View } from 'react-native'
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator'
import  styles  from './Styles'
import { RoundedButton } from '../../../../components/RoundedButton'
import { UserContext } from '../../../../context/UserContext'

interface Props extends StackScreenProps<ClientStackParamList, 'ClientPaymentStatusScreen'>{};

export const ClientPaymentStatusScreen = ({navigation, route}: Props) => {
 
    const {paymentData} = route.params
    console.log('Payment data: ' + JSON.stringify(paymentData, null, 3));
    


    return (
    <View style={styles.container}>

        {
            paymentData.status === 'approved' 
            ? <Image 
            style={styles.image}
            source={require('../../../../../../assets/checked.png')}
            
            />
            : 
            <Image 
            style={styles.image}
            source={require('../../../../../../assets/cancelar.png')}
            
            />
        }

        {

            paymentData.status === 'approved'
            ? <Text style={styles.description}>Tu orden fue procesada exitosamente usando {paymentData.payment_method_id} **** {paymentData.card.last_four_digits}</Text>
            : <Text style={styles.description}>La transaccion fallo</Text>
        }
        {
            paymentData.status === 'approved' &&
            <Text style={styles.info}>Mira el estado de tu compra en la seccion de MIS PEDIDOS</Text>
        }

       <View style={styles.button}>
        
        <RoundedButton text='FINALIZAR COMPRA' onPress={() => navigation.replace('ClientCategoryListScreen')}/>
       </View>
       
    </View>
  )
}

