import { View, Text } from 'react-native'
import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { StyleSheet , SafeAreaView } from 'react-native';



export default function DashboardScreen() {

    const [foodWeight, setfoodWeight] = useState(0);

    const fetchFoodWeight = async ()=>{
        try {
            const response = await axios.get("http://192.168.1.24:8080/api/foodWeight")
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
        <SafeAreaView style={styles.safeArea}>
        <Text>Real-time food Weight: {foodWeight || 0} kg</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#fff',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
});