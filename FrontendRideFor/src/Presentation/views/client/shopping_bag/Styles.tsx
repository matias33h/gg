import { StyleSheet } from "react-native"

const ClientShoppingBagStyles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'white'
    },
    totalToPay: {
        flexDirection: 'row',
        height: 70,
        backgroundColor: '#f2f2f2',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 30
    },
    totalInfo: {
        alignItems: 'center',
        
        
    },
    totalText: {
        fontWeight: 'bold',
        fontSize: 17
    },
    buttonAdd: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        left: '30%', // Agrega esta línea para centrarlo horizontalmente
      }
});

export default ClientShoppingBagStyles;