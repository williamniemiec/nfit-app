import { StyleSheet } from 'react-native';
import colors from '../../assets/colors';


export default StyleSheet.create({
  area: {
    flexDirection: 'row',
    alignItems: 'center',
    color: 'white',
    backgroundColor: `rgba(${colors.accentRgb},0.6)`,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.accent,
    margin: 10,
  },
  add: {
    width: 30,
    height: 30,
    margin: 15,
  },
});
