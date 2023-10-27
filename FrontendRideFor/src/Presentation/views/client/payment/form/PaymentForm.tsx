import React, { useEffect, useState } from 'react'
import { Button, ScrollView, KeyboardAvoidingView, Text, View } from 'react-native'
import  styles  from './Styles'
import useViewModel from './ViewModel'
import CreditCard from 'react-native-credit-card-form-ui'
import { Platform } from 'expo-modules-core'
import { RoundedButton } from '../../../../components/RoundedButton'
import DropDownPicker from 'react-native-dropdown-picker'
import { CustomTextInput } from '../../../../components/CustomTextInput'
import { StackScreenProps } from '@react-navigation/stack'
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator'

interface Props extends StackScreenProps<ClientStackParamList, 'ClientPaymentFormScreen'>{};

export const ClientPaymentFormScreen = ({navigation, route}: Props) => {
  
  const {creditCardRef, cardToken, createCardToken, onChange, identificationNumber, identificationTypeList, open, value, items, setItems, setOpen, setValue, getIdentificationTypes, handleSubmit} = useViewModel()

  
  useEffect(() => {
   getIdentificationTypes()
  }, [])
  
  useEffect(() => {
    if (cardToken !== undefined && cardToken !== null) {
      navigation.navigate('ClientPaymentInstallmentsScreen', {cardToken: cardToken})
    }
  }, [cardToken])
  

  return (
    <View style={styles.container}>
      <View style={styles.form}>

        <CreditCard ref={creditCardRef} background={'#e2e2e2'} 
        textColor={'black'}
        labels={{

          holder: 'Titular',
          cvv: 'Codigo de seguridad',
          expiration: 'Expiracion'
        }
        }

        placeholders={{
          number: '0000 0000 0000 0000',
          cvv: 'xxx',
          expiration: 'MM/YYYY',
          holder: 'NOMBRE DEL TITULAR'
        }}

        placeholderTextColor={'gray'}
        
        />

        
      </View>
      <ScrollView>

      </ScrollView>

        <View style={styles.dropdown}>
         <DropDownPicker


            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />


          
          <CustomTextInput 
              placeholder='Numero de identificacion'
              keyboardType='default'
              image={ require('../../../../../../assets/document.png') }
              property='identificationNumber'
              onChangeText={ onChange }
              value={ identificationNumber }
            />





        </View>
       
   
        <View style={styles.buttonContainer}>
          <RoundedButton text='CONTINUAR' onPress={() => handleSubmit()}/>
        </View>
   
    </View>
  )
}
