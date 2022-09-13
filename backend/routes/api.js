const { Router } = require('express');
const ABICoder = require("web3-eth-abi");
const Decimal = require('decimal.js');
const { mongoClient } = require('../constants');
const { parse, isValid, startOfDay, endOfDay } = require('date-fns');
const router = Router();
let sum = 0

router.get('/trades', async (req, res) => {
  sum = 0
  const { period } = req.query;
  let [fromTimestamp, toTimestamp] = getPeriodTimestampRange(period);
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
    sum = sum + Number(profit)
    
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
      sum,
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
      sum,
    }
  }
}

function amountWithCommission(amount, commissionAsset, side) {
  return side == 'SELL' ? new Decimal(amount).times(commissionAsset == "BNB" ? 0.99925 : 0.999) : new Decimal(amount).times(commissionAsset == "BNB" ? 1.00075 : 1.001)
}

function getPeriodTimestampRange(period) {

  const formatString = 'yyyy-MM-dd';
  const backupDate = new Date();

  let range = [new Date(), new Date()];

  let parsedPeriod = parse(period, formatString, backupDate);
  let parsedFromDate = parse(period.split(',')[0], formatString, backupDate);
  var parsedToDate = parse(period.split(',')[1], formatString, backupDate);

  if (isValid(parsedPeriod)) {
    range[0] = new Date(parsedPeriod);
    range[1] = new Date(parsedPeriod);
  } else if (isValid(parsedFromDate) && isValid(parsedToDate)) {
    range[0] = new Date(parsedFromDate);
    range[1] = new Date(parsedToDate);
  };

  return [startOfDay(range[0]).getTime(), endOfDay(range[1]).getTime()];
};