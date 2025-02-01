import React from 'react'
import { Text, View, Image, TouchableOpacity, TextInput, ScrollView, Alert, Platform   } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from '../styles/styles'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {API_URL} from '@env'
export default function MangeFoodScreen({navigation}){

    const [chickenNum, setchickenNum] = useState(0);

    const [Age, setAge] = useState(0);

    const foodWeight = 0;

    const getCHickenInfo  = async ()=>{
        try {
            const response = await axios.get( API_URL + "/chicken")
            console.log("chicken_info: ")
            console.log(response.data)
            setchickenNum(response.data.chicken_num)
            setAge(response.data.week_age)

        } catch (error) {
            console.error(error)
            console.log('Unable to Connect:[Web Server API]')
        }
    }


    const update_checknum = async ()=>{
        Keyboard.dismiss
        console.log("updating chicken info......")
    
        try {
            console.log("requesting [POST] on server API")
            const response = await axios.post( API_URL + "/chicken/set_chicken", {week_age : Age, chicken_num : chickenNum})
            console.log(response.data)

        } catch (error) {
          console.error(error)
          console.log('Unable to Connect:[Web Server API]')
        }
    
        Alert.alert("Successfully Updated Chicken Info")
    
      }


    useEffect(() => {
        getCHickenInfo()  

    }, []);


    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn} onPress={()=> navigation.navigate('Dashboard')}>
                <Image style={styles.backicon} source={require('../assets/Images/back.png')} />
                <Text>Back</Text>
            </TouchableOpacity>
       </View>
       <ScrollView style={styles.scroll}>
            <View style={styles.body}>
                <View style={styles.food_content_box}>
                    <Image source={require('../assets/Images/chicken-rice.png')} style={styles.food_img} />
                    <Text style={styles.text_l}> { (foodWeight / 1000 ).toFixed(1)} Kg /  <Text style={styles.text_l} > { foodWeight } gm</Text></Text>
                    <Text >Weight Load</Text>
                </View>
                <Text style={styles.text_note}>Food will automatically adjusted base on the week age of the chicken. you can set the number of chicken to feed. </Text>
                <View style={styles.age_input_content}>
                    <Text>Number of Chickens : </Text>
                    <TextInput keyboardType='numeric' style={styles.age_input} value={chickenNum} onChangeText={num => setchickenNum(num)}/>
                </View>
                <TouchableOpacity onPress={()=>update_checknum()} style={styles.update_btn_age}><Text style={styles.text_light}>Update</Text></TouchableOpacity>
            </View>
       </ScrollView>
      </SafeAreaView>
    )
}