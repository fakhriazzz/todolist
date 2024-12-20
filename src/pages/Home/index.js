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
  const [email, setEmail] = useState('')
  const [photo, setPhoto] = useState('')

  const getIdentify = () => {
    getData('userData').then(res => {
      setEmail(res.email)
      database()
        .ref(`users/${res.email}`)
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
      .ref(`users/${email}/${idnote}`)
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

  const initialUser = () => {
    getData('userData').then(res => {
      if (res.sign == 'native') {

      } else {
        isSignedIn()
      }
    })
  }

  useEffect(() => {
    getIdentify()
    initialUser()
  }, [notes])

  return (
    <View style={styles.container}>
      <View style={styles.flexrowspace}>
        <Text style={[styles.text, { color: colors.white }]}>{globalState.nameApp}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          {
            photo == '' ?
              <View style={[styles.imageProfile, { backgroundColor: colors.black }]} />
              :
              <Image source={{ uri: `${photo.replace(/["]/g, '')}` }} style={styles.imageProfile} />
          }
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            notes.length > 0 ? notes.map(data => {
              const params = {
                idnote: data.id,
                noted: data.note?.note,
                titled: data.note?.title
              }
              return <ListTodo key={data.id} title={data.note?.title} note={data.note?.note} onPress={() => navigation.navigate('EditToDo', params)} onLongPress={() => openAlert(params)} />
            }) : <View style={{ alignSelf: 'center' }}>
              <Text style={[styles.text, { fontSize: RFValue(16), marginTop: RFValue(24) }]}>Empty Notes</Text>
            </View>
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
    marginHorizontal: RFValue(-24),
    paddingHorizontal: RFValue(24),
    paddingVertical: RFValue(16)
  }
})