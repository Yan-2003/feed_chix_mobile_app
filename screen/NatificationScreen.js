import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../styles/styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'
import Loading from '../components/Loading'
import {API_URL} from "@env"

export default function NatificationScreen({navigation}) {

  const [notification, setnotification] = useState([]);

  const [IsLoading, setIsLoading] = useState(false);

  const getNotificationLogs = async ()=>{
    setIsLoading(true)
    try {
      const response = await axios.get(API_URL + '/notification_log')
      const notification_log = response.data
      console.log(notification_log)
      setnotification(notification_log)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const getFormatDate = (stringDate) => {
    const date = new Date(stringDate)
    const months = ["Jan" , "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Oct", "Sep", "Nov", "Dec"]

    const hours  = date.getHours() > 12 ? date.getHours() - 12 : date.getHours()

    const hoursFormat = date.getHours() > 11 && date.getHours != 24 ? "pm" : "am"

    return months[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + ", " + hours + ":" + date.getMinutes() + " " + hoursFormat

  }

  useEffect( () => {

    setIsLoading(true)

    getNotificationLogs()  
    setIsLoading(false)
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={()=> navigation.navigate('Dashboard')}>
            <Image style={styles.backicon} source={require('../assets/Images/back.png')} />
            <Text>Back</Text>
        </TouchableOpacity>
       </View>
      <ScrollView style={styles.notification_box}>
        {
          IsLoading ? <Loading/>
          
          : notification.map((notif, index) => {
            return (
              <View key={index} style={styles.notification_message}>
                <Text style={styles.notification_massage_time}>{getFormatDate(notif.date)}</Text>
                <Text style={styles.notification_massage_text}>{notif.message}</Text>
              </View>
            ) 
          })
        } 
      </ScrollView> 
    </SafeAreaView>
  )
}