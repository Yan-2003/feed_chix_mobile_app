import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {API_URL} from "@env"


export default function DashboardScreen({ navigation }) {

    const [LightStatus, setLightStatus] = useState('OFF');

    const [foodWeight, setfoodWeight] = useState(0);

    const [waterCapacity, setwaterCapacity] = useState(0);

    const [Temperature, setTemperature] = useState(0);

    const [Humidity, setHumidity] = useState(0);

    console.log("API URL: ", API_URL)

    const fetchFoodWeight = async ()=>{
        try {
            const response = await axios.get( API_URL + "/food/weight")
            setfoodWeight(response.data.weight)
            console.log(response.data)
        } catch (error) {
            console.error(error)
            console.log('Unable to Connect:[Web Server API]')
        }
    }


     const tempHumid = async ()=>{
        try {
            const response = await axios.get( API_URL + "/tempHumid")
            setTemperature(response.data.temperature)
            setHumidity(response.data.humidity)
            console.log(response.data)
        } catch (error) {
            console.error(error)
            console.log('Unable to Connect:[Web Server API]')
        }
    }



    const fetchWaterCapacity = async ()=>{
        try {
            const response = await axios.get( API_URL + "/water/capacity")
            setwaterCapacity(response.data.capacity)
            console.log(response.data)
        } catch (error) {
            console.error(error)
            console.log('Unable to Connect:[Web Server API]')
        }
    }

    const getLightStatus = async () =>{
        try {
          const response = await axios.get( API_URL + "/light/status")
          setLightStatus(response.data.light_status)
          console.log(response.data)
        } catch (error) {
          console.error(error)
          console.log('Unable to Connect:[Web Server API]')
        }
      }



    useEffect(() => {

        fetchFoodWeight()
        fetchWaterCapacity()
        getLightStatus()
        tempHumid()


        const realTime_foodWeight = setInterval(fetchFoodWeight, 10000)

        const realTime_waterCapacity = setInterval(fetchWaterCapacity, 10000)

        const realTime_tempHumid = setInterval(tempHumid, 10000)

        const realTime_lightStatus = setInterval(getLightStatus, 1000);

    return ()=> {
        clearInterval(realTime_foodWeight)
        clearInterval(realTime_waterCapacity)
        clearImmediate(realTime_tempHumid)
        clearImmediate(realTime_lightStatus)
    }        
    }, []);



    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.logo_contaier}>
                        <Image source={require('../assets/Images/logo.png')} style={styles.logo} />
                        <Text>C-Coop</Text>
                    </View>
                    <TouchableOpacity onPress={()=> navigation.navigate('Notification')}>
                        <Image style={styles.logo} source={require('../assets/Images/bell.png')} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.environtment_content} onPress={()=> navigation.navigate("TempHumid")}>
                    <Text style={styles.text_label_light}>Environment</Text>
                    <View style={styles.environment_content_box}>
                        <View style={styles.environment_box}>
                            <Image source={require('../assets/Images/thermometer.png')} style={styles.env_img} />
                            <Text style={styles.f_big}> { Temperature } °C</Text>
                            <Text style={styles.font_s_gray} >Temperature</Text>
                        </View>
                        <View style={styles.environment_box}>
                            <Image source={require('../assets/Images/humidity.png')} style={styles.env_img} />
                            <Text style={styles.f_big}> { Humidity } %</Text>
                            <Text style={styles.font_s_gray} >Humidity</Text>
                        </View>
                    </View>
                    <Text style={styles.text_light}>Age: (Week 4) </Text>
                </TouchableOpacity>
                <View style={styles.food_water_container}>
                    <View>
                        <View style={styles.food_content}>
                            <Text style={styles.text_label}>Food Storage</Text>
                            <View style={styles.food_content_box}>
                                <Image source={require('../assets/Images/chicken-rice.png')} style={styles.food_img} />
                                <Text> { (foodWeight / 1000 ).toFixed(1)} Kg /  <Text style={styles.font_s_gray} > { foodWeight } gm</Text></Text>
                                <Text style={styles.font_s_gray} >Weight Load</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.manage_btn}>
                            <Text style={styles.font_s} >Manage Food</Text>
                        </TouchableOpacity>
                    </View>

                    {   
                        waterCapacity <= 10 ? 

                        <View style={[styles.water_content, styles.border_danger]}>
                            <Text style={[styles.text_label, styles.text_danger]}>Water Storage</Text>
                            <View style={styles.food_content_box}>
                                <Image source={require('../assets/Images/water-dispenser.png')} style={styles.water_img} />
                                <Text style={styles.text_danger}>{waterCapacity} %</Text>
                                <Text style={[styles.font_s_gray, styles.text_danger]} >Capacity</Text>
                            </View>
                        </View>
                        : 
                        <View style={styles.water_content}>
                            <Text style={styles.text_label}>Water Storage</Text>
                            <View style={styles.food_content_box}>
                                <Image source={require('../assets/Images/water-dispenser.png')} style={styles.water_img} />
                                <Text>{waterCapacity} %</Text>
                                <Text style={styles.font_s_gray} >Capacity</Text>
                            </View>


                        </View>

                    }
                    
                    
                </View>
                <TouchableOpacity style={styles.light_control} onPress={()=> navigation.navigate("LightControl")}>
                    <View style={styles.light_logo}>
                        <Image source={require('../assets/Images/light-bulb.png')} style={styles.env_img} />
                        <Text style={styles.f_gray}>Light Control</Text>
                    </View>
                    <View style={[styles.light_status_icon, (LightStatus == "ON") ? styles.lightOn : styles.lightOff ]}>
                        <Text>{ LightStatus }</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

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
    }
    


});