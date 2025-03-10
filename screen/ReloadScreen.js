import { Text, TouchableOpacity, View , Image} from 'react-native'
import React, { Component } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from '../styles/styles'

export default class ReloadScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.body}>
            <Image style={styles.icon} source={require('../assets/Images/no-connection.png')}  />
            <Text>Can't connect to server please try again.</Text>
            <TouchableOpacity style={styles.reload}>
                <Text>Reload</Text>
            </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}