import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Routers from './routers';
import { Provider } from 'react-redux';
import { store } from './redux';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  useEffect(() => {
    requestPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, [])

  const requestPermission = async () => {
    const authStatus = await messaging().requestPermission();
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Routers />
      </NavigationContainer>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})