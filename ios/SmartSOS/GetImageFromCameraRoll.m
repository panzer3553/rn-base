//
//  getImageFromCameraRoll.m
//  SmartSOS
//
//  Created by cong.nguyen on 5/19/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <AssetsLibrary/AssetsLibrary.h>
#import "RCTBridgeModule.h"
#import <CoreLocation/CoreLocation.h>
#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#import "RCTAssetsLibraryRequestHandler.h"
#import "RCTConvert.h"
//#import "RCTLog.h"
#import "RCTUtils.h"


@interface GetImageData : NSObject <RCTBridgeModule>
@end

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */


@interface RCTConvert (ALAssetGroup)

+ (ALAssetsGroupType)ALAssetsGroupType:(id)json;
+ (ALAssetsFilter *)ALAssetsFilter:(id)json;

@end

@interface CustomImageManager : NSObject <RCTBridgeModule>

@end

@implementation RCTConvert (ALAssetGroup)

RCT_ENUM_CONVERTER(ALAssetsGroupType, (@{
                                         
                                         // New values
                                         @"album": @(ALAssetsGroupAlbum),
                                         @"all": @(ALAssetsGroupAll),
                                         @"event": @(ALAssetsGroupEvent),
                                         @"faces": @(ALAssetsGroupFaces),
                                         @"library": @(ALAssetsGroupLibrary),
                                         @"photo-stream": @(ALAssetsGroupPhotoStream),
                                         @"saved-photos": @(ALAssetsGroupSavedPhotos),
                                         
                                         // Legacy values
                                         @"Album": @(ALAssetsGroupAlbum),
                                         @"All": @(ALAssetsGroupAll),
                                         @"Event": @(ALAssetsGroupEvent),
                                         @"Faces": @(ALAssetsGroupFaces),
                                         @"Library": @(ALAssetsGroupLibrary),
                                         @"PhotoStream": @(ALAssetsGroupPhotoStream),
                                         @"SavedPhotos": @(ALAssetsGroupSavedPhotos),
                                         
                                         }), ALAssetsGroupSavedPhotos, integerValue)

+ (ALAssetsFilter *)ALAssetsFilter:(id)json
{
  static NSDictionary<NSString *, ALAssetsFilter *> *options;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    options = @{
                
                // New values
                @"photos": [ALAssetsFilter allPhotos],
                @"videos": [ALAssetsFilter allVideos],
                @"all": [ALAssetsFilter allAssets],
                
                // Legacy values
                @"Photos": [ALAssetsFilter allPhotos],
                @"Videos": [ALAssetsFilter allVideos],
                @"All": [ALAssetsFilter allAssets],
                };
  });
  
  ALAssetsFilter *filter = options[json ?: @"photos"];
  if (!filter) {
//    RCTLogError(@"Invalid filter option: '%@'. Expected one of 'photos',"
//                "'videos' or 'all'.", json);
  }
  return filter ?: [ALAssetsFilter allPhotos];
}

@end

@implementation CustomImageManager

RCT_EXPORT_MODULE()

@synthesize bridge = _bridge;

NSString *const customRCTErrorUnableToLoad = @"E_UNABLE_TO_LOAD";
NSString *const customRCTErrorUnableToSave = @"E_UNABLE_TO_SAVE";

static void CustomRCTResolvePromise(RCTPromiseResolveBlock resolve,
                              NSArray<NSDictionary<NSString *, id> *> *assets,
                              BOOL hasNextPage)
{
  if (!assets.count) {
    resolve(@{
              @"edges": assets,
              @"page_info": @{
                  @"has_next_page": @NO,
                  }
              });
    return;
  }
  resolve(@{
            @"edges": assets,
            @"page_info": @{
                @"start_cursor": assets[0][@"node"][@"image"][@"uri"],
                @"end_cursor": assets[assets.count - 1][@"node"][@"image"][@"uri"],
                @"has_next_page": @(hasNextPage),
                }
            });
}

