import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WidgetScreen from './src/screens/WidgetScreen';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <WidgetScreen />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
