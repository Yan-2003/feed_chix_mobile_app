import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {API_URL} from "@env"
import styles from '../styles/styles';


export default function DashboardScreen({ navigation }) {

    const [LightStatus, setLightStatus] = useState('OFF');

    const [foodWeight, setfoodWeight] = useState(0);

    const [waterCapacity, setwaterCapacity] = useState(0);

    const [Temperature, setTemperature] = useState(0);

    const [Humidity, setHumidity] = useState(0);

    const [Age, setAge] = useState(0);

    const temp_rec = [32, 30, 26, 22, 20]


    console.log("API URL: ", API_URL)

    const fetchFoodWeight = async ()=>{
        try {
            const response = await axios.get( API_URL + "/food/weight")
            console.log(response.data)
            return setfoodWeight(response.data.weight)
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
            return console.log(response.data)
        } catch (error) {
            console.error(error)
            console.log('Unable to Connect:[Web Server API]')
        }
    }



    const fetchWaterCapacity = async ()=>{
        try {
            const response = await axios.get( API_URL + "/water/capacity")
            console.log(response.data)
            return setwaterCapacity(response.data.capacity)
        } catch (error) {
            console.error(error)
            console.log('Unable to Connect:[Web Server API]')
        }
    }

    const getLightStatus = async () =>{
        try {
          const response = await axios.get( API_URL + "/light/status")
          console.log(response.data)
          return setLightStatus(response.data.light_status)
        } catch (error) {
          console.error(error)
          console.log('Unable to Connect:[Web Server API]')
        }
      }


      const getCHickenInfo  = async ()=>{
        try {
            const response = await axios.get( API_URL + "/chicken")
            console.log("chicken_info: ")
            console.log(response.data)
            setAge(response.data.week_age)
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
        getCHickenInfo()


        const realTime_foodWeight = setInterval(fetchFoodWeight, 2000)

        const realTime_waterCapacity = setInterval(fetchWaterCapacity, 2000)

        const realTime_tempHumid = setInterval(tempHumid, 2000)

        const realTime_lightStatus = setInterval(getLightStatus, 2000);

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
                        <View style={Math.floor(Temperature) > temp_rec[Age] || Math.floor(Temperature) < temp_rec[Age] ? styles.warning_environment_box : styles.environment_box}>
                            <Image source={require('../assets/Images/thermometer.png')} style={styles.env_img} />
                            <Text style={styles.f_big}> { Temperature } °C</Text>
                            <Text style={styles.font_s_gray} >Temperature</Text>
                        </View>
                        <View style={Humidity > 80 || Humidity < 60 ? styles.warning_environment_box : styles.environment_box }>
                            <Image source={require('../assets/Images/humidity.png')} style={styles.env_img} />
                            <Text style={styles.f_big}> { Humidity } %</Text>
                            <Text style={styles.font_s_gray} >Humidity</Text>
                        </View>
                    </View>
                    <Text style={styles.text_light}>Age: (Week {Age}) </Text>
                </TouchableOpacity>
                <View style={styles.food_water_container}>
                    <View>
                        <View style={ ((foodWeight / 1000 ).toFixed(1)) < 0.1 ? [styles.food_content, styles.border_danger] : styles.food_content}>
                            <Text style={styles.text_label}>Food Storage</Text>
                            <View style={styles.food_content_box}>
                                <Image source={require('../assets/Images/chicken-rice.png')} style={styles.food_img} />
                                <Text> { (foodWeight / 1000 ).toFixed(1)} Kg</Text>
                                <Text style={styles.font_s_gray} >Weight Load</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.manage_btn} onPress={()=> navigation.navigate("MangeFood")}>
                            <Text style={styles.font_s} >Manage Food</Text>
                        </TouchableOpacity>
                    </View>

                    {   
                        waterCapacity <= 10 ? 

                        <View style={[styles.water_content, styles.border_danger]}>
                            <Text style={[styles.text_label, styles.text_danger]}>Water Storage</Text>
                            <View style={styles.food_content_box}>
                                <Image source={require('../assets/Images/water_dispenser.png')} style={styles.water_img} />
                                <Text style={styles.text_danger}>{waterCapacity} %</Text>
                                <Text style={[styles.font_s_gray, styles.text_danger]} >Capacity</Text>
                            </View>
                        </View>
                        : 
                        <View style={styles.water_content}>
                            <Text style={styles.text_label}>Water Storage</Text>
                            <View style={styles.food_content_box}>
                                <Image source={require('../assets/Images/water_dispenser.png')} style={styles.water_img} />
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

