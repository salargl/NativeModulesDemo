//
//  RCTCustomModule.h
//  DemoApp
//
//  Created by Salar on 2024-06-12.
//

#import <React/RCTBridgeModule.h>

#import <React/RCTEventEmitter.h>

//If module doesn't have event emitter the below line should be used
//@interface RCTCustomModule : NSObject <RCTBridgeModule>

//If module has event emitter the below line should be used
@interface RCTCustomModule : RCTEventEmitter <RCTBridgeModule>

@end
