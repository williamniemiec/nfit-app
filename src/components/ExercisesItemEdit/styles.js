import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    area:{
        height:50,
        marginBottom:10,
        backgroundColor:'white',
        minWidth:'100%',
        flexDirection:'row'
    },
    exerciseInfo:{
        flexDirection:'column',
        justifyContent:'center',
        marginLeft:5
    },
    exerciseName:{
         fontSize:15,
        color:'black',
    },
    exerciseDetails:{
        fontSize:12,
        color:'#999',
    },
    iconArea:{
        justifyContent:'center',
        height:50,
        backgroundColor:'red'
    },
    icon:{
        width:30,
        height:30,
        marginLeft:10
    }
})