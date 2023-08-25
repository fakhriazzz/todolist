import database from '@react-native-firebase/database'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { Gap, Notification } from '../../components'
import { colors, fonts, getData } from '../../utils'

const AddToDo = ({ navigation }) => {
  const [note, setNote] = useState('')
  const [iduser, setIduser] = useState('')

  const onSave = () => {
    database()
      .ref(`users/${iduser}`)
      .push({
        note: note,

      })
      .then(() => console.log('Data set.'))
    navigation.navigate('Home')
    Notification('Sukses', 'Note berhasil dibuat')
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
        <Text style={styles.text}>Add To Do</Text>
        <TouchableOpacity onPress={onSave}>
          <Text style={styles.text}>Save</Text>
        </TouchableOpacity>
      </View>
      <Gap height={RFValue(24)} />
      <TextInput style={styles.input} multiline value={note} onChangeText={(value) => setNote(value)} />
    </View>
  )
}

export default AddToDo

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
  input: {
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 12,
  }
})