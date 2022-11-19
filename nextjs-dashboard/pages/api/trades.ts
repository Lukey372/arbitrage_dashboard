// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const ABICoder = require("web3-eth-abi");
const Decimal = require('decimal.js');
const { MongoClient } = require("mongodb");
const { MONGODB_URI } = process.env;
const mongoClient = new MongoClient(MONGODB_URI);
const { parse, isValid, startOfDay, endOfDay } = require('date-fns');

type Data = {
  name: string
}

export default async function handler(req: NextApiRequest,res: NextApiResponse<Data>) {
  const {
    query: {period }
  } = req;
  let [fromTimestamp, toTimestamp] = getPeriodTimestampRange(period);
let documents = await mongoClient.db("arbitrage").collection("trades").find({ "executionReport.eventTime": { $gte: fromTimestamp, $lte: toTimestamp } }).toArray();

let trades = documents.map((trade: any) => formatTrade(trade));
res.status(200).json( trades )
}






function formatTrade(trade:any) {
  const { executionReport, transactionReceipt } = trade
  const { side, symbol, eventTime, lastTradeQuantity, lastQuoteTransacted, price, commission, commissionAsset, tradeId, orderId } = executionReport
  const { logs, effectiveGasPrice, gasUsed, transactionHash, status } = transactionReceipt
  if (status) {
    let test = (log:any) => log.topics[side == 'SELL' ? 1 : 2] == '0x000000000000000000000000348444251e666cacbba54268245e5dfabb4c66ee'
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

function amountWithCommission(amount:any, commissionAsset:any, side:any) {
  return side == 'SELL' ? new Decimal(amount).times(commissionAsset == "BNB" ? 0.99925 : 0.999) : new Decimal(amount).times(commissionAsset == "BNB" ? 1.00075 : 1.001)
}

function getPeriodTimestampRange(period:any) {

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