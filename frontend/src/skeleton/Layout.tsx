import { VStack } from "@chakra-ui/react"
import Navbar from "./Navbar/Navbar"
import Footer from "./Footer/Footer"

type BoxProps = {
    children: React.ReactNode; // 👈️ type children
  };

export default function Layout(props:BoxProps) {
  
const children=props
    return (
            <VStack bg='#277BC0' h='100%' >
                <Navbar />

                {props.children }

                <Footer />
            </VStack>
    )
}




