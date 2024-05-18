'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get(async (req, res) => {
    const input = req.query.input;
    let output;

    const number = await convertHandler.getNum(input);
    const unit = await convertHandler.getUnit(input);

    if (!number && !unit) {
      output = 'invalid number and unit'
    } else {
      switch (true) {
        case (!number):
          output = 'invalid number';
          break;
        case (!unit):
          output = 'invalid unit';
          break;
        default:
          const returnNum = convertHandler.convert(number, unit);
          const returnUnit = convertHandler.getReturnUnit(unit);
          output = convertHandler.getString(
            number,
            unit,
            returnNum,
            returnUnit
          );
          break;
      }
    }  

    res.send(output);
  });
};
