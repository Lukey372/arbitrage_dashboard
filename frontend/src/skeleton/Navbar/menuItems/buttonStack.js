
import { Stack, Box } from '@chakra-ui/react'







export default function ButtonStack() {
    return (
        <Stack marginTop='6' >
                <Box bgGradient='linear(to-l, #FFF4CF, #FFCB42,#FFF4CF)' _hover={{ bg: "#f7cf65" }} as='button' borderRadius='md' w="100%" h="12" marginTop='10' fontSize="2xl" fontWeight="bold" color="#277BC0" >Home</Box>
                <Box bgGradient='linear(to-l, #FFF4CF, #FFCB42,#FFF4CF)' _hover={{ bg: "#f7cf65" }} as='button' borderRadius='md' w="100%" h="12" fontSize="2xl" fontWeight="bold" color="#277BC0">Blog</Box>
                <Box bgGradient='linear(to-l, #FFF4CF, #FFCB42,#FFF4CF)' _hover={{ bg: "#f7cf65" }} as='button' borderRadius='md' w="100%" h="12" fontSize="2xl" fontWeight="bold" color="#277BC0">About</Box>
        </Stack>
    )
}

