import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import styles from '../styles/styles'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function NatificationScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.notification_box}>
        <View style={styles.notification_message}>
        <Text style={styles.notification_massage_time}>10:30 am</Text>
          <Text style={styles.notification_massage_text}>Hello World</Text>
        </View>
      </ScrollView> 
    </SafeAreaView>
  )
}