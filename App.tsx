import React, { useEffect } from 'react';
import {
  Alert,
  Button,
  NativeEventEmitter,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { NativeModules } from 'react-native';

function App(): JSX.Element {

  const { CustomModule } = NativeModules;
  const testCreateCustomNativeEvent = () => {
    CustomModule.createCustomNativeEvent('Hi there', 'testLocation');
  }

  const testCustomEventWithCallBack = () => {
    CustomModule.customEventWithCallback("With Callback", 'location2', (eventId: number) => { Alert.alert(`Callback with ${eventId} invoked`) })
  }

  const testCustomEventWithPromise = async (shouldResolve: boolean) => {
    try {
      const eventId = await CustomModule.customEventWithPromise(shouldResolve, 'location4')
      Alert.alert('Success', `Promise with eventId ${eventId} was resolved`);
    } catch (error) {
      Alert.alert("Error", `Promise was rejected`)
      console.log('error===', error);
    }
  }

  const testCustomNativeListener = () => {
    CustomModule.sendEvent("some event")
  }

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(CustomModule);
    const eventListener = eventEmitter.addListener('EventReminder', (event) => {
      console.log(event) // "someValue"
      Alert.alert("Event Received", JSON.stringify(event))
    });
    return () => {
      eventListener?.remove();
    }
  }, [])

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <Text style={styles.sectionTitle}>Native modules Demo</Text>
      <View style={styles.buttonsBox}>
        <Button
          title='Test Custom Native Event'
          onPress={testCreateCustomNativeEvent}
        />
        <Button
          title='Test Custom Native Event With CallBack'
          onPress={testCustomEventWithCallBack}
        />
        <Button
          title='Test Custom Native Event Promiss Resolve'
          onPress={() => testCustomEventWithPromise(true)}
        />
        <Button
          title='Test Custom Native Event Promiss Reject'
          onPress={() => testCustomEventWithPromise(false)}
        />
        <Button
          title='Test Custom Native listener'
          onPress={testCustomNativeListener}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: Colors.darker,
    flex:1
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    alignSelf: 'center'
  },
  buttonsBox:{
    flex:1,
    justifyContent:'center'
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
