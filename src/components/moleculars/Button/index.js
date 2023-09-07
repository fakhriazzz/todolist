import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { colors, fonts } from '../../../utils'
import { RFValue } from 'react-native-responsive-fontsize'

const Button = ({ text, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.orange,
        borderRadius: RFValue(2),
        padding: RFValue(12),
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: RFValue(16),
        color: colors.white,
        fontFamily: fonts.primary[600]
    }
})