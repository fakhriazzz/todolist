import database from '@react-native-firebase/database'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors, fonts, getData } from '../../utils'

const AddToDo = ({ navigation }) => {
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const [iduser, setIduser] = useState('')

  const onSave = () => {
    database()
      .ref(`users/${iduser}`)
      .push({
        title: title,
        note: note,
      })
      .then(() => console.log('Data set.'))
    navigation.navigate('Home')
    // Notification('Sukses', 'Note berhasil dibuat')
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
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.orange, padding: RFValue(24), marginHorizontal: RFValue(-24) }}>
        <Text style={[styles.text, { color: colors.white }]}>NoMee</Text>
        <TouchableOpacity onPress={onSave}>
          <Text style={[styles.text, { color: colors.white }]}>Save</Text>
        </TouchableOpacity>
      </View>
      <TextInput style={styles.title} multiline placeholder='Title' placeholderTextColor={colors.black} value={title} onChangeText={(value) => setTitle(value)} />
      <TextInput style={styles.input} multiline placeholder='Write your note here' value={note} onChangeText={(value) => setNote(value)} />
    </View>
  )
}

export default AddToDo

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
    color: colors.black
  },
  input: {
    fontSize: RFValue(16),
    color: colors.black,
    marginTop: RFValue(-12)
  }
})