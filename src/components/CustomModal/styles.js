import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    body:{
        margin:10,
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    modalBoxArea:{
        flex:1,
        backgroundColor:'rgba(0, 0, 0, 0.5)',
        justifyContent:'center',
        alignItems:'center'
    },
    modalBox:{
        width:'90%',
        padding:20,
        backgroundColor:'white',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#777'
    },
    modalClose:{
        height:40,
        alignSelf:'flex-end'
    },
    closeText:{
        fontSize:25
    }
})