import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container:{
        flex:1,
        margin:10
    },
    center:{
        justifyContent:'space-around',
        alignItems:'center'
    },
    title:{
        fontSize:23,
        color: 'white'
    },
    panel:{
        backgroundColor:'rgba(50, 50, 50, 0.5)',
        borderWidth:1,
        borderColor:'#444',
        borderRadius: 5,
        marginHorizontal: 10,
        marginBottom: 10
    },
    message:{
        fontSize:15,
        marginTop:10,
        marginBottom:10,
        color: 'white',
        textAlign: 'center'
    },
    highlight:{
        fontWeight:'bold',
        color:'white'
    }
})