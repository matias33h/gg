import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      flex: 1,
    },


    infoContainer: {
      position: 'absolute',
      top: 25, // Puedes ajustar según tus necesidades
      left: 5, // Puedes ajustar según tus necesidades
      backgroundColor: 'rgba(255, 255, 255, 0.7)', // Fondo semi-transparente
      padding: 10,
      borderRadius: 10, // Bordes redondeados
    },
    
    infoText: {
      fontSize: 11,
    },
    zoomIn: {
      position: 'absolute',
      bottom: 260,
      right: 10,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: 10,
      borderRadius: 20,
    },
    zoomOut: {
      position: 'absolute',
      bottom: 229,
      right: 10,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: 10,
      borderRadius: 40,
    },
    titleStyle: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      padding: 10,
    },
//     modalContainer: {
//       flex: 1,
//       justifyContent: 'flex-end',
//       alignItems: 'center',
//   },
    modalView: {
      width: '100%',
      backgroundColor: "white",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 15,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
  },
  modalButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
  },
  modalTitle: {
      fontSize: 18,
      marginBottom: 15,
      textAlign: "center"
  },
  closeButton: {
      backgroundColor: "#2196F3",
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      marginTop: 10
  },
  textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
  },


  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
  },
  draggableIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    margin: 10,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  
    alignItems: 'center', // Centra verticalmente los elementos
    paddingVertical: 10, // Espacio vertical interno
    paddingHorizontal: 20, // Espacio horizontal interno
    borderBottomWidth: 0.5, // Línea inferior para separar las opciones
    borderBottomColor: '#d3d3d3', // Color de la línea inferior
  },
  orderButton: {
    backgroundColor: 'purple',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    margin: 20,
  },
  orderButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  vehicleList: {
    width: '100%', // Toma todo el ancho disponible del contenedor padre
    maxHeight: 200, // Altura máxima para que se pueda desplazar si hay más elementos
    padding: 10, // Espacio interior para separar los elementos del borde
},

// handleIndicator: {
//   backgroundColor: 'gray',
//   width: 50,
//   height: 6,
//   borderRadius: 3,
//   // Añadir más estilos según necesites
// },
handleContainer: {
  alignItems: 'center',
  paddingVertical: 10,
  paddingHorizontal: 10,
},
handleIndicator: {
  width: 50,
  height: 5,
  borderRadius: 2.5,
  backgroundColor: 'black', // o el color que prefieras
  marginBottom: 5,
},
handleText: {
  fontSize: 12,
},



  });
  