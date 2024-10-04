import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function DashboardScreen() {

    const [foodWeight, setfoodWeight] = useState(0);

    const [waterCapacity, setwaterCapacity] = useState(0);

    const fetchFoodWeight = async ()=>{
        try {
            const response = await axios.get("http://192.168.1.24:8080/api/foodWeight")
            setfoodWeight(response.data.weight)
            console.log(response.data)
        } catch (error) {
            console.error(error)
            console.log('Unable to Connect:[Web Server API]')
        }
    }


    const fetchWaterCapacity = async ()=>{
        try {
            const response = await axios.get("http://192.168.1.24:8080/api/waterCapacity")
            setwaterCapacity(response.data.capacity)
            console.log(response.data)
        } catch (error) {
            console.error(error)
            console.log('Unable to Connect:[Web Server API]')
        }
    }



    useEffect(() => {
    const realTime_foodWeight = setInterval(fetchFoodWeight, 1000)

    const realTime_waterCapacity = setInterval(fetchWaterCapacity, 1000)

    return ()=> {
        clearInterval(realTime_foodWeight)
        clearInterval(realTime_waterCapacity)
    }        
    }, []);



    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.logo_contaier}>
                    <Image source={require('../assets/Images/logo.png')} style={styles.logo} />
                    <Text>C-Coop</Text>
                </View>
                <TouchableOpacity style={styles.environtment_content}>
                    <Text style={styles.text_label_light}>Environment</Text>
                </TouchableOpacity>
                <View style={styles.food_water_container}>
                    <View>
                        <View style={styles.food_content}>
                            <Text style={styles.text_label}>Food Storage</Text>
                            <View style={styles.food_content_box}>
                                <Image source={require('../assets/Images/chicken-rice.png')} style={styles.food_img} />
                                <Text> { (foodWeight / 1000 ).toFixed(1)} Kg /  <Text style={styles.font_s_gray} > { foodWeight } gm</Text></Text>
                                <Text style={styles.font_s_gray} >Weight Load</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.manage_btn}>
                            <Text style={styles.font_s} >Manage Food</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.water_content}>
                    <Text style={styles.text_label}>Water Storage</Text>
                        <View style={styles.food_content_box}>
                            <Image source={require('../assets/Images/water-dispenser.png')} style={styles.water_img} />
                            <Text>{waterCapacity} %</Text>
                            <Text style={styles.font_s_gray} >Capacity</Text>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    font_s : {
        fontSize : 10,
    }, 

    font_s_gray : {
        fontSize : 8,
        color : '#5E5E5E'
    },

    logo_contaier : {
        flex : 0, 
        flexDirection : 'row',
        alignItems : 'center',
        gap : 10,
    },


    logo : {
        width :30,
        height : 30,
    },  

    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {    
        width : '95%',
        flex: 1,
        alignSelf : 'center'
    },
    environtment_content : {
        marginTop : 10,
        width : '100%',
        height : 160,
        backgroundColor : '#47626D',
        borderRadius : 15,
        padding : 10,
    },
    text_label : {
        fontSize : 8,
        color : '#474747',
    },

    text_label_light : {
        fontSize : 8,
        color : 'white',
    },

    
    food_water_container : {
        flex: 1, 
        flexDirection : 'row',
        width : 'auto',
        height : 230,
        justifyContent : 'center',
        marginTop : 10,
        gap : 10
    },

    food_content: {
        padding : 10,
        width : 180,
        height : 190,
        borderWidth : 1,
        borderColor : '#D9D9D9',
        borderWidth : 1,
        borderRadius : 15,
    }, 

    food_content_box : {
        marginTop : 5,
        flex : 0,
        width : 'auto',
        alignItems : 'center',
        gap : 5
    },

    food_img : {
        width : 100,
        height : 100
    },

    water_img : {
        width : 130,
        height : 130
    },

    water_content : {
        padding : 10,
        width : 180,
        height : 230,
        borderWidth : 1,
        borderColor : '#D9D9D9',
        borderWidth : 1,
        borderRadius : 15,
    },

    manage_btn : {
        marginTop : 5,
        width : 180,
        height : 35,
        borderColor : '#474747',
        borderWidth : 1,
        borderRadius : 50,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : '#EBEBEB',
    }
    


});