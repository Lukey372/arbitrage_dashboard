import { ButtonGroup, Button, Link } from "@chakra-ui/react"
import { StarIcon, LinkIcon, PhoneIcon } from "@chakra-ui/icons"






export default function NavButtons() {
    return (
        <ButtonGroup marginTop="4" marginLeft="2" color='white' size={{base:"sm",sm:"md",md:"lg"}}  >
            <Link href="/" _hover={{ textDecoration: 'none' }}>
                <Button _hover={{ bg: "#014882" }} bg="#277BC0" marginLeft='2' rightIcon={<StarIcon />}>Home</Button>
            </Link>
            <Link href="/blog" _hover={{ textDecoration: 'none' }}>
                <Button _hover={{ bg: "#014882" }} bg="#277BC0" rightIcon={<LinkIcon />}>Blog</Button>
            </Link>
            <Link href="/about" _hover={{ textDecoration: 'none' }}>
                <Button _hover={{ bg: "#014882" }} bg="#277BC0" rightIcon={<PhoneIcon />}>About</Button>
            </Link>
        </ButtonGroup>
    )
}

