import { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button, Skeleton, HStack, Input, Stack, Box, Checkbox, Menu, MenuButton, MenuList, MenuItem, Tooltip, VStack } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { isAfter, lightFormat } from "date-fns";
import DateInput from "./dateInput";
import { time } from "console";

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
    additionalInfos: any;
};

const roninExplorerUrl = `https://explorer.roninchain.com/`;

const coingeckoApiUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum&order=market_cap_desc&per_page=100&page=1&sparkline=false";

const tradesApiUrl = "http://127.0.0.1:5000/api/trades";


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




export default function TradeTable(props: {
    trades: any[];
    setTrades: any;
    timeConverter: any
}) {
    const { trades, setTrades, timeConverter } = props;
    const pageSize = 10;

    const [page, setPage] = useState(0);

    const [sum, setSum] = useState(0);

    const [ethereumPrice, setEthereumPrice] = useState(0);

    const [orderIdFilter, setOrderIdFilter] = useState(false);

    const [pageData, setPageData] = useState<Trade[]>([]);

    const [currency, setCurrency] = useState("(USD)-ETH");

    const [dateFrom, setDateFrom] = useState(lightFormat(new Date(), "yyyy-MM-dd"));

    const [dateTo, setDateTo] = useState(lightFormat(new Date(), "yyyy-MM-dd"));

    const [isStatus, setIsStatus] = useState(false);
    const [isOrderId, setIsOrderId] = useState(true);
    const [isTradeId, setIsTradeId] = useState(false);
    const [isTime, setIsTime] = useState(true);
    const [isPair, setIsPair] = useState(false);
    const [isSide, setIsSide] = useState(true);
    const [isQuantity, setIsQuantity] = useState(true);
    const [isPrice, setIsPrice] = useState(true);
    const [isCommission, setIsCommission] = useState(true);
    const [isGas, setIsGas] = useState(false);
    const [isProfit, setIsProfit] = useState(true);
    const [isLoaded, setIsLoaded] = useState(true)

    const nextPage = () => setPage((prev) => prev + 1);

    const prevPage = () => setPage((prev) => (prev > 0 ? prev - 1 : prev));



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
        setIsLoaded(false);
        getTrades(dateFrom, dateTo).then((data) => {
            setPage(0);
            setIsLoaded(true);
            orderIdFilter ? setTrades(orderIdTrades(data)) : setTrades(data);
        });
    }, [dateFrom, dateTo, orderIdFilter]);


    useEffect(() => {
        let totalProfit = 0
        trades.forEach(item => { totalProfit = totalProfit + Number(item.profit) });
        setSum(totalProfit);
    }, [trades]);


    function handleCurrency() { setCurrency(currency === "(ETH)-USD" ? "(USD)-ETH" : "(ETH)-USD"); }

    function orderIdTrades(props: any[]) {
        let temporaryTable = [];
        let finalTable = [];
        let [lastOrderId, profits, quantities, gases, commissions] = [0, 0, 0, 0, 0];

        for (const item of props) {
            if ((item.orderId == lastOrderId || temporaryTable.length == 0) && item.tradeId != props[props.length - 1].tradeId) { temporaryTable.push(item); lastOrderId = item.orderId }
            else {
                if (item.tradeId == props[props.length - 1].tradeId) { temporaryTable.push(item) }
                for (const subItem of temporaryTable) {
                    profits = profits + Number(subItem.profit)
                    quantities = quantities + Number(subItem.lastTradeQuantity)
                    gases = gases + Number(subItem.gasUsed) * Number(subItem.effectiveGasPrice) / (10 ** 18)
                    commissions = commissions + Number(subItem.commission)

                }
                finalTable.push(temporaryTable[0])
                finalTable[finalTable.length - 1].quantity = quantities
                finalTable[finalTable.length - 1].profit = profits
                finalTable[finalTable.length - 1].gasUsed = gases
                finalTable[finalTable.length - 1].commission = commissions
                finalTable[finalTable.length - 1].additionalInfos = {
                    tradeCount: temporaryTable.length,
                    firstTradeTime: temporaryTable[0].eventTime,
                    lastTradeTime: temporaryTable[temporaryTable.length - 1].eventTime
                }

                profits = 0
                quantities = 0
                gases = 0
                commissions = 0
                temporaryTable = []
                temporaryTable.push(item)
                lastOrderId = item.orderId
            }

        }

        return finalTable
    }


    function CheckBOX() {
        return (
            <Menu closeOnSelect={false}>
                <MenuButton marginLeft={"50%"} as={Button} rightIcon={<ChevronDownIcon />}>
                    Filter
                </MenuButton>
                <MenuList>
                    <MenuItem><Checkbox isChecked={isStatus ? true : false} onChange={() => { setIsStatus(!isStatus) }}>Status</Checkbox></MenuItem>
                    <MenuItem><Checkbox isChecked={isOrderId ? true : false} onChange={() => { setIsOrderId(!isOrderId) }}>Order Id</Checkbox></MenuItem>
                    <MenuItem><Checkbox isChecked={isTradeId ? true : false} onChange={() => { setIsTradeId(!isTradeId) }}>Trade Id</Checkbox></MenuItem>
                    <MenuItem><Checkbox isChecked={isTime ? true : false} onChange={() => { setIsTime(!isTime) }} >Time</Checkbox></MenuItem>
                    <MenuItem><Checkbox isChecked={isPair ? true : false} onChange={() => { setIsPair(!isPair) }} >Pair</Checkbox></MenuItem>
                    <MenuItem><Checkbox isChecked={isSide ? true : false} onChange={() => { setIsSide(!isSide) }} >Side</Checkbox></MenuItem>
                    <MenuItem><Checkbox isChecked={isQuantity ? true : false} onChange={() => { setIsQuantity(!isQuantity) }} >Quantity</Checkbox></MenuItem>
                    <MenuItem><Checkbox isChecked={isPrice ? true : false} onChange={() => { setIsPrice(!isPrice) }} >Price</Checkbox></MenuItem>
                    <MenuItem><Checkbox isChecked={isCommission ? true : false} onChange={() => { setIsCommission(!isCommission) }} >Commission</Checkbox></MenuItem>
                    <MenuItem><Checkbox isChecked={isGas ? true : false} onChange={() => { setIsGas(!isGas) }} >Gas Fees</Checkbox></MenuItem>
                    <MenuItem><Checkbox isChecked={isProfit ? true : false} onChange={() => { setIsProfit(!isProfit) }} >Profit</Checkbox></MenuItem>
                </MenuList>
            </Menu>
        )
    }
    return (

        <Stack minW={{ base: "100%", sm: "100%", md: "100%", lg: "50%" }} maxW={{ base: "100%", sm: "100%", md: "100%", lg: "100%", xl: "50%" }} height={"100%"} alignSelf="start" alignItems="start" paddingLeft="1rem" paddingRight="1rem" direction={"column"}>
            <Stack direction={"row"} maxW='100%' minW="100%" alignItems="center">
                <Stack direction={{ base: "column", sm: "column", md: "column", lg: "column", xl: "row" }}>
                    <DateInput {...{ dateFrom, setDateFrom, dateTo, setDateTo }} />
                    <Box
                        color='white'

                        justifyContent="center"
                        alignItems="center"
                        padding="10px">
                        The total gain on the selected period is : {currency === "(ETH)-USD" ? (sum).toFixed(6) + " ETH" : (sum * ethereumPrice).toFixed(2) + " USD"}
                    </Box>
                </Stack>
                <CheckBOX />
            </Stack>
            <TableContainer bg="white" opacity="0.9" borderRadius="10px" minW="100%" minH="575px" >
                <Table>
                    <Thead bg="gray.200" _hover={{ bg: "gray.300" }}>
                        <Tr>
                            {isStatus ? <Th>Status</Th> : null}
                            {isOrderId ? <Th onClick={() => { setOrderIdFilter(!orderIdFilter) }}><Tooltip label='Click to Filter by OrderId' bg="white" borderRadius="8">Order Id</Tooltip></Th> : null}
                            {isTradeId ? <Th>Trade Id</Th> : null}
                            {isTime ? <Th>Time</Th> : null}
                            {isPair ? <Th>Pair</Th> : null}
                            {isSide ? <Th>Side</Th> : null}
                            {isQuantity ? <Th>Quantity</Th> : null}
                            {isPrice ? <Th>Price</Th> : null}
                            {isCommission ? <Th>Commission</Th> : null}
                            {isGas ? <Th>Gas Fees</Th> : null}
                            {isProfit ? <Th onClick={handleCurrency}><Tooltip label="Click to Swap Currencies" bg="white" borderRadius="8"><Box>Profit {currency}</Box></Tooltip></Th> : null}
                        </Tr>
                    </Thead>
                    <Tbody>

                        {pageData.map((trade) => {
                            return (
                                <Tr _hover={{ bg: "gray.100" }}>
                                    {isStatus ? <Td color={trade.status ? "green" : "red"}>{trade.status ? "Success" : "Failure"}</Td> : null}
                                    {isOrderId ? <Td><Skeleton isLoaded={isLoaded}>
                                        {orderIdFilter && trade.additionalInfos != null ?
                                            <Tooltip label={
                                                <VStack>
                                                    <Box>Total Number of Trades : {trade.additionalInfos.tradeCount}</Box>
                                                    <Box>First Trade Time : {timeConverter(trade.additionalInfos.firstTradeTime)}</Box>
                                                    <Box>Last Trade Time : {timeConverter(trade.additionalInfos.lastTradeTime)}</Box>
                                                </VStack>
                                            } bg='white' borderRadius="8">
                                                <Box>{trade.orderId}</Box></Tooltip> : <Box> {trade.orderId}</Box>}
                                    </Skeleton></Td> : null}
                                    {isTradeId ? <Td><Skeleton isLoaded={isLoaded}>{trade.tradeId}</Skeleton></Td> : null}
                                    {isTime ? <Td><Skeleton isLoaded={isLoaded}>{timeConverter(trade.eventTime)}</Skeleton></Td> : null}
                                    {isPair ? <Td><Skeleton isLoaded={isLoaded}>{trade.symbol}</Skeleton></Td> : null}
                                    {isSide ? <Td color={trade.side === "BUY" ? "green" : "red"}><Skeleton isLoaded={isLoaded}>{trade.side}</Skeleton></Td> : null}
                                    {isQuantity ? <Td><Skeleton isLoaded={isLoaded}>{Number(trade.lastTradeQuantity).toFixed(0) + " SLP"}</Skeleton></Td> : null}
                                    {isPrice ? <Td><Skeleton isLoaded={isLoaded}>{trade.price}</Skeleton></Td> : null}
                                    {isCommission ? <Td><Skeleton isLoaded={isLoaded}>{`${Number(trade.commission).toFixed(6)} (${trade.commissionAsset})`}</Skeleton></Td> : null}
                                    {isGas ? <Td><Skeleton isLoaded={isLoaded}>{orderIdFilter ? Number(trade.gasUsed).toFixed(4) : (Number(trade.gasUsed) * Number(trade.effectiveGasPrice) / (10 ** 18)).toFixed(4)} {"(RON)"}</Skeleton></Td> : null}
                                    {isProfit ? <Td><Skeleton isLoaded={isLoaded}>{currency === "(ETH)-USD" ? `${Number(trade.profit || 0).toFixed(6)} ETH` : `${((trade.profit || 0) * ethereumPrice).toFixed(2)} USD`}</Skeleton></Td> : null}
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
                        (page + 1 === Math.ceil(trades.length / pageSize) &&
                            Math.ceil(trades.length / pageSize) >= 1) || Math.ceil(trades.length / pageSize)==0
                            ? true
                            : false
                    }
                >
                    <ArrowRightIcon color="#277BC0" />
                </Button>
            </HStack>
        </Stack>
    )
}