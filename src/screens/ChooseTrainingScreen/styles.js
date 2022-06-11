import { StyleSheet } from 'react-native'
import colors from '../../assets/colors';

export default StyleSheet.create({
    body:{
        margin:15
    },
    area:{
        width:300,
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:"center",
        backgroundColor:`rgba(${colors.accentRgb},0.8)`,
        borderRadius:10,
        borderWidth:1,
        borderColor: colors.accent,
        margin:10
    },
    icon:{
        width:30,
        height:30,
        margin:15
    }
})