
import { Button } from '@chakra-ui/react'


export default function AlertMsg() {


    function redirect(){
    }
    return (
            <Button
                rounded={'full'}
                px={6}
                colorScheme={'orange'}
                bg={'#FFB200'}
                _hover={{ bg: 'orange.400' }}
                onClick={redirect}>
                Get started
            </Button>  

    )
}