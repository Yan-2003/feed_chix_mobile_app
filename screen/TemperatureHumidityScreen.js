import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import React from 'react'
import styles from '../styles/styles'
import { useState, useEffect } from 'react';
import axios from 'axios';
import {API_URL} from "@env"

export default function TemperatureHumidityScreen({navigation}) {

  const [Temperature, setTemperature] = useState(0);
  
  const [Humidity, setHumidity] = useState(0);

  const [Age, setAge] = useState(0);

  const [timeat, settimeat] = useState(null);

  const [chickenNum, setchickenNum] = useState(0);

  const update_Age = async ()=>{
    Keyboard.dismiss

    try {
      const response = await axios.post( API_URL + "/chicken/set_chicken", {week_age : Age, chicken_num : chickenNum})
      console.log(response.data)
    } catch (error) {
      console.error(error)
      console.log('Unable to Connect:[Web Server API]')
    }

    Alert.alert("Successfully Updated Chicken Info")

  }

  const GetStartedAt = (timestamp) => {
    const date = new Date(timestamp); 
    return date.toLocaleDateString('en-US', {  
      month: 'short', 
      day: 'numeric', 
      year: 'numeric', 
    });
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

  const getCHickenInfo  = async ()=>{
    try {
      const response = await axios.get( API_URL + "/chicken")
      console.log("chicken_info: ")
      console.log(response.data)
      setAge(response.data.week_age)
      settimeat(response.data.time_stamp)
      setchickenNum(response.data.chicken_num)

    } catch (error) {
      console.error(error)
      console.log('Unable to Connect:[Web Server API]')
    }
  }

  useEffect(() => {

      tempHumid()
      getCHickenInfo()

      const realTime_tempHumid = setInterval(tempHumid, 10000)


    return ()=> {
        clearImmediate(realTime_tempHumid)
    }        
  }, [])





  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
              <TouchableOpacity style={styles.backBtn} onPress={()=> navigation.navigate('Dashboard')}>
                  <Image style={styles.backicon} source={require('../assets/Images/back.png')} />
                  <Text>Back</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <Text>Temperature and Humidity</Text>
                <View style={styles.environment_content_box}>
                  <View style={styles.environment_box}>
                      <Image source={require('../assets/Images/thermometer.png')} style={styles.env_img} />
                      <Text style={styles.f_big}> { Temperature } °C</Text>
                      <Text style={styles.font_s_gray} >Temperature</Text>
                  </View>
                  <View style={styles.environment_box}>
                      <Image source={require('../assets/Images/humidity.png')} style={styles.env_img} />
                      <Text style={styles.f_big}> { Humidity} %</Text>
                      <Text style={styles.font_s_gray} >Humidity</Text>
                  </View>
                </View>
                <View style={styles.setweekage_content}>
                  <Text>Set The Chicken Age in Weeks this will automatically adjusted every week.</Text>
                  <View style={styles.age_input_content}>
                      <Text>Chicken Age in Weeks : </Text>
                      <TextInput keyboardType='numeric' style={styles.age_input} value={Age} onChangeText={num => setAge(num)}/>
                  </View>
                  <View style={styles.age_input_content}>
                      <Text>Number of Chickens : </Text>
                      <TextInput keyboardType='numeric' style={styles.age_input} value={chickenNum} onChangeText={num => setchickenNum(num)}/>
                  </View>
                  <View style={styles.age_input_content}>
                    <Text>Started At: {GetStartedAt(timeat)}</Text>
                  </View>
                  <TouchableOpacity onPress={()=>update_Age()} style={styles.update_btn_age}><Text style={styles.text_light}>Update</Text></TouchableOpacity>
                </View>
            </View>  
          </SafeAreaView>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}