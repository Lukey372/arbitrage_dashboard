const { Router } = require('express');
const ABICoder = require("web3-eth-abi");
const Decimal = require('decimal.js');
const { mongoClient } = require('../constants');
const router = Router();
const trades = [{
  "_id": {
    "$oid": "630fc2421f36d3354a2a25fa"
  },
  "executionReport": {
    "eventType": "executionReport",
    "eventTime": 1661977148612,
    "symbol": "SLPETH",
    "newClientOrderId": "0e6c42bf-0f2c-412e-9094-e8d6e271e210",
    "originalClientOrderId": "",
    "side": "SELL",
    "orderType": "LIMIT",
    "timeInForce": "GTC",
    "quantity": "489064.00000000",
    "price": "0.00000250",
    "executionType": "TRADE",
    "stopPrice": "0.00000000",
    "icebergQuantity": "0.00000000",
    "orderStatus": "FILLED",
    "orderRejectReason": "NONE",
    "orderId": 98103172,
    "orderTime": 1661977148612,
    "lastTradeQuantity": "489064.00000000",
    "totalTradeQuantity": "489064.00000000",
    "priceLastTrade": "0.00000250",
    "commission": "0.00122266",
    "commissionAsset": "ETH",
    "tradeId": 9602359,
    "isOrderWorking": false,
    "isBuyerMaker": true,
    "creationTime": 1661975658518,
    "totalQuoteTradeQuantity": "1.22266000",
    "orderListId": -1,
    "quoteOrderQuantity": "0.00000000",
    "lastQuoteTransacted": "1.22266000"
  },
  "transactionReceipt": {
    "blockHash": "0xdb250225700b847ecb5d09b8b8196b1dcaa2dcb3a7c6ee790ef5a61c4c34e4ea",
    "blockNumber": 16787645,
    "contractAddress": null,
    "cumulativeGasUsed": 264341,
    "effectiveGasPrice": 2136193200000,
    "from": "0x348444251e666cacbba54268245e5dfabb4c66ee",
    "gasUsed": 148687,
    "logs": [
      {
        "address": "0xc99a6A985eD2Cac1ef41640596C5A5f9F4E19Ef5",
        "topics": [
          "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
          "0x000000000000000000000000348444251e666cacbba54268245e5dfabb4c66ee",
          "0x000000000000000000000000306a28279d04a47468ed83d55088d0dcd1369294"
        ],
        "data": "0x00000000000000000000000000000000000000000000000010e74a95e6f262ef",
        "blockNumber": 16787645,
        "transactionHash": "0x3835bb1f3ea25174c435d136900b2ff6863814c495eb762c7aa6743b17224fa4",
        "transactionIndex": 1,
        "blockHash": "0xdb250225700b847ecb5d09b8b8196b1dcaa2dcb3a7c6ee790ef5a61c4c34e4ea",
        "logIndex": 0,
        "removed": false,
        "id": "log_1a5d2063"
      },
      {
        "address": "0xa8754b9Fa15fc18BB59458815510E40a12cD2014",
        "topics": [
          "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
          "0x000000000000000000000000306a28279d04a47468ed83d55088d0dcd1369294",
          "0x000000000000000000000000348444251e666cacbba54268245e5dfabb4c66ee"
        ],
        "data": "0x0000000000000000000000000000000000000000000000000000000000077668",
        "blockNumber": 16787645,
        "transactionHash": "0x3835bb1f3ea25174c435d136900b2ff6863814c495eb762c7aa6743b17224fa4",
        "transactionIndex": 1,
        "blockHash": "0xdb250225700b847ecb5d09b8b8196b1dcaa2dcb3a7c6ee790ef5a61c4c34e4ea",
        "logIndex": 1,
        "removed": false,
        "id": "log_c4a4b9fa"
      },
      {
        "address": "0xc99a6A985eD2Cac1ef41640596C5A5f9F4E19Ef5",
        "topics": [
          "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
          "0x000000000000000000000000306a28279d04a47468ed83d55088d0dcd1369294",
          "0x000000000000000000000000097faa854b87fdebb538f1892760ea1b4f31fa41"
        ],
        "data": "0x000000000000000000000000000000000000000000000000000229e4aed5e195",
        "blockNumber": 16787645,
        "transactionHash": "0x3835bb1f3ea25174c435d136900b2ff6863814c495eb762c7aa6743b17224fa4",
        "transactionIndex": 1,
        "blockHash": "0xdb250225700b847ecb5d09b8b8196b1dcaa2dcb3a7c6ee790ef5a61c4c34e4ea",
        "logIndex": 2,
        "removed": false,
        "id": "log_a55a75ff"
      },
      {
        "address": "0x306A28279d04a47468ed83d55088d0DCd1369294",
        "topics": [
          "0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1"
        ],
        "data": "0x000000000000000000000000000000000000000000000000000000011332724400000000000000000000000000000000000000000000026d8c93e819be16cd4e",
        "blockNumber": 16787645,
        "transactionHash": "0x3835bb1f3ea25174c435d136900b2ff6863814c495eb762c7aa6743b17224fa4",
        "transactionIndex": 1,
        "blockHash": "0xdb250225700b847ecb5d09b8b8196b1dcaa2dcb3a7c6ee790ef5a61c4c34e4ea",
        "logIndex": 3,
        "removed": false,
        "id": "log_188f18b7"
      },
      {
        "address": "0x306A28279d04a47468ed83d55088d0DCd1369294",
        "topics": [
          "0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822",
          "0x0000000000000000000000007d0556d55ca1a92708681e2e231733ebd922597d",
          "0x000000000000000000000000348444251e666cacbba54268245e5dfabb4c66ee"
        ],
        "data": "0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010e74a95e6f262ef00000000000000000000000000000000000000000000000000000000000776680000000000000000000000000000000000000000000000000000000000000000",
        "blockNumber": 16787645,
        "transactionHash": "0x3835bb1f3ea25174c435d136900b2ff6863814c495eb762c7aa6743b17224fa4",
        "transactionIndex": 1,
        "blockHash": "0xdb250225700b847ecb5d09b8b8196b1dcaa2dcb3a7c6ee790ef5a61c4c34e4ea",
        "logIndex": 4,
        "removed": false,
        "id": "log_f036e0fa"
      }
    ],
    "logsBloom": "0x00240040000000000000000080000000000000000000004000000000000000000000000000000000000044000000000000040000100000080000000000000000000200000000000000000008000000201000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000800000000000008000020000000000000000000080000004000000800010000000000000000000400000000000000000000000000000000000100000000000002000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000020000000040000",
    "status": true,
    "to": "0x7d0556d55ca1a92708681e2e231733ebd922597d",
    "transactionHash": "0x3835bb1f3ea25174c435d136900b2ff6863814c495eb762c7aa6743b17224fa4",
    "transactionIndex": 1,
    "type": "0x0"
  }
}]

router.get('/trades', async (req, res) => {
  let documents = await mongoClient.db("arbitrage").collection("trades").find({}).toArray();
  let trades = documents.map(trade => formatTrade(trade));
  res.json({ trades })
})



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
  }else{
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
      amountIn:null,
      amountOut:null,
      profit:null,
      transactionHash,
      status,
    }
  }

}

function amountWithCommission(amount, commissionAsset, side) {
  return side == 'SELL' ? new Decimal(amount).times(commissionAsset == "BNB" ? 0.99925 : 0.999) : new Decimal(amount).times(commissionAsset == "BNB" ? 1.00075 : 1.001)
}