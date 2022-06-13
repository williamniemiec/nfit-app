import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  area: {
    maxHeight: 50,
    flex: 1,
    flexDirection: 'row',
  },
  monthButton: {
    margin: 10,
    backgroundColor: '#ccc',
    borderRadius: 25,
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthLabel: {
    color: 'black',
  },
  dayButton: {
    justifyContent: 'center',
  },
  dayItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});
