import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import styles from '../styles/styles'
import DateTimePicker from '@react-native-community/datetimepicker'
import axios from 'axios';
import {API_URL} from "@env"


export default function FeedingSchedulerModal({open, close}) {

    const [feedingSchedule, setfeedingSchedule] = useState(new Date());

    const [mode, setMode] = useState('time');


    const addFeddingDate = (event, selectedDate) => {
        const currentDate = selectedDate || feedingSchedule;
        setfeedingSchedule(currentDate);
    };


    const add_schedule = async () =>{


        console.log('scheduling time : ', feedingSchedule)

        try {
            const response  = await axios.post( API_URL + '/food/add_schedule',  {feeding_sched : feedingSchedule})
            
            if(response){
                console.log(response.data)
                Alert.alert('Succesfully Added Schedule')
                return close(false)
            }
            
        } catch (error) {
            console.log(error)
            Alert.alert('Unable to Add Schedule')
        }

        


    }

  return (
    <>
        {
            open ? (
                <View style={styles.modal}>
                    <View style={styles.modal_main}>
                        <Text>Add Feeding Schedule</Text>
                        <View style={styles.body}>
                            <Text>Set the time to feed the chicken every day.</Text>
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={feedingSchedule}
                                mode={mode}
                                is24Hour={false} // Set to false for 12-hour format
                                display="default"
                                onChange={addFeddingDate}
                            />
                        </View>
                        <View style={styles.modal_button_section}>
                            <TouchableOpacity onPress={()=>close(false)} style={styles.cancel_bnt}><Text>Cancel</Text></TouchableOpacity>
                            <TouchableOpacity onPress={()=>add_schedule()} style={styles.add_bnt}><Text style={styles.text_light}>Add</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            )

            : <></>
        }
    </>
  )
}