import { StyleSheet } from 'react-native'
import colors from '../../resources/colors';

export default StyleSheet.create({
    background:{
        flex:1,
        backgroundColor:'black'
    },
    icon:{
        width:30,
        height:30,
        margin:15
    },
    lightBackground:{
        flex:1,
        backgroundColor:`rgba(${colors.accentRgb},0.5)`
    },
    header:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        alignItems:'center'
    },
    title:{
        color:'white',
        marginLeft:20,
        fontSize:18
    },
    workoutList:{
        width:'90%',
        flex:1
    }
})