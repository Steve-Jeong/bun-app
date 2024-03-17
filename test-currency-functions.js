const {
  canadianToUs,
  usToCanadian,
  exchangeRate,
} = require("./currency-functions");

function currencyFunction() {
  console.log("50 Canadian dollars equals this amount of US dollars:");
  console.log(canadianToUs(50));

  console.log("30 US dollars equals this amount of Canadian dollars:");
  console.log(usToCanadian(30));

  console.log('exchange rate : ', exchangeRate)
}

// console.log("50 Canadian dollars equals this amount of US dollars:");
// console.log(canadianToUs(50));

// console.log("30 US dollars equals this amount of Canadian dollars:");
// console.log(usToCanadian(30));



exports.currencyFunction = currencyFunction;
