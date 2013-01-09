var Currency = currency || (function(){
  "use strict";
  var currObj = {};

  currObj.numberToCurrency = function(number,options){
    // set defaults...
    if (typeof options == 'undefined') { options = {}; }
    var precision = options.precision || 2,
        unit      = options.unit      || '$',
        separator = options.separator || '.',
        delimiter = options.delimiter || ',',
        format    = options.format    || '%u%n',
        numberStr,
        numberFormatted,
        negativeFormat = options.negativeFormat || '-%u%n';

    // "clean up" number
    //    strip dollar sign
    //
    if (typeof number == 'string') { number = number.replace(/\$/g, ''); }
    /* set to 0.0 if we can't tell what it is */
    number = isNaN(number) || number === '' || number === null ? 0.0 : number;

    // determine which format to use
    if (number < 0) {
        format = negativeFormat;
        number = Math.abs(number); // "remove" the negative sign
    }

    // 'separate' the cents
    numberStr = parseFloat(number).toFixed(precision).toString();
    // this returns the cents
    numberFormatted = new Array(numberStr.slice(-1*precision));  
    // add the separator
    numberFormatted.unshift(separator); 
    // this removes the decimal and cents
    numberStr = numberStr.substring(0, numberStr.length-(precision+1)); 

    // 'delimit' the thousands
    while (numberStr.length > 3) {
        // this prepends the last three digits to `numberFormatted`
        numberFormatted.unshift(numberStr.slice(-3)); 
        // this prepends the delimiter to `numberFormatted`
        numberFormatted.unshift(delimiter); 
        // this removes the last three digits
        numberStr = numberStr.substring(0, numberStr.length-3);  
    }
    // there are less than three digits in numberStr, so prepend them
    numberFormatted.unshift(numberStr); 
    // put it all together
    return format.gsub(/%u/,unit).gsub(/%n/,numberFormatted.join('')); 
  };

  return currObj;

})();


