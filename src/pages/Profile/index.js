import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Button, Gap } from '../../components';
import { colors, fonts, getData, removeData } from '../../utils';

const Profile = ({ navigation }) => {
    const [photo, setPhoto] = useState('')
    const [name, setName] = useState('')

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

    const isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn == true) {
            const currentUser = await GoogleSignin.getCurrentUser();
            setPhoto(JSON.stringify(currentUser.user.photo));
            setName(JSON.stringify(currentUser.user.name));
        }
    };

    const signOutGoogle = async () => {
        try {
            await GoogleSignin.signOut();
            navigation.replace('Welcome')
        } catch (error) {
            
        }
    };

    const signOut = () => {
        getData('userData').then(res => {
            if (res.sign == 'native') {
                removeData('userData')
                navigation.replace('Welcome')
            } else {
                signOutGoogle()
            }
        })
    }

    const initialUser = () => {
        getData('userData').then(res => {
            if (res.sign == 'native') {
                setName(res.email)
            } else {
                isSignedIn()
            }
        })
    }

    useEffect(() => {
        initialUser()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                {
                    photo == '' ?
                        <View style={[styles.imageProfile, { backgroundColor: colors.black }]} />
                        :
                        <Image source={{ uri: `${photo.replace(/["]/g, '')}` }} style={styles.imageProfile} />
                }
                <Gap height={RFValue(12)} />
                <Text style={{ fontSize: 16, color: colors.black, fontFamily: fonts.primary[700] }}>{name.replace(/["]/g, '')}</Text>
            </View>
            <View style={styles.bottom}>
                <Button text='Logout' onPress={signOut} />
            </View>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    imageProfile: {
        width: RFValue(120),
        height: RFValue(120),
        borderRadius: RFValue(60)
    },
    top: {
        flex: 2,
        alignItems: 'center',
        padding: 24
    },
    bottom: {
        padding: 24
    }
})