/*
*
*
*       Complete the handler logic below
*
*
*/
var xss = require("xss");

function ConvertHandler() {

  this.getNum = function(input) {
	var html = xss(input);
	// return every number in an array - if none exits return [1]
	var numArr = html.match(/^\d?.*\d/) || [1];
	// check every number in regex array and return false if any of them are not numbers
	var isNumeric = !!numArr.filter(item => !isNaN(parseFloat(item)) && isFinite(item)).length;
	var result = isNumeric ? eval(numArr.join("/")) : null;

    return result;
  };

  this.getUnit = function(input) {
    var result = input.split((input.match(/^\d?.*\d/) || [])[0])[1] || input;

    return this.getReturnUnit(result) ? result : undefined;
  };

  this.getReturnUnit = function(initUnit) {
	var returnUnit = {
		mi: "km",
		gal: "L",
		lbs: "kg",
		km: "mi",
		L: "gal",
		kg: "lbs"
	};
    var result = returnUnit[initUnit];

    return result;
  };

  this.spellOutUnit = function(unit) {
	var unitSpell = {
		mi: "miles",
		km: "kilometers",
		lbs: "pounds",
		kg: "kilograms",
		L: "liter",
		gal: "gallon"
	};
    var result = unitSpell[unit];

    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
	const miToKm = 1.60934;
	const LToGal = 1 / galToL;
	const kgToLbs = 1 / lbsToKg;
	const kmToMi = 1 / miToKm;
	const coefficient = {
		gal: galToL,
		lbs: lbsToKg,
		mi: miToKm,
		L: LToGal,
		kg: kgToLbs,
		km: kmToMi
	};

    var result = (initNum * coefficient[initUnit]);

    return result;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result = `${parseResultInteger(initNum)} ${this.spellOutUnit(initUnit)} converts to ${parseResultInteger(returnNum)} ${this.spellOutUnit(returnUnit)}`;

    return result;
  };

}

module.exports = ConvertHandler;


function parseResultInteger(input) {
	return Number.isInteger(+input) ? input : Math.round(input * 100000) / 100000;
}