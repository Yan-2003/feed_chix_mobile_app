import React from 'react'
import { Text, View, Image, TouchableOpacity, TextInput, ScrollView, Alert, Platform   } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from '../styles/styles'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {API_URL} from '@env'
import FeedingSchedulerModal from '../components/FeedingSchedulerModal'
import FoodingSetupWeightModal from '../components/FoodingSetupWeightModal'
export default function MangeFoodScreen({navigation}){

    const [chickenNum, setchickenNum] = useState(0);

    const [isOpenModal, setisOpenModal] = useState(false);

    const [feedingScheduleList, setfeedingScheduleList] = useState([]);

    const [feedingSchedule, setfeedingSchedule] = useState(new Date());

    const [foodWeight, setfoodWeight] = useState(0);

    const [isLoading, setisLoading] = useState(false);

    const [isOpenModalFoodWeight, setisOpenModalFoodWeight] = useState(false);

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

    const fetchFoodWeight = async ()=>{
        try {
            const response = await axios.get( API_URL + "/food/weight")
            setfoodWeight(response.data.weight)
            console.log(response.data)
        } catch (error) {
            console.error(error)
            console.log('Unable to Connect:[Web Server API]')
            navigation.navigate('Reload')
        }
    }


    const get_schedules = async () =>{

        setisLoading(true)
        setfeedingScheduleList([])

        try {
            
            const response = await axios.get(API_URL + "/food/get_schedules")
            console.log(response.data)
            setfeedingScheduleList(response.data)
            console.log(feedingScheduleList)
            return setisLoading(false)
        } catch (error) {   
            console.log(error)
            return setisLoading(false)
        }
        
    }


    const getFormatTime = (stringDate) => {
        const date = new Date(stringDate)
    
        const hours  = date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
    
        const hoursFormat = date.getHours() > 11 && date.getHours != 24 ? "pm" : "am"

        const minutes = date.getMinutes() <  10 ? '0' + date.getMinutes() : date.getMinutes() 
    
        return hours + ":" + minutes + " " + hoursFormat
    
    }


    const add_schedule = async () =>{

        setisLoading(true)

        console.log('scheduling time : ', feedingSchedule)

        try {
            const response  = await axios.post( API_URL + '/food/add_schedule',  {feeding_sched : feedingSchedule})
            
            if(response){
                console.log(response.data)
                Alert.alert('Succesfully Added Schedule')
                get_schedules()
                setisOpenModal(false)
                return setisLoading(false)
            }
            
        } catch (error) {
            console.log(error)
            Alert.alert('Unable to Add Schedule')
            get_schedules()
            setisOpenModal(false)
            return setisLoading(false)
        }
       
    }


    const delete_schedule = async (id) =>{

        setisLoading(true)

        console.log(id)

        try {
                const response = await axios.delete(API_URL + `/food/delete_schedule/schedules/${id}`)
            
                if(response){
                    console.log(response.data)
                    Alert.alert('Item Deleted Successfully.')
                    get_schedules()
                    setisOpenModal(false)
                    return setisLoading(false)
                }
        } catch (error) {
            console.log(error)
            Alert.alert('Item Failed to Delete.')
            get_schedules()
            setisOpenModal(false)
            return setisLoading(false)
        }
    }

    useEffect(() => {
        getCHickenInfo() 
        get_schedules()
        fetchFoodWeight()


        const realtime_fetchFoodWeight = setInterval(fetchFoodWeight, 2000)

        return () =>{
            clearImmediate(realtime_fetchFoodWeight)
        }


    }, []);


    return (
      <SafeAreaView style={styles.safeArea}>
        <FeedingSchedulerModal open={isOpenModal} close={setisOpenModal} setfeedingSchedule={setfeedingSchedule} feedingSchedule={feedingSchedule} add_schedule={add_schedule}  />
        <FoodingSetupWeightModal isopen={isOpenModalFoodWeight} close={setisOpenModalFoodWeight}/>
        <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn} onPress={()=> navigation.navigate('Dashboard')}>
                <Image style={styles.backicon} source={require('../assets/Images/back.png')} />
                <Text>Back</Text>
            </TouchableOpacity>
       </View>
        <View style={styles.body}>
            <View style={styles.food_content_box}>
                <Image source={require('../assets/Images/chicken-rice.png')} style={styles.food_img} />
                <Text style={styles.text_l}> { (foodWeight / 1000 ).toFixed(1)} Kg</Text>
                <Text >Weight Load</Text>
            </View>
            <Text style={styles.text_note}>Food will automatically adjusted base on the week age of the chicken and will be devided by {chickenNum} chicken you can update this configuration {"<Enviroment>"} </Text>
        </View>
        <ScrollView>
            {
                isLoading == true ?  <View style={styles.body}><Text>Loading...</Text></View> 

                : feedingScheduleList.length > 0 ?
                    feedingScheduleList.map(item =>{
                        return (
                            <View key={item.id} style={styles.schedule_feeding_main}>
                                <Text style={styles.time_text}>Time: {getFormatTime(item.timestamp)}</Text>
                                <TouchableOpacity onPress={()=>delete_schedule(item.id)} style={styles.delete_btn}><Image style={styles.icon} source={require('../assets/Images/delete.png')} /></TouchableOpacity>
                            </View>
                        )
                    })

                    : <View style={styles.body}><Text>No Schedule. 🥺</Text></View> 
            }
        </ScrollView>
        <View style={styles.food_bnts}>
            <TouchableOpacity onPress={()=> setisOpenModal(true) } style={styles.add_feeding_sched_bnt} ><Text style={styles.text_light}>Add Feeding Schedule</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=> setisOpenModalFoodWeight(true) } style={styles.add_feeding_sched_bnt} ><Text style={styles.text_light}>Setup Food Weight</Text></TouchableOpacity>
        </View>
      </SafeAreaView>
    )
}