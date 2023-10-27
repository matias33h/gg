import { StyleSheet } from "react-native";
import { MyColors } from "../../../../theme/AppTheme";

const AdminOrderDetailStyle = StyleSheet.create({ 
    container:{
        flex:1
    },
    conduct:{
        width:'100%',
        height:'45%'
    },

    info:{
        width:'100%',
        height:'55%',
        backgroundColor:'white',
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        paddingHorizontal:30
    },

    infoRow:{
        flexDirection:'row',
        marginTop:15
     
    },
    infoImage:{
        width:30,
        height:30,
        marginTop:7
     
    },
    infoText:{
        flex:1
    },
    title:{
        color:'black'
    },
    infoDescription:{
        color:'gray',
        fontSize:13,
        marginTop:3
    },
    conductores:{
        fontWeight:'bold',
        marginTop:15,
        color:MyColors.primary
    },

    totalInfo:{
      marginTop:25,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center'
    },

    total:{
      fontWeight:'bold',
      fontSize:17
    },

    button:{
        width:'50%',
    },
    dropDown: {
        marginTop: 15
    }

    
    });

    export default AdminOrderDetailStyle