RCT_EXPORT_METHOD(getImages:(NSDictionary *)params
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  NSUInteger first = [RCTConvert NSInteger:params[@"first"]];
  NSString *afterCursor = [RCTConvert NSString:params[@"after"]];
  NSString *groupName = [RCTConvert NSString:params[@"groupName"]];
  ALAssetsFilter *assetType = [RCTConvert ALAssetsFilter:params[@"assetType"]];
  ALAssetsGroupType groupTypes = [RCTConvert ALAssetsGroupType:params[@"groupTypes"]];
  
  BOOL __block foundAfter = NO;
  BOOL __block hasNextPage = NO;
  BOOL __block resolvedPromise = NO;
  NSMutableArray<NSDictionary<NSString *, id> *> *assets = [NSMutableArray new];
  
  [_bridge.assetsLibrary enumerateGroupsWithTypes:groupTypes usingBlock:^(ALAssetsGroup *group, BOOL *stopGroups) {
    if (group && (groupName == nil || [groupName isEqualToString:[group valueForProperty:ALAssetsGroupPropertyName]])) {
      
      [group setAssetsFilter:assetType];
      [group enumerateAssetsWithOptions:NSEnumerationReverse usingBlock:^(ALAsset *result, NSUInteger index, BOOL *stopAssets) {
        if (result) {
          NSString *uri = ((NSURL *)[result valueForProperty:ALAssetPropertyAssetURL]).absoluteString;
          if (afterCursor && !foundAfter) {
            if ([afterCursor isEqualToString:uri]) {
              foundAfter = YES;
            }
            return; // Skip until we get to the first one
          }
          if (first == assets.count) {
            *stopAssets = YES;
            *stopGroups = YES;
            hasNextPage = YES;
            RCTAssert(resolvedPromise == NO, @"Resolved the promise before we finished processing the results.");
            CustomRCTResolvePromise(resolve, assets, hasNextPage);
            resolvedPromise = YES;
            return;
          }
          CGSize dimensions = [result defaultRepresentation].dimensions;
          CLLocation *loc = [result valueForProperty:ALAssetPropertyLocation];
          NSDate *date = [result valueForProperty:ALAssetPropertyDate];
          ALAssetRepresentation *representation = [result defaultRepresentation];
          CGImageRef imageRef = [representation fullResolutionImage];
          NSData *imageData = UIImageJPEGRepresentation([UIImage imageWithCGImage:imageRef], 0.7);
          NSString *base64Encoded = [imageData base64EncodedStringWithOptions:0];
          [assets addObject:@{
                              @"node": @{
                                  @"type": [result valueForProperty:ALAssetPropertyType],
                                  @"group_name": [group valueForProperty:ALAssetsGroupPropertyName],
                                  @"image": @{
                                      @"uri": uri,
                                      @"height": @(dimensions.height),
                                      @"width": @(dimensions.width),
                                      @"isStored": @YES,
                                      @"base64": base64Encoded,
                                      },
                                  @"timestamp": @(date.timeIntervalSince1970),
                                  @"location": loc ? @{
                                    @"latitude": @(loc.coordinate.latitude),
                                    @"longitude": @(loc.coordinate.longitude),
                                    @"altitude": @(loc.altitude),
                                    @"heading": @(loc.course),
                                    @"speed": @(loc.speed),
                                    } : @{},
                                  }
                              }];
        }
      }];
    } else {
      // Sometimes the enumeration continues even if we set stop above, so we guard against resolving the promise
      // multiple times here.
      if (!resolvedPromise) {
        CustomRCTResolvePromise(resolve, assets, hasNextPage);
        resolvedPromise = YES;
      }
    }
  } failureBlock:^(NSError *error) {
    if (error.code != ALAssetsLibraryAccessUserDeniedError) {
//      RCTLogError(@"Failure while iterating through asset groups %@", error);
    }
    reject(customRCTErrorUnableToLoad, nil, error);
  }];
}

@end
