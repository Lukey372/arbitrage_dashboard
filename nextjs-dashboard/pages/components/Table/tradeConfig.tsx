import DataChart from "./chart";
import { HStack, Box, VStack,Flex,Spacer } from "@chakra-ui/react";
import TradeParams from "./tradeParams";
import { extendTheme } from '@chakra-ui/react'
const numeral = require('numeral');

const breakpoints = {
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
}
const theme = extendTheme({ breakpoints })


export default function TradeConfig(props: {
    trades: any[];
    setTrades: any;
    timeConverter: any;
    volume: any;
    setVolume: any;
    totalGasFee: any;
    setTotalGasFee: any;
    ethereumPrice: any;
    setEthereumPrice: any;
    sum: any;
    slpPrice: any;
    ronPrice: any;
}) {
    const { trades, setTrades, timeConverter, volume, totalGasFee, ethereumPrice, sum, slpPrice, ronPrice } = props;
    return (
        <VStack w={"100%"} padding="1rem" paddingTop={{ lg: "12%", xl: "5%", "2xl": "3%" }}>
            <HStack maxH={"400px"} w={"100%"}>
                <Box bg="white" borderRadius={"10px"} minW="60%" maxW="60%" minH={"400px"} maxH={"400px"}><DataChart {...{ trades, setTrades,timeConverter,ethereumPrice }} /></Box>
                <Box bg="white" borderRadius={"10px"} minW="39%" maxW="39%" minH={"400px"} maxH={"400px"}><TradeParams /></Box>
            </HStack>
            <Flex bg="white" minW="100%" maxW="100%" minH={"170px"} maxH={"170px"} borderRadius={"10px"} alignSelf="start">
                <VStack justifyContent={"center"} align="flex-start" marginLeft={5}>
                    <Box fontWeight= "500" _hover={{ color: "grey" }}>Volume  : {numeral(volume).format('0,0')} SLP</Box>
                    <Box fontWeight= "500"_hover={{ color: "grey" }}>Gas Fee : {numeral(totalGasFee.toFixed(2)).format('0,0.000')} RON</Box>
                    <Box fontWeight= "500"_hover={{ color: "grey" }}>Profit  : {numeral(sum.toFixed(6)).format('0,0.0000')} ETH</Box>
                </VStack>
                <Spacer/>
                <VStack justifyContent={"center"} align="flex-start" >
                    <Box fontWeight= "500"_hover={{ color: "grey" }}>Slp price : {numeral(slpPrice.toFixed(6)).format('0,0.00000')} USD</Box>
                    <Box fontWeight= "500"_hover={{ color: "grey" }}>Ron price : {numeral(ronPrice).format('0,0.0000')} USD</Box>
                    <Box fontWeight= "500"_hover={{ color: "grey" }}>Eth price : {numeral(ethereumPrice).format('0,0.00')} USD</Box>
                </VStack>
                <Spacer/>
                <VStack justifyContent={"center"} align="flex-start" marginRight={5}>
                    <Box fontWeight= "500"_hover={{ color: "grey" }}>Volume : {numeral((volume*slpPrice).toFixed(2)).format('0,0.00')} USD</Box>
                    <Box fontWeight= "500"_hover={{ color: "grey" }}>Gas Fee : {numeral((totalGasFee*ronPrice).toFixed(2)).format('0,0.00')} USD</Box>
                    <Box fontWeight= "500"_hover={{ color: "grey" }}>Profit : {numeral((sum*ethereumPrice).toFixed(2)).format('0,0.00')} USD</Box>
                </VStack>
            </Flex>
        </VStack>
    )

}

