// MapStyles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  selectButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'orange',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  selectButtonText: {
    color: 'white',
    fontSize: 18,
  },
});
