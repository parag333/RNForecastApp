//
//  RCTNativeLocalStorage.m
//  RNForecast
//
//  Created by Parag Deshpande on 07/06/26.
//

#import "RCTNativeLocalStorage.h"

static NSString *const RCTNativeLocalStorageKey = @"Local Storage";

@interface RCTNativeLocalStorage()
@property (strong, nonatomic) NSUserDefaults *localStorage;
@end

@implementation RCTNativeLocalStorage

- (id) init {
  if(self = [super init]){
    _localStorage = [[NSUserDefaults alloc] initWithSuiteName:RCTNativeLocalStorageKey];
  }
  return self;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeLocalStorageSpecJSI>(params);
}

- (NSString * _Nullable)getItem:(NSString *)key {
  return [self.localStorage stringForKey:key];
}


- (void)removeItem:(NSString *)key {
  [self.localStorage removeObjectForKey:key];
}

- (void)clear {
  NSDictionary *keys = [self.localStorage dictionaryRepresentation];
  for (NSString *key in keys) {
    [self removeItem:key];
  }
  
}

- (void)setItem:(nonnull NSString *)key value:(nonnull NSString *)value { 
  [self.localStorage setObject:value forKey:key];
}


+ (NSString *)moduleName
{
  return @"NativeLocalStorage";
}

@end
