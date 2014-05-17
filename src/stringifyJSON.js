// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
var stringifyJSON = function(obj) {
  // Stringify all non-objects.
  if (typeof obj !== "object" || obj === null || obj instanceof Date) {
    var objType = typeof obj
    if (objType === "number" || objType === "boolean" || obj === null) return String(obj);
    if (objType === "string") return '"'+obj+'"';
    if (obj instanceof Date) return '"'+obj.toJSON()+'"';
    return undefined;
  }

  // Stringify arrays.
  if (Array.isArray(obj)) {
    var arrayString = _.map(obj, function(item) {
      if (typeof item === "undefined") return String(null);
      return stringifyJSON(item);
    });

    return "[" + arrayString + "]"
  }

  // Stringify objects.
  else {
    var objectString = _(obj).map(function(value, property) {
      if (typeof value === "function" || typeof value === "undefined") return;
      return stringifyJSON(property) +":"+ stringifyJSON(value);
    }).filter(function(value) {
      return value !== undefined;
    });

    return "{"+ objectString + "}";
  }
};
