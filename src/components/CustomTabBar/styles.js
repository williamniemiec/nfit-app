import { StyleSheet } from 'react-native';
import { borderColor } from 'styled-system';
import colors from '../../assets/colors';


export default StyleSheet.create({
  area: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.accent,
  },
  label: {
    paddingLeft: 10,
    paddingRight: 10,
    color: colors.textPrimary,
    display: 'none'
  },
  home: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 45,
    marginTop: -45,
    backgroundColor: colors.dark,
    borderWidth: 5,
    borderColor: colors.light
  },
  icon: {
    width: 60,
    height: 60,
  },
  focused: {},
  hide: {
    display: 'none',
  },
  btnContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    flex: 1,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnIcon: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },
  btnRegular: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },
});