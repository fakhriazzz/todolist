import { GoogleSignin } from '@react-native-google-signin/google-signin'
import React, { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { IconNote } from '../../assets'
import { Gap } from '../../components'
import { colors, fonts, storeData } from '../../utils'

const Splash = ({ navigation }) => {
  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn == true) {
      const currentUser = await GoogleSignin.getCurrentUser();
      const userData = {
        name: JSON.stringify(currentUser.user.name),
        email: JSON.stringify(currentUser.user.email),
        id: JSON.stringify(currentUser.user.id)
      }
      storeData('userData', userData)
      navigation.replace('Home')
    } else {
      navigation.replace('Welcome')
    }
  };

  useEffect(() => {
    setTimeout(() => {
      isSignedIn()
    }, 3000);
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>NoMee</Text>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.orange,
    padding: RFValue(24),
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: RFValue(24),
    color: colors.white,
    fontFamily: fonts.primary[800]
  },
  text2: {
    fontSize: RFValue(14),
    color: colors.white,
    fontFamily: fonts.primary[400]
  }
})