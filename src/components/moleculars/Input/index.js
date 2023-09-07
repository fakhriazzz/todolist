import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors, fonts } from '../../../utils'

const Input = ({ value, onChangeText, placeholder }) => {
    return (
        <TextInput style={styles.input} placeholder={placeholder} placeholderTextColor={colors.black} value={value} onChangeText={onChangeText} />
    )
}

export default Input

const styles = StyleSheet.create({
    input: {
        fontSize: RFValue(16),
        color: colors.black,
        fontFamily: fonts.primary[500],
        borderWidth: RFValue(1),
        borderColor: colors.black,
        borderRadius: RFValue(2),
        padding: RFValue(8)
    }
})