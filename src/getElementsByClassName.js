// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };
// But instead we're going to implement it from scratch:

// Global variable for tracking the elements to be searched in the recursive function calls.
var trackingObj;

var getElementsByClassName = function(className) {
  var classArray = [], reset;

  // Configure array for the initial function call when trackingObj has not yet been defined.
  if (trackingObj === undefined) {
    var testObj = [];
    testObj.push(document.body);
    reset = testObj;
  }
  else {
    var testObj = trackingObj.children;
  }

  _.each(testObj, function(item) {
    // If the html item has the specified class add to array.
    if (item.className.split(" ").indexOf(className) !== -1) {
      classArray.push(item);
    }
    // If the html item has children, search the children items.
    if (item.children && item.children.length > 0) {
      // Set trackingObj so the recursive function runs on the correct items.
      trackingObj = item;
      classArray.push(getElementsByClassName(className));
    }
  });

  // On the final function iteration reset trackingObj for the next invocation of the function.
  if (testObj === reset) {
    trackingObj = undefined;
  }

  return _.flatten(classArray);
};
