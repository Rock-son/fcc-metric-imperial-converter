/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
		var input = req.query.input;
		var initNum = convertHandler.getNum(input);
		var initUnit = convertHandler.getUnit(input);
		var returnNum = convertHandler.convert(initNum, initUnit);
		var returnUnit = convertHandler.getReturnUnit(initUnit);
		var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

		if (!initNum && !initUnit) {
			return res.send("invalid number and unit")
		} else if (!initNum) {
			return res.send("invalid number")
		} else if (!initUnit) {
			return res.send("invalid unit")
		}
		res.json({
			initNum: parseResultInteger(initNum),
			initUnit,
			returnNum: parseResultInteger(returnNum),
			returnUnit,
			string: toString
		});
    });
};

function parseResultInteger(input) {
	return Number.isInteger(+input) ? input : Math.round(input * 100000) / 100000;
}