import DataChart from "./chart";
import { HStack, Box, VStack } from "@chakra-ui/react";
import TradeParams from "./tradeParams";
import { extendTheme } from '@chakra-ui/react'

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
    timeConverter: any
}) {
    const { trades, setTrades, timeConverter } = props;
    return (
        <VStack w={"100%"} padding="1rem" paddingTop={{lg:"12%" , xl:"5%","2xl":"3%"}}>
            <HStack maxH={"400px"} w={"100%"}>
                <Box bg="white" borderRadius={"10px"} minW="60%" maxW="60%" minH={"400px"} maxH={"400px"}><DataChart {...{ trades, setTrades,timeConverter }} /></Box>
                <Box bg="white" borderRadius={"10px"} minW="39%" maxW="39%" minH={"400px"} maxH={"400px"}><TradeParams/></Box>
            </HStack>
            <Box bg="white" minW="100%" maxW="100%" minH={"170px"} maxH={"170px"} borderRadius={"10px"} alignSelf="start"  ></Box>
        </VStack>
    )

}

