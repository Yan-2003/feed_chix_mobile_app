import React from 'react'
import { Text, View, Image, TouchableOpacity, TextInput, ScrollView, Alert, Platform   } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from '../styles/styles'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {API_URL} from '@env'
import FeedingSchedulerModal from '../components/FeedingSchedulerModal'
export default function MangeFoodScreen({navigation}){

    const [chickenNum, setchickenNum] = useState(0);

    const [isOpenModal, setisOpenModal] = useState(false);

    const [feedingScheduleList, setfeedingScheduleList] = useState([]);

    const foodWeight = 0;

    const getCHickenInfo  = async ()=>{
        try {
            const response = await axios.get( API_URL + "/chicken")
            console.log("chicken_info: ")
            console.log(response.data)
            setchickenNum(response.data.chicken_num)
        } catch (error) {
            console.error(error)
            console.log('Unable to Connect:[Web Server API]')
        }
    }


    const get_schedules = async () =>{
        try {
            
            const response = await axios.get(API_URL + "/food/get_schedules")
            console.log(response.data)

            setfeedingScheduleList(response.data)


        } catch (error) {   
            console.log(error)
        }
    }

    useEffect(() => {
        getCHickenInfo() 
        
        get_schedules()

    }, []);


    return (
      <SafeAreaView style={styles.safeArea}>
        <FeedingSchedulerModal open={isOpenModal} close={setisOpenModal} />
        <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn} onPress={()=> navigation.navigate('Dashboard')}>
                <Image style={styles.backicon} source={require('../assets/Images/back.png')} />
                <Text>Back</Text>
            </TouchableOpacity>
       </View>
        <View style={styles.body}>
            <View style={styles.food_content_box}>
                <Image source={require('../assets/Images/chicken-rice.png')} style={styles.food_img} />
                <Text style={styles.text_l}> { (foodWeight / 1000 ).toFixed(1)} Kg /  <Text style={styles.text_l} > { foodWeight } gm</Text></Text>
                <Text >Weight Load</Text>
            </View>
            <Text style={styles.text_note}>Food will automatically adjusted base on the week age of the chicken and will be devided by {chickenNum} chicken you can update this configuration {"<Enviroment>"} </Text>
        </View>
        <ScrollView>
            {
                feedingScheduleList.map(item =>{
                    return <Text key={item.id}>Time: {item.timestamp}</Text>
                })
            }
        </ScrollView>
       <TouchableOpacity onPress={()=> setisOpenModal(true) } style={styles.add_feeding_sched_bnt} ><Text style={styles.text_light}>Add Feeding Schedule</Text></TouchableOpacity>
      </SafeAreaView>
    )
}