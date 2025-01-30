import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../styles/styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'

export default function NatificationScreen({navigation}) {

  const [notification, setnotification] = useState(null);



  useEffect( async () => {

    const response = await axios.get(API_URL + '/notification_log')

    setnotification(response.data.toString())
    
    

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

        <View style={styles.notification_message}>
        <Text style={styles.notification_massage_time}>10:30 am</Text>
          <Text style={styles.notification_massage_text}>Hello World</Text>
          <Text>{notification}</Text>
        </View>
      </ScrollView> 
    </SafeAreaView>
  )
}