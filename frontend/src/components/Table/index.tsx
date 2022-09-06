import { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  HStack,
  Input,
  Flex,
  VStack,
} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import DateInput from "./dateInput";
import { isAfter, lightFormat } from "date-fns";

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
}

const roninExplorerUrl = `https://explorer.roninchain.com/`;

const coingeckoApiUrl =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum&order=market_cap_desc&per_page=100&page=1&sparkline=false";

const tradesApiUrl = "http://127.0.0.1:5000/api/trades";

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

async function getEthPrice() {
  let response = await fetch(coingeckoApiUrl);
  let responseJson = await response.json();
  return responseJson[0].current_price;
}

async function getTrades(dateFrom: string, dateTo: string) {
  let response = await fetch(`${tradesApiUrl}?period=${dateFrom},${dateTo}`);
  let responseJson = await response.json();
  return responseJson.trades;
}

function ListOfTrades() {
  const pageSize = 10;

  const [trades, setTrades] = useState<Trade[]>([]);

  const [page, setPage] = useState(0);

  const [pageData, setPageData] = useState<Trade[]>([]);

  const [currency, setCurrency] = useState("(ETH)-USD");
  const [ethereumPrice, setEthereumPrice] = useState(0);

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => (prev > 0 ? prev - 1 : prev));

  function handleCurrency() {
    setCurrency(currency === "(ETH)-USD" ? "(USD)-ETH" : "(ETH)-USD");
  }
  const [dateFrom, setDateFrom] = useState(
    lightFormat(new Date(), "yyyy-MM-dd")
  );
  const [dateTo, setDateTo] = useState(lightFormat(new Date(), "yyyy-MM-dd"));

  useEffect(() => {
    setPageData(trades.slice(page * pageSize, page * pageSize + pageSize));
  }, [page, trades]);

  useEffect(() => {
    getEthPrice().then((data) => {
      setEthereumPrice(data);
    });
  }, []);

  useEffect(() => {
    if (isAfter(new Date(dateFrom), new Date(dateTo))) return;
    getTrades(dateFrom, dateTo).then((data) => {
      setTrades(data);
    });
  }, [dateFrom, dateTo]);

  return (
    <Flex
      minHeight="100vh"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <VStack width="70%" alignSelf="start" alignItems="start">
        <DateInput {...{ dateFrom, setDateFrom, dateTo, setDateTo }} />
        <TableContainer bg="white" opacity="0.9" borderRadius="2%" w="auto">
          <Table>
            <Thead bg="gray.200" _hover={{ bg: "gray.300" }}>
              <Tr>
                <Th>Status</Th>
                <Th>Order Id</Th>
                <Th>Trade Id</Th>
                <Th>Time</Th>
                <Th>Pair</Th>
                <Th>Side</Th>
                <Th>Quantity</Th>
                <Th>Price</Th>
                <Th>Commission</Th>
                <Th onClick={handleCurrency}>Profit {currency}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {pageData.map((trade) => {
                return (
                  <Tr _hover={{ bg: "gray.100" }}>
                    {/*<Link  _hover={{ textDecoration: 'none' }} href={explorerLink+trade.transactionHash} isExternal> */}
                    <Td color={trade.status ? "green" : "red"}>
                      {trade.status ? "Success" : "Failure"}
                    </Td>
                    <Td>{trade.orderId}</Td>
                    <Td>{trade.tradeId}</Td>
                    <Td>{timeConverter(trade.eventTime)}</Td>
                    <Td>{trade.symbol}</Td>
                    <Td color={trade.side === "BUY" ? "green" : "red"}>
                      {trade.side}
                    </Td>
                    <Td>
                      {Number(trade.lastTradeQuantity).toFixed(0) + " SLP"}
                    </Td>
                    <Td>{trade.price}</Td>
                    <Td>{`${trade.commission} (${trade.commissionAsset})`}</Td>
                    <Td>
                      {currency === "(ETH)-USD"
                        ? `${Number(trade.profit || 0).toFixed(6)} ETH`
                        : `${((trade.profit || 0) * ethereumPrice).toFixed(
                            2
                          )} USD`}
                    </Td>
                    {/*  </Link> */}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
        <HStack alignSelf="center">
          <Button onClick={prevPage} isDisabled={page === 0 ? true : false}>
            <ArrowLeftIcon color="#277BC0" />
          </Button>
          <Input
            fontSize="1xl"
            textAlign="center"
            value={page + 1 + "/" + Math.ceil(trades.length / pageSize)}
            maxW="5rem"
            bg="white"
            placeholder="1"
          />
          <Button
            onClick={nextPage}
            isDisabled={
              page + 1 === Math.ceil(trades.length / pageSize) &&
              Math.ceil(trades.length / pageSize) >= 1
                ? true
                : false
            }
          >
            <ArrowRightIcon color="#277BC0" />
          </Button>
        </HStack>
      </VStack>
    </Flex>
  );
}

export default ListOfTrades;
