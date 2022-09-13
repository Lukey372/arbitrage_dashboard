import { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button, HStack, Input, Flex, VStack, Box, Grid, GridItem, Checkbox, CheckboxGroup, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { isAfter, lightFormat } from "date-fns";
import DateInput from "./dateInput";

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

const roninExplorerUrl = `https://explorer.roninchain.com/`;

const coingeckoApiUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum&order=market_cap_desc&per_page=100&page=1&sparkline=false";

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




export default function TradeTable() {
    const pageSize = 10;

    const [page, setPage] = useState(0);

    const [sum, setSum] = useState(0);

    const [ethereumPrice, setEthereumPrice] = useState(0);

    const [trades, setTrades] = useState<Trade[]>([]);

    const [pageData, setPageData] = useState<Trade[]>([]);

    const [currency, setCurrency] = useState("(USD)-ETH");

    const [dateFrom, setDateFrom] = useState(lightFormat(new Date(), "yyyy-MM-dd"));

    const [dateTo, setDateTo] = useState(lightFormat(new Date(), "yyyy-MM-dd"));

    const [isStatus, setIsStatus] = useState(false);
    const [isOrderId, setIsOrderId] = useState(false);
    const [isTradeId, setIsTradeId] = useState(false);
    const [isTime, setIsTime] = useState(true);
    const [isPair, setIsPair] = useState(true);
    const [isSide, setIsSide] = useState(true);
    const [isQuantity, setIsQuantity] = useState(true);
    const [isPrice, setIsPrice] = useState(true);
    const [isCommission, setIsCommission] = useState(true);
    const [isProfit, setIsProfit] = useState(true);

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
        getTrades(dateFrom, dateTo).then((data) => {
            setTrades(data);
        });
    }, [dateFrom, dateTo]);


    useEffect(() => {
        trades.forEach(item => { setSum(item.sum) });

    }, [trades]);


    function handleCurrency() { setCurrency(currency === "(ETH)-USD" ? "(USD)-ETH" : "(ETH)-USD"); }
    

    function CheckBOX() {
        return (
            <Menu closeOnSelect={false}>
                <MenuButton marginLeft={20} as={Button} rightIcon={<ChevronDownIcon />}>
                    Filter
                </MenuButton>
                <MenuList>
                    <MenuItem><Checkbox isChecked={isStatus?true:false} onChange={()=>{setIsStatus(!isStatus)}}>Status</Checkbox></MenuItem>
                    <MenuItem><Checkbox isChecked={isOrderId?true:false}onChange={()=>{setIsOrderId(!isOrderId)}}>Order Id</Checkbox></MenuItem>
                    <MenuItem><Checkbox isChecked={isTradeId?true:false}onChange={()=>{setIsTradeId(!isTradeId)}}>Trade Id</Checkbox></MenuItem>
                    <MenuItem><Checkbox isChecked={isTime?true:false}onChange={()=>{setIsTime(!isTime)}} >Time</Checkbox></MenuItem>
                    <MenuItem><Checkbox isChecked={isPair?true:false}onChange={()=>{setIsPair(!isPair)}} >Pair</Checkbox></MenuItem>
                    <MenuItem><Checkbox isChecked={isSide?true:false}onChange={()=>{setIsSide(!isSide)}} >Side</Checkbox></MenuItem>
                    <MenuItem><Checkbox isChecked={isQuantity?true:false}onChange={()=>{setIsQuantity(!isQuantity)}} >Quantity</Checkbox></MenuItem>
                    <MenuItem><Checkbox isChecked={isPrice?true:false}onChange={()=>{setIsPrice(!isPrice)}} >Price</Checkbox></MenuItem>
                    <MenuItem><Checkbox isChecked={isCommission?true:false}onChange={()=>{setIsCommission(!isCommission)}} >Commission</Checkbox></MenuItem>
                    <MenuItem><Checkbox isChecked={isProfit?true:false}onChange={()=>{setIsProfit(!isProfit)}} >Profit</Checkbox></MenuItem>
                </MenuList>
            </Menu>
        )
    }

    return (

        <VStack minW="50%" maxW="50%" height={"100%"} alignSelf="start" alignItems="start" margin={"1rem"}>
            <Grid templateColumns='repeat(3, 1fr)' gap={6} >
                <GridItem  ><DateInput {...{ dateFrom, setDateFrom, dateTo, setDateTo }} /></GridItem>
                <GridItem >
                    <Box
                        color='white'
                        overflow="hidden"
                        whiteSpace="nowrap"
                        justifyContent="center"
                        alignItems="center"
                        padding="10px">
                        The total gain on the selected period is : {(sum * ethereumPrice).toFixed(2)} USD
                    </Box>
                </GridItem>
                <GridItem >
                    
                    <CheckBOX />
                </GridItem>
            </Grid>
            <TableContainer bg="white" opacity="0.9" borderRadius="10px" minW="100%" minH="575px" >
                <Table>
                    <Thead bg="gray.200" _hover={{ bg: "gray.300" }}>
                        <Tr>
                            {isStatus ? <Th>Status</Th> : null}
                            {isOrderId ? <Th>Order Id</Th> : null}
                            {isTradeId ? <Th>Trade Id</Th> : null}
                            {isTime ? <Th>Time</Th> : null}
                            {isPair ? <Th>Pair</Th> : null}
                            {isSide ? <Th>Side</Th> : null}
                            {isQuantity ? <Th>Quantity</Th> : null}
                            {isPrice ? <Th>Price</Th> : null}
                            {isCommission ? <Th>Commission</Th> : null}
                            {isProfit ? <Th onClick={handleCurrency}>Profit {currency}</Th> : null}
                        </Tr>
                    </Thead>
                    <Tbody>

                        {pageData.map((trade) => {

                            return (
                                <Tr _hover={{ bg: "gray.100" }}>
                                    {isStatus ? <Td color={trade.status ? "green" : "red"}>{trade.status ? "Success" : "Failure"}</Td> : null}
                                    {isOrderId ? <Td>{trade.orderId}</Td> : null}
                                    {isTradeId ? <Td>{trade.tradeId}</Td> : null}
                                    {isTime ? <Td>{timeConverter(trade.eventTime)}</Td> : null}
                                    {isPair ? <Td>{trade.symbol}</Td> : null}
                                    {isSide ? <Td color={trade.side === "BUY" ? "green" : "red"}>{trade.side}</Td> : null}
                                    {isQuantity ? <Td>{Number(trade.lastTradeQuantity).toFixed(0) + " SLP"}</Td> : null}
                                    {isPrice ? <Td>{trade.price}</Td> : null}
                                    {isCommission ? <Td>{`${trade.commission} (${trade.commissionAsset})`}</Td> : null}
                                    {isProfit ? <Td>{currency === "(ETH)-USD" ? `${Number(trade.profit || 0).toFixed(6)} ETH` : `${((trade.profit || 0) * ethereumPrice).toFixed(2)} USD`}</Td> : null}
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
    )
}