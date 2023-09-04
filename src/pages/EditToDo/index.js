import database from '@react-native-firebase/database'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { Gap } from '../../components'
import { colors, fonts, getData } from '../../utils'

const EditToDo = ({ navigation, route }) => {
    const { idnote, noted } = route.params
    const [title, setTitle] = useState('')
    const [note, setNote] = useState(noted)
    const [iduser, setIduser] = useState('')

    const onSave = () => {
        database()
            .ref(`users/${iduser}/${idnote}`)
            .update({
                title: title,
                note: note,
            })
            .then(() => console.log('Data set.'))
        navigation.navigate('Home')
        // Notification('Sukses', 'Note berhasil diedit')
    }

    const getIdentify = () => {
        getData('userData').then(res => {
            setIduser(res.id);
        })
    }

    useEffect(() => {
        getIdentify()
    }, [])

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.text}>Edit your to do list</Text>
                <TouchableOpacity onPress={onSave}>
                    <Text style={styles.text}>Save</Text>
                </TouchableOpacity>
            </View>
            <Gap height={RFValue(24)} />
            <TextInput style={styles.title} multiline placeholder='Title' placeholderTextColor={colors.black} value={title} onChangeText={(value) => setTitle(value)} />
            <TextInput style={styles.input} multiline placeholder={note} placeholderTextColor={colors.black} value={note} onChangeText={(value) => setNote(value)} />
        </View>
    )
}

export default EditToDo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: RFValue(24)
    },
    text: {
        fontSize: RFValue(16),
        color: colors.black,
        fontFamily: fonts.primary[700]
    },
    title: {
        borderColor: colors.black,
        fontSize: 16,
        color: colors.black
    },
    input: {
        borderColor: colors.black,
        borderWidth: 1,
        borderRadius: 12,
        padding: 8
    }
})