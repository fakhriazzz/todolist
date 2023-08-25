import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { ImageWelcome } from '../../assets'
import { colors, fonts, storeData } from '../../utils'

const Welcome = ({ navigation }) => {
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    webClientId: '409968645323-ac5oligr6vdktjile9lf4a0pf3fmadti.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: '', // [Android] specifies an account name on the device that should be used
    iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
    openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
    profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
  });

  // Somewhere in your code
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const userData = {
        name: JSON.stringify(userInfo.user.name),
        email: JSON.stringify(userInfo.user.email),
        id: JSON.stringify(userInfo.user.id)
      }
      storeData('userData', userData)
      navigation.replace('Home')
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContent}>
        <Image source={ImageWelcome} style={styles.image} />
        <Text style={styles.text}>Start to keep your notes</Text>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
        />
      </View>
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({
  image: {
    width: RFValue(400),
    height: RFValue(500)
  },
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  topContent: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: RFValue(18),
    color: colors.black,
    fontFamily: fonts.primary[500]
  }
})