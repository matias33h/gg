import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { ActivityIndicator, Text, ToastAndroid, View } from 'react-native'
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator'
import DropDownPicker from 'react-native-dropdown-picker'
import useViewModel from './ViewModel'
import  styles  from './Styles'
import { RoundedButton } from '../../../../components/RoundedButton'
import { MyColors } from '../../../../theme/AppTheme'

interface Props extends StackScreenProps<ClientStackParamList, 'ClientPaymentInstallmentsScreen'>{};

export const ClientPaymentsInstallmentsScreen = ({route, navigation}: Props) => {
  
    const {cardToken} = route.params;
    const {open, loading, value,createPayment, responseMessage, getInstallments, items, setOpen, setValue, setItems} = useViewModel(cardToken)
   
   useEffect(() => {
    getInstallments()
   }, [])
   
   useEffect(() => {
    if (responseMessage !== '') {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    }
   }, [responseMessage])
   
   
    return (
    <View style= {styles.container}>
      <Text style={styles.textNumberInstallments}>Elije el numero de cuotas</Text>
      <View style={styles.dropdownContainer}>

        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
      </View>


      <View style={styles.buttonContainer}>
        <RoundedButton text='PROCESAR PAGO' onPress={() => createPayment()}/>
      </View>

      {
          loading && 
          <ActivityIndicator 
            style={styles.loading} 
            size="large" 
            color={ MyColors.primary }  
          />
        }
    </View>
  )
  
}
