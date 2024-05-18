const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  test('Number Test', function() {
    assert.equal(convertHandler.getNum('1kg'), 1, 'convertHandler should correctly read a whole number input.');
    assert.equal(convertHandler.getNum('1.0kg'), 1, 'convertHandler should correctly read a decimal number input.');
    assert.equal(convertHandler.getNum('1/1kg'), 1, 'convertHandler should correctly read a fractional input.');
    assert.equal(convertHandler.getNum('1/1.0kg'), 1, 'convertHandler should correctly read a fractional input with a decimal.');
    assert.equal(convertHandler.getNum('kg'), 1, 'convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.');
  });
  test('Unit Test', function(){
    const units = [
      ['kg', 'kg', 'kilograms'],
      ['km', 'km', 'kilometers'],
      ['L', 'L', 'liters'],
      ['lbs', 'lbs', 'pounds'],
      ['mi', 'mi', 'miles'],
      ['gal', 'gal', 'gallons']
    ];
    const returnUnits = [
      ['kg', 'lbs'],
      ['km', 'mi'],
      ['L', 'gal']
    ];
    units.forEach(elem => {
      assert.equal(convertHandler.getUnit(elem[0]), elem[1], 'convertHandler should correctly read each valid input unit.');
      assert.equal(convertHandler.spellOutUnit(elem[0]), elem[2], 'convertHandler should correctly return the spelled-out string unit for each valid input unit.');
    })
    returnUnits.forEach(elem => {
      assert.equal(convertHandler.getReturnUnit(elem[0]), elem[1], 'convertHandler should return the correct return unit for each valid input unit.');
    })
  });
  test('Conversion Testing', function(){
    assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.01, 'convertHandler should correctly convert kg to lbs.');
    assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.01, 'convertHandler should correctly convert kg to mi.');
    assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.01, 'convertHandler should correctly convert L to gal.');
    assert.approximately(convertHandler.convert(1, 'lbs'), 0.45359, 0.01, 'convertHandler should correctly convert lbs to kg.');
    assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.01, 'convertHandler should correctly convert mi to kg.');
    assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.01, 'convertHandler should correctly convert gal to L.');
  });
  test('Error Testing', function() {
    assert.isNull(convertHandler.getNum('1/1/1kg'), 'convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).')
    assert.isNull(convertHandler.getUnit('1Ka'), 'convertHandler should correctly return an error for an invalid input unit.')
  });
});