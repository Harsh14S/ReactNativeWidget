import React, {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  NativeModules,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import SharedGroupPreferences from 'react-native-shared-group-preferences';

const group = 'group.streak';

const SharedStorage = NativeModules.SharedStorage;

export default WidgetScreen = () => {
  const [widgetData, setWidgetData] = useState('');

  const handleSubmit = async () => {
    try {
      // iOS
      await SharedGroupPreferences.setItem(
        'widgetKey',
        {text: widgetData},
        group,
      );
    } catch (error) {
      console.log('Error ====> ', error);
    }
    // const value = `${widgetData} days`;
    // Android
    // SharedStorage.set(JSON.stringify({widgetData: value}));
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.heading}>Change Widget Value</Text>
          <View style={styles.bodyContainer}>
            <TextInput
              style={styles.input}
              onChangeText={newText => setWidgetData(newText)}
              value={widgetData}
              keyboardType="decimal-pad"
              placeholder="Enter the widgetData to display..."
            />
            <TouchableOpacity
              onPress={handleSubmit}
              style={{
                borderWidth: 1,
                borderColor: '#c6c6c6',
                borderRadius: 8,
                padding: 12,
                marginTop: 10,
                backgroundColor: '#b6b6b6',
              }}>
              <Text style={{textAlign: 'center', color: 'black'}}>
                {'Submit'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    // backgroundColor: '#fafaf3',
  },
  container: {
    flex: 1,
    padding: 12,
  },
  heading: {
    fontSize: 24,
    color: '#979995',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    // fontSize: 20,
    minHeight: 50,
    borderWidth: 1,
    borderColor: '#c6c6c6',
    borderRadius: 8,
    padding: 12,
  },
  bodyContainer: {
    flex: 1,
    margin: 18,
  },
  instructionContainer: {
    margin: 25,
    paddingHorizontal: 20,
    paddingTop: 30,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#ecedeb',
    borderColor: '#bebfbd',
    marginBottom: 35,
  },
  avatarImg: {
    height: 180,
    width: 180,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
  },
  thoughtContainer: {
    minHeight: 50,
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    backgroundColor: '#ffffff',
    borderColor: '#c6c6c6',
  },
  thoughtPointer: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    overflow: 'hidden',
    borderTopWidth: 12,
    borderRightWidth: 10,
    borderBottomWidth: 0,
    borderLeftWidth: 10,
    borderTopColor: 'blue',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    marginTop: -1,
    marginLeft: '50%',
  },
  thoughtTitle: {
    fontSize: 14,
  },
  actionButton: {
    marginTop: 40,
  },
});
