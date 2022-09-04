import { HStack, Input, Text } from '@chakra-ui/react'
import { useState, useEffect } from 'react'



export default function DateInput(props: { start: string, end: string }) {

    const { start, end } = props;
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(0)
    const [color, setColor] = useState('black')

    const handleNumbers = (number: string) => {
        number = number.startsWith("0") ? number.slice(1, 1) : number.slice(0, 1)
        console.log(number)
        return Number(number);
    }

    const handleChangeMin = (event: any) => {
        const value = event.target.value
        /*  if (value.length == 5) {
             if (handleNumbers(value.slice(0, 1)) > 0 && handleNumbers(value.slice(0, 1)) <= 31 && handleNumbers(value.slice(3, 4)) > 0 && handleNumbers(value.slice(3, 4)) <= 12) {
                 console.log("color+min")
                 setMin(value)
                 setColor('black')
                 console.log(color + min)
             } else {
                 setColor('red')
             }
         } else {
             setColor('red')
         } */
        const valueAsArray = value.split('-');
        console.log(valueAsArray)

        if (valueAsArray.length == 3 && valueAsArray.every((item: any) => !isNaN(item))) {

            console.log("day : " + valueAsArray[0]);
            console.log("month : " + valueAsArray[1]);
            console.log("year : " + valueAsArray[2]);

        }

    }

    const handleChangeMax = (event: any) => {
        const value = event.target.value

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