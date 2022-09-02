import React from 'react'
import TableBody from './TableBody';
import TableCell from './TableCell';
import TableHead from './TableHead';
import TableRow from './TableRow';
import { useEffect, useState } from 'react';
import {
    Stack,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Center,
} from '@chakra-ui/react'

interface Trade {
    tradeId: string
    side: string
    symbol: string
    eventTime: string
    lastTradeQuantity: number
    price: string
    commission: string
    commissionAsset: string
    effectiveGasPrice: string
    gasUsed: string
    amountIn: string
    amountOut: string
    profit: string
    orderId: string
}

function ListOfTrades() {

    const [trades, setTrades] = useState<Trade[]>([]);

    useEffect(() => {

        (async () => {

            var response = await fetch("http://127.0.0.1:5000/api/trades");

            var responseJson = await response.json();

            console.log(responseJson.trades);

            setTrades([...responseJson.trades])

        })()

    }, [])


    return (
        <Center w='100%' h="100vh" >
            <TableContainer bg='white' opacity='0.9' borderRadius='2%'>
                <Table>
                    <Thead bg="gray.200" _hover={{ bg: "gray.300" }}>
                        <Tr><Th>
                            Order Id
                        </Th>
                            <Th>
                                Trade Id
                            </Th>
                            <Th>
                                Pair
                            </Th>
                            <Th>
                                Side
                            </Th>
                            <Th>
                                Last Trade Quantity
                            </Th>
                            <Th>
                                Price
                            </Th>
                            <Th>
                                Commission
                            </Th>
                            <Th>
                                Profit
                            </Th>
                        </Tr>
                    </Thead >
                    <Tbody>
                        {trades.slice(0, 20).map(trade => {

                            return (
                                <Tr _hover={{ bg: "gray.100" }}>
                                    <Td >
                                        {trade.orderId}
                                    </Td>
                                    <Td >
                                        {trade.tradeId}
                                    </Td>
                                    <Td>
                                        {trade.symbol}
                                    </Td>
                                    <Td>
                                        {trade.side}
                                    </Td>
                                    <Td>
                                        {Number(trade.lastTradeQuantity).toFixed(0) + " SLP"}
                                    </Td>
                                    <Td>
                                        {trade.price}
                                    </Td>
                                    <Td>
                                        {`${trade.commission} (${trade.commissionAsset})`}
                                    </Td>
                                    <Td>
                                        {trade.profit}
                                    </Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
        </Center>
    )
}

export default ListOfTrades

export { TableBody, TableCell, TableHead, TableRow };

let capitalDistribution = [
    {
        minROI: 0.01,
        maxOrderQuantity: 50000,
    },
    {
        minROI: 0.1,
        maxOrderQuantity: 30000,
    },
    {
        minROI: 0.3,
        maxOrderQuantity: 20000,
    }
]