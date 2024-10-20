import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useState, useEffect } from 'react';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios';


export default function LightScreen( { navigation }) {

  const [LightStatus, setLightStatus] = useState('OFF');


  const switchLight = async () =>{
    if(LightStatus == 'OFF'){    
    try {
      const response = await axios.get("http://192.168.1.88:8080/api/light/on")
      console.log(response.data)
    } catch (error) {
      console.error(error)
      console.log('Unable to Connect:[Web Server API]')
    }
      


    }else{
      try {
        const response = await axios.get("http://192.168.1.88:8080/api/light/off")
        console.log(response.data)
      } catch (error) {
        console.error(error)
        console.log('Unable to Connect:[Web Server API]')
      }


    }
  }

  const getLightStatus = async () =>{
    try {
      const response = await axios.get("http://192.168.1.88:8080/api/light/status")
      setLightStatus(response.data.light_status)
      console.log(response.data)
    } catch (error) {
      console.error(error)
      console.log('Unable to Connect:[Web Server API]')
    }
  }



  useEffect(() => {
    const realTime_lightStatus = setInterval(getLightStatus, 1000);
    
    return cleanUp = () => {
      clearInterval(realTime_lightStatus)
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
          <TouchableOpacity style={styles.lightSwitch} onPress={()=> switchLight()}>
            {
              (LightStatus == "OFF") ? <Image style={styles.lighticon} source={require('../assets/Images/light_off.png')} />
              
              : <Image style={styles.lighticon} source={require('../assets/Images/light_on.png')} />
            
            }
            
            <Text>Light Status : { LightStatus }</Text>
          </TouchableOpacity>
       </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
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

    lightSwitch: {
      flex : 0,
      alignItems : 'center',
      gap: 10,
    }
  
})