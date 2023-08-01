import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from "react-native-gesture-handler";

const HeaderRight = ({onPress,name,...params}) => {
    return (
        <View style={{
            marginRight:10
        }}>
   <TouchableOpacity activeOpacity={0.5} onPress={()=>onPress()}>
            <AntDesign name={name} size={24} color="white" />
          </TouchableOpacity>    
        </View>
    )
}

export default HeaderRight

const styles = StyleSheet.create({})
