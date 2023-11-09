import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WidgetScreen from './src/screens/WidgetScreen';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <SafeAreaView />
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <WidgetScreen />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
