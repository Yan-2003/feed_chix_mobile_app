import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from '../styles/styles'
import DateTimePicker from '@react-native-community/datetimepicker'


export default function FeedingSchedulerModal({open, close}) {

    const [feedingSchedule, setfeedingSchedule] = useState(new Date());

    const [mode, setMode] = useState('time');


    const addFeddingDate = (event, selectedDate) => {
        const currentDate = selectedDate || feedingSchedule;
        setfeedingSchedule(currentDate);
    };

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
                            <TouchableOpacity style={styles.add_bnt}><Text style={styles.text_light}>Add</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            )

            : <></>
        }
    </>
  )
}