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
        marginTop : 5,
        borderWidth : 1,
        padding : 10,
        justifyContent : 'center'
    },

    notification_massage_text: {
        fontSize : 20,
        marginLeft : 10,
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