import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors, fonts, getData } from '../../utils'

const Splash = ({ navigation }) => {
  const isSignedIn = () => {
    getData('userData').then(res => {
      if (res) {
        navigation.replace('Home')
      } else {
        navigation.replace('Welcome')
      }
    })
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