import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainStackNavigator } from './src/Presentation/navigator/MainStackNavigator';


// definimos que tipo de datos van a recibir las pantallas
// le paso undefaind porque no le estoy pasando ninguna pantalla. (no paso ningun dato)

const App = () => {
  return (
    <NavigationContainer>
    
    <MainStackNavigator />

    </NavigationContainer>
  );
};




export default App



