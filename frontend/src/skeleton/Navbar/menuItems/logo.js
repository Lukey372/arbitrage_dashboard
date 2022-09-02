

import { Circle, Container } from "@chakra-ui/react"
import { UpDownIcon } from "@chakra-ui/icons"


export default function MenuLogo() {
    return (
        <Container centerContent>
            <Circle w="20" h="20" bg='#FFCB42' _hover={{ bg: "#FFB200" }}><UpDownIcon w='8' h="8" color="#277BC0" /></Circle>
        </Container>
    )
}