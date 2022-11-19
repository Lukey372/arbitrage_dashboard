import {
    Drawer, DrawerBody, DrawerFooter, DrawerOverlay,
    DrawerContent, DrawerCloseButton, useDisclosure, Button} from '@chakra-ui/react'
import React from 'react'
import { HamburgerIcon } from "@chakra-ui/icons"
import MenuLogo from './logo'
import ButtonStack from './buttonStack'



function Drawerex() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    return (
        <>
            <Button ref={btnRef} bg="#277BC0" color="white" size={{base:"sm",sm:"md",md:"lg"}}  marginRight="4" marginTop="4" marginLeft="4" _hover={{ bg: "#014882" }} onClick={onOpen}>
                <HamburgerIcon w="8" h="8" />
            </Button>
            <Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef} >
                <DrawerOverlay />
                <DrawerContent bg="#FFF4CF">
                    <DrawerCloseButton marginTop="2" color="#277BC0" />
                    <DrawerBody>
                        <ButtonStack />
                    </DrawerBody>

                    <DrawerFooter >
                        <MenuLogo />
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}


export default function Menus() {
    return (
        <>
            <Drawerex />
        </>
    )
}