
import TradeTable from "./Trades";
import TradeConfig from "./tradeConfig";
import {Flex,HStack} from "@chakra-ui/react";




function ListOfTrades() {
  

  return (
    <Flex
      minHeight="100vh"
      width={"100%"}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <HStack width={"100%"}>
        <TradeTable/>
        <TradeConfig/>
      </HStack>
    </Flex>
  );
}

export default ListOfTrades;
