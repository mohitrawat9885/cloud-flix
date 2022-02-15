import React from 'react';
import {View, Text} from 'react-native';

export default function SplashScreen({navigation}) {
  setTimeout(() => {
    navigation.replace('Dashboard');
  }, 1500);
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '80%',
      }}>
      <Text style={{color: 'red', fontSize: 25, fontFamily: 'Roboto'}}>
        Cloud Flix
      </Text>
    </View>
  );
}
