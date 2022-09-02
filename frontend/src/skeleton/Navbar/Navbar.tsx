import { Center, Stack,Spacer,Box, Circle } from "@chakra-ui/react"
import NavButtons from "./buttons"
import Menus from "./menuItems/menu"






export default function Navbar() {

 
  return (
    <Box w='100%' h='80px' bg='#FFB200'>
    <Center>
      <Stack spacing={4} direction='row' align='center'>
        <NavButtons />
      </Stack>
      <Spacer />
      <Menus/>
    </Center>
    </Box>
  )
}

//