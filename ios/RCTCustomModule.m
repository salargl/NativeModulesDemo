//
//  RCTCustomModule.m
//  DemoApp
//
//  Created by Salar on 2024-06-12.
//
#import <React/RCTLog.h>
#import "RCTCustomModule.h"

@implementation RCTCustomModule

// To export a module named RCTCustomModule
RCT_EXPORT_MODULE(CustomModule);

RCT_EXPORT_METHOD(createCustomNativeEvent:(NSString *)name location:(NSString *)location)
{
  RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
}


RCT_EXPORT_METHOD(customEventWithCallback:(NSString *)title location:(NSString *)location callback: (RCTResponseSenderBlock)callback)
{
  NSInteger eventId = 123;
  callback(@[@(eventId)]);
  
  RCTLogInfo(@"Pretending to create an event %@ at %@", title, location);
}




RCT_EXPORT_METHOD(customEventWithPromise:(BOOL)shouldResolve
                  location:(NSString *)location
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  NSInteger eventId = 345;
  if (shouldResolve) {
    resolve(@(eventId));
  } else {
    reject(@"event_failure", @"no event id returned", nil);
  }
}

/************************* Sending Events*****************************/
//This method is not neccesary in RN version > 0.72
- (NSArray<NSString *> *)supportedEvents {
  return @[@"EventReminder"];
}


RCT_EXPORT_METHOD(sendEvent:(NSString *)eventName)
{
  //  NSString *eventName = notification.userInfo[@"name"];
  
  // Only send events if anyone is listening
  [self sendEventWithName:@"EventReminder" body:@{@"name": eventName}];
  
}

@end

