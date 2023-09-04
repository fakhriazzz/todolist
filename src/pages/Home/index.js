import database from '@react-native-firebase/database'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import React, { useEffect, useState } from 'react'
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { useSelector } from 'react-redux'
import { IconAdd } from '../../assets'
import { Gap, ListTodo } from '../../components'
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
        <Text style={styles.text}>{globalState.nameApp}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={{ uri: `${photo.replace(/["]/g, '')}` }} style={styles.imageProfile} />
        </TouchableOpacity>
      </View>
      <Gap height={RFValue(24)} />
      {
        notes.map(data => {
          const params = {
            idnote: data.id,
            noted: data.note?.note
          }
          return <ListTodo key={data.id} title={data.note?.title} note={data.note?.note} onPress={() => navigation.navigate('EditToDo', params)} onLongPress={() => openAlert(params)} />
        })
      }
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
    padding: RFValue(24)
  },
  text: {
    fontSize: RFValue(24),
    color: colors.black,
    fontFamily: fonts.primary[700]
  },
  button: {
    backgroundColor: colors.orange,
    height: 48,
    width: 48,
    borderRadius: 24,
    position: 'absolute',
    bottom: 24,
    right: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageProfile: {
    width: 24,
    height: 24,
    borderRadius: 12
  },
  flexrowspace: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  }
})