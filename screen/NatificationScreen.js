import { View, Text } from 'react-native'
import React from 'react'
import styles from '../styles/styles'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function NatificationScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.body}>
        <Text>NatificationScreen</Text>
      </View>
    </SafeAreaView>
  )
}