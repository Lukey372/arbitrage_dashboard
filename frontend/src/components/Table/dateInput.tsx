import { HStack, Input, Text } from '@chakra-ui/react'
import { useState, useEffect } from 'react'



export default function DateInput(props: { start: string, end: string }) {

    const { start, end } = props;
    const [min, setMin] = useState([])
    const [max, setMax] = useState(0)
    const [color, setColor] = useState('black')

    const handleChangeMin = (event: any) => {
        const value = event.target.value
        const valueAsArray = value.split('-');

        if (valueAsArray.length == 2 && valueAsArray.every((item: any) => !isNaN(item)) && valueAsArray.every((item: any) => item > 0)) {
            valueAsArray[0]<=31 && valueAsArray[1]<=12? setMin(valueAsArray):alert('Wrong date input (day-month)')
            console.log(min)
        }

    }

    const handleChangeMax = (event: any) => {
        const value = event.target.value
        const valueAsArray = value.split('-');

        if (valueAsArray.length == 2 && valueAsArray.every((item: any) => !isNaN(item)) && valueAsArray.every((item: any) => item > 0)) {
            setMax(valueAsArray)
        }

    }
    return (
        <HStack maxW='30%'>
            <Text minWidth={"fit-content"} color="white"> Input date from </Text>
            <Input color={color} maxW='75' bg='white' placeholder='01-01' onChange={handleChangeMin} />
            <Text color="white"> To </Text>
            <Input color={color} maxW='75' bg='white' placeholder='12-12' onChange={handleChangeMax} />
        </HStack>
    )
}