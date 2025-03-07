import { View, Text, Switch, TouchableOpacity, Image } from 'react-native'
import { useState, useEffect } from 'react';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios';
import Loading from '../components/Loading'
import DateTimePicker from '@react-native-community/datetimepicker'
import {API_URL} from "@env"
import styles from '../styles/styles';

export default function LightScreen( { navigation }) {

  const [LightStatus, setLightStatus] = useState(null);

  const [LastLightStatus, setLastLightStatus] = useState(null);

  const [IsLoading, setIsLoading] = useState(false);

  const [autoRecommendLight, setautoRecommendLight] = useState(false);

  const [TurnOn, setTurnOn] = useState(new Date());

  const [TurnOff, setTurnOff] = useState(new Date());


  const [mode, setMode] = useState('time');
  
  const [show, setShow] = useState(false);

  const onChangeTurnON = (event, selectedDate) => {
    const currentDate = selectedDate || TurnOn;
    setShow(false);
    setTurnOn(currentDate);
  };

  const onChangeTurnOff = (event, selectedDate) => {
    const currentDate = selectedDate || TurnOff;
    setShow(false);
    setTurnOff(currentDate);
  };


  const getSchedule = async () => {
   
    try {
      const response = await axios.get( API_URL + '/light/schedule')
      console.log(response.data)

      if(response.data == null){
        setTurnOn(new Date())
        setTurnOff(new Date())
      }

      setTurnOn(new Date(response.data.turn_on))
      setTurnOff(new Date(response.data.turn_off))

    } catch (error) {
      console.error(error)
    }
  }


  const switchLight = async () =>{
    setIsLoading(true)
    setLastLightStatus(LightStatus)
    if(LightStatus == 'OFF'){    
    try {
      const response = await axios.get( API_URL + "/light/on")
      console.log(response.data)
      console.log("this is the loading status : " , IsLoading )
    } catch (error) {
        console.error(error)
        console.log('Unable to Connect:[Web Server API]')
    }
      
    }else{
      try {
        const response = await axios.get( API_URL + "/light/off")
          console.log(response.data)
      } catch (error) {
          console.error(error)
          console.log('Unable to Connect:[Web Server API]')
      }
    }
    getLightStatus()
    setIsLoading(false)
    console.log("this is the loading status : " , IsLoading )
  }

  const getLightStatus = async () =>{
    try {
      const response = await axios.get( API_URL + "/light/status")
      setLightStatus(response.data.light_status)
      console.log(response.data)
      return setIsLoading(false)
    } catch (error) {
      console.error(error)
      console.log('Unable to Connect:[Web Server API]')
      return setIsLoading(false)
    }
  }


  const submit = async () =>{

    console.log("Light will turn on every : ", TurnOn)
    console.log("Light will turn off every : ", TurnOff)

    const payload = {
      on : TurnOn,
      off : TurnOff
    }

    try {
      const response = await axios.post( API_URL + "/light/schedule", payload)

      console.log(response.data)

      alert("Successfully Schdule Lights!")
      
    } catch (error) {
      console.error(error)
    }

  }


  const autoRecommendLightFunction = (payload) =>{
      payload == true ? setautoRecommendLight(false) : setautoRecommendLight(true)
  }



  useEffect(() => {
    getSchedule()
    const realTime_lightStatus = setInterval(getLightStatus , 1000)

    return () =>{
      clearImmediate(realTime_lightStatus)
    }


  }, []);


  return (
    <SafeAreaView style={styles.safeArea}>
       <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={()=> navigation.navigate('Dashboard')}>
            <Image style={styles.backicon} source={require('../assets/Images/back.png')} />
            <Text>Back</Text>
        </TouchableOpacity>
       </View>
       <View style={styles.body}>
          {
            LightStatus == (null || "") || IsLoading == true || LightStatus == LastLightStatus ? <Loading />

            :
              <TouchableOpacity style={styles.lightSwitch} onPress={()=> switchLight()}>
                {
                  (LightStatus == "OFF") ? <Image style={styles.lighticon} source={require('../assets/Images/light_off.png')} />
                  
                  : <Image style={styles.lighticon} source={require('../assets/Images/light_on.png')} />
                
                }
                
                <Text>Light Status : { LightStatus }</Text>
              </TouchableOpacity>
          }

          <Text style={styles.text_sml}>{ "( Tap the Bulb to turn On of Off Light )"}</Text>

          <View style={styles.time_schedule}>
            <Text>Turn On</Text>
            <DateTimePicker
              testID="dateTimePicker"
              value={TurnOn}
              mode={mode}
              is24Hour={false} // Set to false for 12-hour format
              display="default"
              onChange={onChangeTurnON}
            />
          </View>

          <View style={styles.time_schedule}>
            <Text>Turn Off</Text>
            <DateTimePicker
              testID="dateTimePicker"
              value={TurnOff}
              mode={mode}
              is24Hour={false} // Set to false for 12-hour format
              display="default"
              onChange={onChangeTurnOff}
            /> 
          </View>

          <TouchableOpacity style={styles.submit_btn} onPress={()=> submit()}>
            <Text>Schedule Light</Text>
          </TouchableOpacity>

          <View style={styles.autoRecommendLight}>
            <View>
              <Text style={styles.text_lg}>Auto Light in Temperature.</Text>
              <Text style={styles.text_sml}>{ "( This settings will turn The light (On or Off) base on the recommended temperature of Chicken )" }</Text>
            </View>
            <Switch
              onValueChange={()=> autoRecommendLightFunction(autoRecommendLight)}
              value={autoRecommendLight}
            />
          </View>


       </View>



    </SafeAreaView>
  )
}


