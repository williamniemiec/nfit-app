import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  area: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ballonTriangle: {
    width: 0,
    height: 0,
    borderLeftColor: 'transparent',
    borderLeftWidth: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 15,
    borderRightColor: 'transparent',
    borderRightWidth: 15,
  },
  ballonArea: {
    width: '90%',
    padding: 20,
    backgroundColor: '#ccc',
    borderRadius: 10,
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ballonBigText: {
    fontSize: 15,
    marginBottom: 5,
    marginTop: 5,
  },
  startWorkout: {
    marginTop: 10,
  }
});
