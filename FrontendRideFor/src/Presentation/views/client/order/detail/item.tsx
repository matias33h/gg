import React from 'react'
import { Product } from '../../../../../Domain/entities/Product';
import { Image, View,StyleSheet, Text } from 'react-native';

interface Props{
    product:Product
}


export const OrderDetailItem = ({product}:Props) => {


  
    return (
        <View style={styles.container}>
            <Image
            source={{uri:product.image1}}
            style={styles.image}
            />

            <View style={styles.ProductInfo}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.quantity}>Solicitud de Viaje: {product.quantity}</Text>
            </View>

        </View>
    )
  }


  const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        marginTop:10,
        marginHorizontal:20,
        alignItems:'center'
    },
    image:{
        height:60,
        width:60,
        borderRadius:15
    },
    name:{
        fontWeight:'bold',

    },
    quantity:{
        fontSize:13
    },
    ProductInfo:{
      marginLeft:15,
      marginTop:5 
    }

  })
  