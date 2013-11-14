// File:
// move.m
//
// Compile with:
// gcc -o move move.m -framework ApplicationServices -framework Foundation
//
// Usage:
// ./move -x pixels -y pixels
// At the given coordinates it will move the mouse


#import <Foundation/Foundation.h>
#import <ApplicationServices/ApplicationServices.h>


int main(int argc, char *argv[]) {
  NSAutoreleasePool *pool = [[NSAutoreleasePool alloc] init];
  NSUserDefaults *args = [NSUserDefaults standardUserDefaults];


  // grabs command line arguments -x and -y
  //
  int x = [args integerForKey:@"x"];
  int y = [args integerForKey:@"y"];


  // The data structure CGPoint represents a point in a two-dimensional
  // coordinate system.  Here, X and Y distance from upper left, in pixels.
  //
  CGPoint pt;
  pt.x = x;
  pt.y = y;


  // This is where the magic happens.  See CGRemoteOperation.h for details.
  //
  // CGPostMouseEvent( CGPoint        mouseCursorPosition,
  //                   boolean_t      updateMouseCursorPosition,
  //                   CGButtonCount  buttonCount,
  //                   boolean_t      mouseButtonDown, ... )
  //
  // So, we feed coordinates to CGPostMouseEvent and put the mouse there
  //
  CGPostMouseEvent( pt, 1, 1, false );

  [pool release];
  return 0;
}
