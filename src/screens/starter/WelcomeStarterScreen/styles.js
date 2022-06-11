import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'space-around',
        alignItems:'center'
    },
    title:{
        fontSize:20
    },
    centralImage:{
        width:250,
        height:250,
        flex: 1,
        resizeMode: 'contain',
    },
    actionBtn:{
        flex:1
    }
})