import GettingStarted from "./SectionOne";
import Features from "./SectionTwo";
import { Divider, VStack } from "@chakra-ui/react";


export default function Home(){
  return(
    <VStack>
      
      <GettingStarted/>
      <Divider/>
      <Features/>
    </VStack>
  )
}