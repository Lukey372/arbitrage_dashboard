const { Router } = require('express');
const ABICoder = require("web3-eth-abi");
const Decimal = require('decimal.js');

const { mongoClient } = require('../constants');
const router = Router();


router.get('/trades', async (req, res) => {
  let [fromTimestamp, toTimestamp] = getPeriodTimestampRange(req);
  let documents = await mongoClient.db("arbitrage").collection("trades").find({ "executionReport.eventTime": { $gte: fromTimestamp, $lte: toTimestamp } }).toArray();
  let trades = documents.map(trade => formatTrade(trade));
  res.json({ trades });
});

module.exports = router;



function formatTrade(trade) {
  const { executionReport, transactionReceipt } = trade
  const { side, symbol, eventTime, lastTradeQuantity, lastQuoteTransacted, price, commission, commissionAsset, tradeId, orderId } = executionReport
  const { logs, effectiveGasPrice, gasUsed, transactionHash, status } = transactionReceipt
  if (status) {
    let test = (log) => log.topics[side == 'SELL' ? 1 : 2] == '0x000000000000000000000000348444251e666cacbba54268245e5dfabb4c66ee'
    let transferLog = logs.find(test)
    let value = ABICoder.decodeParameter("uint256", transferLog.data);
    let amountOut = new Decimal(value).dividedBy(10 ** 18)
    let amountIn = lastQuoteTransacted
    let profit = side == 'SELL' ? amountWithCommission(amountIn, commissionAsset, side).minus(amountOut) : amountOut.minus(amountWithCommission(amountIn, commissionAsset, side));

    return {
      orderId,
      tradeId,
      side,
      symbol,
      eventTime,
      lastTradeQuantity,
      price,
      commission,
      commissionAsset,
      effectiveGasPrice,
      gasUsed,
      amountIn,
      amountOut,
      profit,
      transactionHash,
      status,
    }
  } else {
    return {
      orderId,
      tradeId,
      side,
      symbol,
      eventTime,
      lastTradeQuantity,
      price,
      commission,
      commissionAsset,
      effectiveGasPrice,
      gasUsed,
      amountIn: 0,
      amountOut: 0,
      profit: 0,
      transactionHash,
      status,
    }
  }
}

function amountWithCommission(amount, commissionAsset, side) {
  return side == 'SELL' ? new Decimal(amount).times(commissionAsset == "BNB" ? 0.99925 : 0.999) : new Decimal(amount).times(commissionAsset == "BNB" ? 1.00075 : 1.001)
}



function getPeriodTimestampRange(req) {
  let { period } = req.query
  const daySeconds = 86400;
  let dateNowTimestamp = Date.now();
  let defaultRange = [dateNowTimestamp - (daySeconds * 1000), dateNowTimestamp];
  if (!period) return defaultRange
  let periodAsArray = period.split(',')
  let first = periodAsArray[0]
  let last = periodAsArray[1]
  first = first.split('-')
  last = last.split('-')
  const fromTimestamp = new Date(first[0], first[1] - 1, first[2]).getTime();
  const toTimestamp = new Date(last[0], last[1] - 1, last[2]).getTime();
  return [fromTimestamp, toTimestamp];
}


/*function getPeriodTimestampRange(period) {
  const daySeconds = 86400;
  let dateNowTimestamp = Date.now();
  let defaultRange = [dateNowTimestamp - (daySeconds * 1000), dateNowTimestamp];
  console.log(period);
  if (!period) { console.log('nda'); return defaultRange };
  let splitedPeriod = period.split(",");
  if (splitedPeriod.length == 2) {
    let from = splitedPeriod[0];
    let to = splitedPeriod[1];
    if (!(isDate(from) && isDate(to))) return defaultRange;
    let fromAsTimestamp = toDate(parseISO(from)).getTime();
    let toAsTimestamp = toDate(parseISO(to)).getTime();
    return [fromAsTimestamp, toAsTimestamp];
  } else if (!splitedPeriod.length && isDate(period)) {
    let fromAsTimestamp = toDate(parseISO(period)).getTime();
    return [fromAsTimestamp, dateNowTimestamp];
  } else {
    return defaultRange;
  }
}*/