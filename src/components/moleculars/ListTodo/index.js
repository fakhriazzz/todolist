import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors, fonts } from '../../../utils'
import { Gap } from '../../atoms'

const ListTodo = ({ note, title, onPress, onLongPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} onLongPress={onLongPress}>
            <Text style={styles.textTitle}>{title}</Text>
            <Gap height={RFValue(12)}/>
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
        marginVertical: RFValue(12)
    },
    text: {
        fontSize: RFValue(16),
        color: colors.black,
        fontFamily: fonts.primary[500]
    },
    textTitle: {
        fontSize: RFValue(20),
        color: colors.black,
        fontFamily: fonts.primary[800]
    }
})