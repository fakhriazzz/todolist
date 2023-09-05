import database from '@react-native-firebase/database'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import React, { useEffect, useState } from 'react'
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { useSelector } from 'react-redux'
import { IconAdd } from '../../assets'
import { ListTodo } from '../../components'
import { colors, fonts, getData } from '../../utils'

const Home = ({ navigation }) => {
  const globalState = useSelector((state) => state)
  const [notes, setnotes] = useState([])
  const [iduser, setIduser] = useState('')
  const [photo, setPhoto] = useState('')

  const getIdentify = () => {
    getData('userData').then(res => {
      setIduser(res.id)
      database()
        .ref(`users/${res.id}`)
        .on('value', res => {
          const data = res.val();
          if (data != null) {
            let note = [];
            Object.keys(data).map(key => {
              note.push({
                id: key,
                note: data[key],
              })
            })
            setnotes(note)
          }
        })
    })
  }

  const onDelete = (idnote) => {
    database()
      .ref(`users/${iduser}/${idnote}`)
      .remove();
    // Notification('Sukses', 'Note berhasil dihapus')
  }

  const openAlert = ({ idnote }) => {
    Alert.alert('Delete Note', 'Are you sure want delete?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => onDelete(idnote) },
    ]);
  }

  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn == true) {
      const currentUser = await GoogleSignin.getCurrentUser();
      setPhoto(JSON.stringify(currentUser.user.photo));
    }
  };

  useEffect(() => {
    getIdentify()
    isSignedIn()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.flexrowspace}>
        <Text style={[styles.text, { color: colors.white }]}>{globalState.nameApp}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={{ uri: `${photo.replace(/["]/g, '')}` }} style={styles.imageProfile} />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            notes.map(data => {
              const params = {
                idnote: data.id,
                noted: data.note?.note,
                titled: data.note?.title
              }
              return <ListTodo key={data.id} title={data.note?.title} note={data.note?.note} onPress={() => navigation.navigate('EditToDo', params)} onLongPress={() => openAlert(params)} />
            })
          }
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddToDo')}>
        <IconAdd />
      </TouchableOpacity>
    </View>
  )
}

export default Home

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
  button: {
    backgroundColor: colors.orange,
    height: RFValue(48),
    width: RFValue(48),
    borderRadius: 24,
    position: 'absolute',
    bottom: RFValue(24),
    right: RFValue(24),
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageProfile: {
    width: RFValue(36),
    height: RFValue(36),
    borderRadius: RFValue(18)
  },
  flexrowspace: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.orange,
    marginHorizontal: -24,
    padding: 24
  }
})