  import React, { useEffect, useRef, useState } from 'react'
  import {GetIdentificationTypesMercadoPagoUseCase } from '../../../../../Domain/useCases/mercadoPago/GetIdentificationTypesMercadoPago'
  import { IdentificationType } from '../../../../../Domain/entities/IdentificationType'
  import { CreateCardTokenMercadoPagoUseCase } from '../../../../../Domain/useCases/mercadoPago/CreateCardTokenMercadoPago'
  import { CardTokenParams } from '../../../../../Data/sources/remote/models/CardTokenParams'
  import { ResponseMercadoPagoCardToken } from '../../../../../Data/sources/remote/models/ResponseMercadoPagoCardToken'



  interface DropDownProps {
    label: string,
    value: string
  }

  const ClientPaymentFormViewModel = () => {
    
      const creditCardRef = useRef() as any
      const [values, setValues] = useState({
        brand: '', 
        cvv: '',
        expiration: '',
        holder: '',
        number: '',
      })

      const [identificationValues, setIdentificationValues] = useState({
        identificationNumber: '',
        identificationType: '',
      })

      

    const [identificationTypeList, setIdentificationTypeList] = useState<IdentificationType[]>([])
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState<DropDownProps[]>([])
  const [cardToken, setCardToken] = useState<ResponseMercadoPagoCardToken>()

      useEffect(() => {
      

        onChange('identificationType', value)
      }, [value])
      

      useEffect(() => {
        // console.log('VALUES FORM: ' + JSON.stringify(values, null, 3));
        // console.log('IDENTIFICATION VALUES FORM: ' + JSON.stringify(identificationValues, null, 3));
        if ( values.brand !== '' 
        && values.cvv !== ''
        && values.expiration !== ''
        && values.holder !== ''
        && values.number !== ''){
          createCardToken()

        }
      }, [values]);

      useEffect(() => {
      setDropDownItems();
      }, [identificationTypeList])
      
      
      const getIdentificationTypes = async () => {
        const result = await GetIdentificationTypesMercadoPagoUseCase();
        setIdentificationTypeList(result)
      }

      const createCardToken = async () => {
        const data: CardTokenParams = {
          card_number: values.number.replace(/\s/g, ''),
          expiration_year: values.expiration.split('/')[1],
          expiration_month: parseInt(values.expiration.split('/')[0]),
          security_code: values.cvv,
          cardholder:  {
            name: values.holder,
            identification: {
              number: identificationValues.identificationNumber,
              type: identificationValues.identificationType
            }
          }

        }
        const result = await CreateCardTokenMercadoPagoUseCase(data);
        if (result ) {
          if ( result.id !== '') {
            setCardToken(result);
          
          }
        }
        // console.log('RESPONSE MERCADO PAGO CARD TOKEN: ' + JSON.stringify(result, null, 3));
      }

      const onChange = (property: string, value: any) => {
        setIdentificationValues({ ...identificationValues, [property]: value })
    }

      const setDropDownItems = () => {
        let itemsIdentification: DropDownProps[] = [];
        identificationTypeList.forEach(identification => {
          itemsIdentification.push({
                label: identification.name,
                value: identification.id
            })
        });
        setItems(itemsIdentification)
    }

    

      const handleSubmit = React.useCallback(() => {
        // console.log('HANDLE SUBMIT');
        if (creditCardRef.current) {
          const {error, data} = creditCardRef.current.submit();
          if (error  === null) {
            setValues(data);
            // console.log('')
          }
          console.log('ERROR: ', error)
          console.log('card data: ', data)
        }
      }, [])
    
    
      return {
        ...identificationValues,
        creditCardRef,
        identificationTypeList,
        open,
        value,
        items,
        cardToken,
        handleSubmit,
        setOpen,
        setValue,
        setItems,
        getIdentificationTypes,
        onChange,
        createCardToken,
    }
  }

  export default ClientPaymentFormViewModel