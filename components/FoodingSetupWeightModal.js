import { View, Text, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react';
import React from 'react'
import styles from '../styles/styles'
import axios from 'axios';
import {API_URL} from '@env'
export default function FoodingSetupWeightModal({isopen, close}) {


    const [raw_weight, setraw_weight] = useState(0);



    const get_raw_weight = async () =>{
        const response = await axios.get(API_URL + "/food/raw_weight")

        const data = response.data.weight

        return setraw_weight(data)
        
    }


    const calibrate = async ()=>{

        try {
            const response = await axios.post(API_URL + "/food/food_storage/setup", {
                weight : raw_weight,
            })
    
            const data = response.data
    
            console.log("Weight Successfully Calibrated Weight Reading:", data)
            
        } catch (error) {
            console.log(error)
        }
            return close(false)

    }


    useEffect(() => {

        const fetch_raw_weight = setInterval(get_raw_weight, 2000)
        
        return () => {
            clearInterval(fetch_raw_weight)
        }
    }, []);



    return (
        <>
            {
                isopen ? (
                    <View style={styles.modal}>
                        <View style={styles.modal_main}>
                            <Text>Calibrating Food Weight</Text>
                            <View style={styles.body}>
                                <Text>Reading Raw Weight.. {raw_weight}Kg</Text>
                            </View>
                            <View style={styles.modal_button_section}>
                                <TouchableOpacity onPress={()=> calibrate()} style={styles.add_feeding_sched_bnt} ><Text style={styles.text_light}>Configure</Text></TouchableOpacity>
                                <TouchableOpacity onPress={()=> close(false)} style={styles.add_feeding_sched_bnt} ><Text style={styles.text_light}>Close</Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )

                : <></>
            }
        </>
    )
}