import { useState } from "react";
import TradesTable from "./Trades";
import TradeConfig from "./tradeConfig";
import { Flex, Stack } from "@chakra-ui/react";


interface Trade {
  tradeId: string;
  side: string;
  symbol: string;
  eventTime: number;
  lastTradeQuantity: number;
  price: string;
  commission: string;
  commissionAsset: string;
  effectiveGasPrice: string;
  gasUsed: string;
  amountIn: string;
  amountOut: string;
  profit: number;
  orderId: string;
  transactionHash: string;
  status: boolean;
  sum: number;
};


function ListOfTrades() {

  const [trades, setTrades] = useState<Trade[]>([]);

  function timeConverter(UNIX_timestamp: number) {
    var a = new Date(UNIX_timestamp);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var month = months[a.getMonth()];
    var date = a.getDate() < 10 ? "0" + a.getDate() : a.getDate();
    var hour = a.getHours() < 10 ? "0" + a.getHours() : a.getHours();
    var min = a.getMinutes() < 10 ? "0" + a.getMinutes() : a.getMinutes();
    var time = `${date}-${month} | ${hour}:${min}`;
    return time;
  }


  return (
    <Flex
      minHeight="100vh"
      width={"100%"}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      
      <Stack width={"100%"} direction={{base:"column",sm:"column",md:"column",lg:"row"}}>
        <TradesTable {...{ trades, setTrades, timeConverter }} />
        <TradeConfig {...{ trades, setTrades, timeConverter }} />
      </Stack>
    </Flex>
  );
}

export default ListOfTrades;
