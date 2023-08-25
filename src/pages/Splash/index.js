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
      <View style={styles.content}>
        <IconNote />
        <Gap height={4} />
        <Text style={styles.text}>Keep your notes</Text>
      </View>
      <View style={styles.contentBottom}>
        <ActivityIndicator color={colors.white} />
        <Gap width={4} />
        <Text style={styles.text2}>loading</Text>
      </View>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.orange,
    padding: RFValue(24)
  },
  text: {
    fontSize: RFValue(16),
    color: colors.white,
    fontWeight: fonts.primary[600]
  },
  text2: {
    fontSize: RFValue(14),
    color: colors.white,
    fontWeight: fonts.primary[400]
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center'
  }
})