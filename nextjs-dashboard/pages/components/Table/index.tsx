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
  const [volume, setVolume] = useState(0)
  const [totalGasFee, setTotalGasFee] = useState(0)
  const [ethereumPrice, setEthereumPrice] = useState(0);
  const [sum, setSum] = useState(0);
  const [slpPrice, setSlpPrice] = useState(0)
  const [ronPrice, setRonPrice] = useState(0)
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

      <Stack width={"100%"} direction={{ base: "column", sm: "column", md: "column", lg: "row" }}>
        <TradesTable {...{ trades, setTrades, timeConverter, volume, setVolume, totalGasFee, setTotalGasFee, ethereumPrice, setEthereumPrice, sum, setSum, slpPrice, setSlpPrice, ronPrice, setRonPrice }} />
        <TradeConfig {...{ trades, setTrades, timeConverter, volume, setVolume, totalGasFee, setTotalGasFee, ethereumPrice, setEthereumPrice, sum, setSum, slpPrice, setSlpPrice, ronPrice, setRonPrice }} />
      </Stack>
    </Flex>
  );
}

export default ListOfTrades;
