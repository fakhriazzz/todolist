import database from '@react-native-firebase/database'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors, fonts, getData } from '../../utils'

const EditToDo = ({ navigation, route }) => {
    const { idnote, noted, titled } = route.params
    const [title, setTitle] = useState(titled)
    const [note, setNote] = useState(noted)
    const [email, setEmail] = useState('')

    const onSave = () => {
        database()
            .ref(`users/${email}/${idnote}`)
            .update({
                title: title,
                note: note,
            })
        navigation.navigate('Home')
        // Notification('Sukses', 'Note berhasil diedit')
    }

    const getIdentify = () => {
        getData('userData').then(res => {
            setEmail(res.email);
        })
    }

    useEffect(() => {
        getIdentify()
    }, [])

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.orange, paddingHorizontal: RFValue(24), paddingVertical: RFValue(16), marginHorizontal: RFValue(-24) }}>
                <Text style={[styles.text, { color: colors.white }]}>NoMee</Text>
                <TouchableOpacity onPress={onSave}>
                    <Text style={[styles.text, { color: colors.white, fontSize: RFValue(16) }]}>Save</Text>
                </TouchableOpacity>
            </View>
            <TextInput style={styles.title} multiline placeholder={title} placeholderTextColor={colors.black} value={title} onChangeText={(value) => setTitle(value)} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <TextInput style={styles.input} multiline placeholder={note} placeholderTextColor={colors.black} value={note} onChangeText={(value) => setNote(value)} />
            </ScrollView>
        </View>
    )
}

export default EditToDo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: RFValue(24)
    },
    text: {
        fontSize: RFValue(24),
        color: colors.black,
        fontFamily: fonts.primary[700]
    },
    title: {
        fontSize: RFValue(16),
        color: colors.black,
        fontFamily: fonts.primary[700]
    },
    input: {
        fontSize: RFValue(16),
        color: colors.black,
        marginTop: RFValue(-12),
        lineHeight: RFValue(24),
        fontFamily: fonts.primary[500]
    }
})