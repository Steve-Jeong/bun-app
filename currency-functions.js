const {currencyFunction} = require("./test-currency-functions");
const exchangeRate = 0.91;

function roundTwoDecimals(amount) {
  return Math.round(amount * 100) / 100;
}

const canadianToUs = function (canadian) {
  return roundTwoDecimals(canadian * exchangeRate);
};

function usToCanadian(us) {
  return roundTwoDecimals(us / exchangeRate);
}


// function currencyFunction() {
//   console.log("50 Canadian dollars equals this amount of US dollars:");
//   console.log(canadianToUs(50));

//   console.log("30 US dollars equals this amount of Canadian dollars:");
//   console.log(usToCanadian(30));

//   console.log("exchange rate : ", exchangeRate);
// }

currencyFunction()

exports.canadianToUs = canadianToUs; // 내보내기 1
exports.usToCanadian = usToCanadian; // 내보내기 2
exports.exchangeRate = exchangeRate

// module.exports = exchangeRate