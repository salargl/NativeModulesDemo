package com.demoapp;

import android.util.Log;


import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class CustomModule extends ReactContextBaseJavaModule {
    CustomModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "CustomModule";
    }

    @ReactMethod
    public void createCustomNativeEvent(String name, String location) {
        Log.d("CustomModule", "Create event called with name: " + name
                + " and location: " + location);
    }

    @ReactMethod
    public void customEventWithCallback(String name, String location, Callback callBack) {
        Log.d("CalendarModule", "Create event called with name: " + name
                + " and location: " + location);

        //you can add logic to invoke the callback conditionally
        Integer eventId = 123;
        callBack.invoke(eventId);
    }

    @ReactMethod
    public void customEventWithPromise(boolean shouldResolve, String location, Promise promise) {
        try {
            Log.d("CalendarModule", "Create event called with shouldResolve: " + shouldResolve
                    + " and location: " + location);
            if (shouldResolve) {
                Integer eventId = 345;
                promise.resolve(eventId);
            } else {
                throw new Exception("Promise rejected");
            }

        } catch (Exception e) {
            promise.reject("There was an error in customEventWithPromise");
        }
    }

    /************************* Sending Events*****************************/
    @ReactMethod
    private void sendEvent(String eventName) {
        WritableMap params = Arguments.createMap();
        params.putString("eventProperty1", "Value1");
        params.putString("eventProperty2", "Value2");
        getReactApplicationContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("EventReminder", params);
    }
}
