import { View, Text } from 'react-native'
import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';




export default function DashboardScreen() {

    const [foodWeight, setfoodWeight] = useState(0);

    const fetchFoodWeight = async ()=>{
        try {
            const response = await axios.get("http://192.168.1.24:8080/foodWeight")
            setfoodWeight(response.data.weight)
            console.log(response.data)
        } catch (error) {
            console.error(error)
        }
    }



    useEffect(() => {
    const realTime_foodWeight = setInterval(fetchFoodWeight, 1000)
    return ()=> clearInterval(realTime_foodWeight)        
    }, []);



    return (
        <View>
        <Text>Real-time food Weight: {foodWeight || 0} kg</Text>
        </View>
    )
}