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

void PostMouseEvent(CGMouseButton button, CGEventType type, const CGPoint point)
{
    CGEventRef theEvent = CGEventCreateMouseEvent(NULL, type, point, button);
    CGEventSetType(theEvent, type);
    CGEventPost(kCGHIDEventTap, theEvent);
    CFRelease(theEvent);
}

int main(int argc, char *argv[]) {
  NSAutoreleasePool *pool = [[NSAutoreleasePool alloc] init];
  NSUserDefaults *args = [NSUserDefaults standardUserDefaults];
  NSString *xarg = [NSString stringWithUTF8String:argv[1]];
  NSString *yarg = [NSString stringWithUTF8String:argv[2]];

  // grabs command line arguments -x and -y
  //
  int x = [xarg intValue];
  int y = [yarg intValue];

  // The data structure CGPoint represents a point in a two-dimensional
  // coordinate system.  Here, X and Y distance from upper left, in pixels.
  //
  CGPoint pt;
  pt.x = x;
  pt.y = y;

  PostMouseEvent( kCGMouseButtonLeft, kCGEventMouseMoved, pt );

  [pool release];
  return 0;
}
