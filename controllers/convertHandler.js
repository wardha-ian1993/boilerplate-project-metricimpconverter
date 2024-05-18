function ConvertHandler() {
  // Method to extract the numeric value from the input string
  this.getNum = function(input) {
    const valRegex = /^(\w+)?(?:^\d+(?:(\.\d+(\/\d+(\.\d+)?)?)|(\/\d+(\.\d+)?))?)?(\w+)$/i;
    const noNumRegex = /^(kg|lbs|L|gal|km|mi)$/i;
    const isValid = valRegex.test(input);
    const isNoNum = noNumRegex.test(input); 

    let result;
    
    if (!isValid) {
      return null;
    }
    if (!isNoNum) {
      const numRegex = /^\d+(?:(\.\d+(\/\d+(\.\d+)?)?)|(\/\d+(\.\d+)?))?/g;
      const fracRegex = /^\d+(\.\d+)?\/\d+(\.\d+)?/g;

      result = input.match(numRegex).join('');
      const isFrac = fracRegex.test(result);

      if (!isFrac) {
        return result;
      } else {
        const parseNum = () => {
          const terms = result.split(/([\+\-\*\/])/g)
            .filter(term => term.trim() !== '')
            .map(term => isNaN(term) ? term : Number(term));
          
          let parsed;
          let operand1 = terms[0];

          for (let i = 1; i < terms.length; i += 2) {
            const operand2 = terms[i + 1];
            parsed = operand1 /= operand2;
          }

          return parsed;
        };
        result = parseNum();
        return result;
      }
    }
    result = 1;
    return result;
  };
  
  // Method to extract the unit from the input string
  this.getUnit = function(input) {
    const unitRegex = /(kg|lbs|L|gal|km|mi)$/gi;
    const isValid = unitRegex.test(input);
  
    let result;
  
    if (!isValid) {
      return null; 
    }
    
    result = input.match(unitRegex).join('');
    if (result === 'L' || result === 'l') {
      result = result.toUpperCase();
    } else {
      result = result.toLowerCase();
    }
    return result;
  };
  
  // Method to determine the return unit based on the initial unit
  this.getReturnUnit = function(initUnit) {
    let result;
    const unitsArr = [
      ['km', 'mi'],
      ['kg', 'lbs'],
      ['L', 'gal']
    ];

    unitsArr.forEach(elem => {
      if (elem.includes(initUnit)) {
        switch (true) {
          case (elem[0] === initUnit):
            result = elem[1];
            break;
          case (elem[1] === initUnit):
            result = elem[0];
            break
          default:
            break;
        }
      }
    });

    return result;
  };

  // Method to spell out the full name of a given unit
  this.spellOutUnit = function(unit) {
    const unitsName = {
      'km': 'kilometers',
      'kg': 'kilograms',
      'L': 'liters',
      'mi': 'miles',
      'lbs': 'pounds',
      'gal': 'gallons',
    }
    
    let result;

    for (unitName in unitsName) {
      if (unit === unitName) {
        result = unitsName[unitName];
        break;
      }
    };

    return result;
  };
  
  // Method to perform the conversion based on initial number and unit
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsTokg = 0.453592;
    const miTokm = 1.60934;

    const unitsArr = [
      ['km', 'mi', miTokm],
      ['kg', 'lbs', lbsTokg],
      ['L', 'gal', galToL]
    ];

    let result = 1;

    unitsArr.forEach(elem => {
      if (elem.includes(initUnit)) {
        switch (true) {
          case (elem[0] === initUnit):
            result = initNum / elem[2];
            break;
          case (elem[1] === initUnit):
            result = initNum * elem[2];
            break
          default:
            break;
        }
      }
    });

    return Number(result.toFixed(5));
  };
  
  // Method to generate a string describing the conversion
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = { 
      initNum: initNum, 
      initUnit: initUnit, 
      returnNum: returnNum, 
      returnUnit: returnUnit, 
      string: `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
    };

    return result;
  };

}

module.exports = ConvertHandler;
