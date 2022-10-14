import DataChart from "./chart";
import { HStack, Box, VStack } from "@chakra-ui/react";






export default function TradeConfig(props: {
    trades: any[];
    setTrades: any;
    timeConverter: any
}) {
    const { trades, setTrades, timeConverter } = props;
    return (
        <VStack w={"100%"} >
            <HStack maxH={"400px"} w={"100%"}>
                <Box bg="white" borderRadius={"10px"} minW="60%" maxW="60%" minH={"400px"} maxH={"400px"}><DataChart {...{ trades, setTrades,timeConverter }} /></Box>
                <Box bg="white" borderRadius={"10px"} minW="38%" maxW="38%" minH={"400px"} maxH={"400px"}    ><DataChart {...{ trades, setTrades,timeConverter }} /></Box>
            </HStack>
            <Box bg="white" minW="99%" maxW="99%" minH={"170px"} maxH={"170px"} borderRadius={"10px"} alignSelf="start"  ><DataChart{...{ trades, setTrades,timeConverter }} /></Box>
        </VStack>
    )

}

