import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    text_light : {
        color : 'white'
    },  


    header : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        width : "95%",
        alignSelf : "center"
    },

    lightOn : {
        backgroundColor : '#7BFF6F',
    },

    lightOff : {
        backgroundColor : '#FD6E67',
    },

    light_status_icon : {
        width : 50,
        height : 50,
        alignItems : 'center',
        justifyContent : 'center',
        padding : 10,
        borderRadius : 100,
        borderWidth : 1,
        borderColor : '#474747',
    },

    light_logo : {
        flexDirection : 'row',
        alignItems : 'center',
        gap : 5,
    },

    border_danger : {
        borderColor : '#d74338'
    },

    text_danger : {
        color : '#d74338'
    },

    light_control : {
        alignSelf : 'center',
        marginTop : 10,
        width : '95%',
        height : 85,
        borderWidth : 1,
        borderColor : '#D9D9D9',
        borderRadius : 15,
        flex : 0,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        paddingLeft : 20,
        paddingRight : 20,
    },

    f_gray : {
        color : '#5E5E5E'
    },

    f_big : {
        fontSize : 25,
    },

    env_img : {
        width : 40,
        height :40,
    },

    environment_box : {
        justifyContent : 'center', 
        alignItems : 'center',
        width : 100, 
        height : 100,
        backgroundColor : 'white',
        borderRadius : 15,
    },


    environment_content_box : {
        height : 'auto',
        flex : 1,
        flexDirection : 'row',
        justifyContent : 'space-evenly', 
        alignItems : 'center',
    },


    font_s : {
        fontSize : 10,
    }, 

    font_s_gray : {
        fontSize : 8,
        color : '#5E5E5E'
    },

    logo_contaier : {
        flex : 0, 
        flexDirection : 'row',
        alignItems : 'center',
        gap : 10,
    },


    logo : {
        width :30,
        height : 30,
    },  

    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {    
        width : '95%',
        flex: 1,
        alignSelf : 'center'
    },
    environtment_content : {
        marginTop : 10,
        width : 'auto',
        height : 160,
        backgroundColor : '#47626D',
        borderRadius : 15,
        padding : 10,
    },
    text_label : {
        fontSize : 8,
        color : '#474747',
    },

    text_label_light : {
        fontSize : 8,
        color : 'white',
    },

    
    food_water_container : {
        flexDirection : 'row',
        width : 'auto',
        justifyContent : 'center',
        marginTop : 10,
        gap : 10
    },

    food_content: {
        padding : 10,
        width : 180,
        height : 190,
        borderWidth : 1,
        borderColor : '#D9D9D9',
        borderWidth : 1,
        borderRadius : 15,
    }, 

    food_content_box : {
        marginTop : 5,
        flex : 0,
        width : 'auto',
        alignItems : 'center',
        gap : 5
    },

    food_img : {
        width : 100,
        height : 100
    },

    water_img : {
        width : 130,
        height : 130
    },

    water_content : {
        padding : 10,
        width : 180,
        height : 230,
        borderWidth : 1,
        borderColor : '#D9D9D9',
        borderWidth : 1,
        borderRadius : 15,
    },

    manage_btn : {
        marginTop : 5,
        width : 180,
        height : 35,
        borderColor : '#474747',
        borderWidth : 1,
        borderRadius : 50,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : '#EBEBEB',
    },
    lightSwitch: {
        flex : 0,
        alignItems : 'center',
        gap: 10,
    },
    submit_btn : {
        marginTop : 5,
        width : 180,
        height : 35,
        borderColor : '#474747',
        borderWidth : 1,
        borderRadius : 50,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : '#EBEBEB',
    },

    time_schedule: {
        flex : 0,
        flexDirection : 'row',
        gap : 10, 
        alignItems : 'center',
        marginTop : 10,
        marginBottom : 10,
    },
  
    backicon : {
        width : 20,
        height : 20
    },
  
    backBtn : {
        flex : 0,
        flexDirection : 'row',
        alignItems : 'center'
    },

    lighticon : {
        width : 200,
        height : 200,
    },

    body : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    },

    setweekage_content : { 
        width : '85%',
        marginBottom : 100,
    },
    age_input_content : { 
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : 2,
    }  ,
    age_input : {
        backgroundColor : "black",
        padding : 2,
        borderRadius : 5,
        paddingLeft : 10,
        paddingRight : 10,
        color : "green",
        fontSize : 20,
        fontWeight : 'bold',
    },
    update_btn_age : { 
        alignSelf : 'center',
        width : '60%',
        height : 40,
        backgroundColor : "#47626D",
        justifyContent : "center",
        alignItems : "center",
        borderRadius : "5%",
        margin : 10,
    }, 

    notification_box : {
        width : '100%',
        alignContent : 'center',
    },

    notification_message : {
        width : '95%',
        height : 80,
        backgroundColor : '#EBEBEB',
        alignSelf : 'center',
        borderRadius : 15,
        marginTop : 10,
        borderWidth : 1,
        padding : 10,
        justifyContent : 'center'
    },

    notification_massage_text: {
        fontSize : 20,
        marginLeft : 10,
        marginTop : 10,
    },

    text_l : {
        fontSize : 15,
        fontWeight : 'bold'
    },

    text_note : {
        width : '80%',
        marginTop : 20,
        fontSize : 12,
        textAlign : 'justify'
    },

    scroll : {
        flex : 1,
    },

    add_feeding_sched_bnt : {
        alignSelf : 'center',
        padding : 20,
        backgroundColor : '#47626D',
        borderRadius : 15,
    },

    modal : {
        flex : 1,
        position : 'absolute',
        alignItems :'center',
        justifyContent : 'center',
        width : '100%',
        height : '100%',
        zIndex : 10,
    },

    modal_main : {
        width : '80%',
        height : '50%',
        backgroundColor : '#EBEBEB',
        padding : 10,
        borderRadius : 10,
        borderWidth : 1,
        justifyContent : 'space-between'
    }, 
    
    add_bnt : {
        width : '50%',
        alignItems : 'center',
        padding : 20,
        backgroundColor : '#47626D',
        borderRadius : 15,
    },

    cancel_bnt : {
        width : '50%',
        alignItems : 'center',
        padding : 20,  
        backgroundColor : 'white',
        borderWidth : 1,
        borderRadius : 15,
    },

    modal_button_section : {
        width : '100%',
        flexDirection : 'row',
        justifyContent :'center',
        alignItems :'center',
        gap : 10,
    },  

    schedule_feeding_main : {
        width : '90%',
        alignSelf : 'center',
        flexDirection : 'row',
        padding : 20,
        backgroundColor : '#EBEBEB',
        marginTop : 10,
        justifyContent : 'space-between', 
        borderRadius : 15,
        alignItems : 'center'

    },

    delete_btn : {

    },

    time_text : {
        fontSize : 20,
        fontWeight : 'bold'
    },

    icon :{
        width : 40,
        height : 40
    },

    autoRecommendLight : {
        width : '80%',
        flexDirection : 'row',
        alignItems : 'center',
        paddingTop : 30,
        gap: 10,
    },

    text_sml : {
        fontSize : 12,
        color : '#adadad'
    },

    text_lg : {
        fontSize : 20,
    },

    reload : {
        marginTop : 20,
        padding : 20,
        borderRadius : 15,
        backgroundColor : '#adadad'
    },

});


export default styles;


/* const styles = StyleSheet.create({

    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },

   

  

    header : {
      flex : 0,
      width : '98%',
      alignSelf : 'center'
    }, 

    lighticon : {
      width : 200,
      height : 200,
    },

    body : {
      flex : 1,
      alignItems : 'center',
    },

    
  
}) */