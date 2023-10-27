import React, { useContext, useState } from 'react';
import { View, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { RolesItem } from './Item';
import useViewModel from './ViewModel';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigator/MainStackNavigator';
import { UserRepositoryImpl } from '../../../Data/repositories/UserRepository';
import { UserContext } from '../../context/UserContext';

interface Props extends StackScreenProps<RootStackParamList, 'RolesScreen'> {}

export const RolesScreen = ({ navigation }: Props) => {
  const { user } = useViewModel();
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [mode, setMode] = useState<any>('horizontal-stack');
  const [snapDirection, setSnapDirection] = useState<'left' | 'right'>('left');
  const userRepository = new UserRepositoryImpl();
  const viewModel = useViewModel(); // Obtén el ViewModel
  const [showRoleSelection, setShowRoleSelection] = useState(true)
  const { saveUserSession, getUserSession} = useContext(UserContext)
  
  
  const updateUserRole = async (newRole: string) => {
    // Verifica si el usuario es válido antes de continuar
    if (user && user.id) { // Asegúrate de que user.id no sea undefined
      const updatedUser = { 
        ...user,
        roles: [
          {
           // Debes proporcionar un ID válido
            name: newRole,
     
            // Añade otras propiedades de Rol si son necesarias
          }
        ] 
      };
      try {
        const response = await userRepository.changeUserRole(user.id, newRole);

        
        // Luego, guarda el usuario actualizado en el contexto
        saveUserSession(updatedUser);
        getUserSession()
        console.log('USUARIO DE SESION: ' + JSON.stringify(getUserSession));
        if (response.success) {
          // Actualiza la interfaz de usuario para reflejar el nuevo rol activo
          // Esto podría incluir resaltar el rol seleccionado, mostrar un mensaje, etc.
          // Actualiza el rol activo en el ViewModel
          viewModel.changeUserRole(newRole);
          console.log('Rol elegido:', newRole)
          console.log('Valor de newRole:', newRole);
          console.log('Contenido de saveUserSession:', saveUserSession);
          // Actualiza la navegación aquí en función del nuevo rol
          console.log("Rol activo: ", viewModel.activeRole)
          if (newRole === 'Pasajero') {
            navigation.replace('ClientTabsNavigator');
          } else if (newRole === 'Conductor') {
            navigation.replace('ConductorTabsNavigator');
          } else if (newRole === 'Empresas') {
            navigation.replace('AdminTabsNavigator');
          }
        } else {
          // Maneja el caso de error, por ejemplo, mostrando un mensaje de error
          console.error('Error al cambiar el rol del usuario:', response.message);
        }
      } catch (error) {
        // Maneja cualquier excepción que pueda ocurrir durante la solicitud
        console.error('Error al cambiar el rol del usuario:', error);
      }
    } else {
      // Maneja el caso en que user o user.id sea null o undefined
      console.error('El usuario o user.id no está definido');
    }
  };

  

  return (
    <GestureHandlerRootView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View>
        <Carousel
          loop={false}
          width={width}
          height={height / 2}
          autoPlay={false}
          data={user?.roles!}
          scrollAnimationDuration={5000}
          onSnapToItem={(index) => console.log('current index:', index)}
          renderItem={({ item }) => (
            <RolesItem
              rol={item}
              height={420}
              width={width - 100}
              navigation={navigation}
              onPress={() => updateUserRole(item.name)}
              isActive={item.name === viewModel.activeRole}
            />
          )}
          modeConfig={{
            snapDirection,
            stackInterval: 30,
          }}
          mode={mode}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default RolesScreen;
