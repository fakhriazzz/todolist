import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors, fonts } from '../../../utils'

const ListTodo = ({ note, onPress, onLongPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} onLongPress={onLongPress}>
            <Text style={styles.text}>{note}</Text>
        </TouchableOpacity>
    )
}

export default ListTodo

const styles = StyleSheet.create({
    container: {
        padding: RFValue(12),
        borderColor: colors.black,
        borderWidth: 1,
        borderRadius: RFValue(12),
        marginBottom: RFValue(12)
    },
    text: {
        fontSize: RFValue(16),
        color: colors.black,
        fontFamily: fonts.primary[500]
    }
})