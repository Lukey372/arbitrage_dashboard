import { HStack, Input, Text, Button } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import isDate from 'date-fns/isDate'




export default function DateInput(props: { apiRequest: string, setApiRequest: any, setPage: any }) {

    const { apiRequest, setApiRequest, setPage } = props;
    const [min, setMin] = useState([])
    const [max, setMax] = useState([])
    const [send, setSend] = useState(false)
    const [inputValueMin, setInputValueMin] = useState('')
    const [inputValueMax, setInputValueMax] = useState('')

    const handleChangeMin = (event: any) => {
        const value = event.target.value
        const valueAsArray = value.split('-');
        setInputValueMin(event.target.value)
        if (valueAsArray.length == 3 && valueAsArray.every((item: any) => !isNaN(item)) && valueAsArray.every((item: any) => item > 0)) {
            setMin(valueAsArray)

        }

    }

    const handleChangeMax = (event: any) => {
        const value = event.target.value
        const valueAsArray = value.split('-');
        setInputValueMax(event.target.value)

        if (valueAsArray.length == 3 && valueAsArray.every((item: any) => !isNaN(item)) && valueAsArray.every((item: any) => item > 0)) {
            setMax(valueAsArray)
        }

    }

    useEffect(() => {
        let fromTime = `${min[0]},${min[1]},${min[2]}`
        let toTime = `${max[0]}-${max[1]}-${max[2]}`
        if (isDate(new Date(fromTime)) && isDate(new Date(toTime)) && new Date(toTime) >= new Date(fromTime) && send) {
            let fromTime = `${min[0]}-${min[1]}-${min[2]}`
            let toTime = `${max[0]}-${max[1]}-${max[2]}`
            let response = (`http://127.0.0.1:5000/api/trades?period=${fromTime},${toTime}`)
            setInputValueMin('')
            setInputValueMax('')
            setPage(0)
            setApiRequest(response)
            setSend(false)
        }
    }, [send])

    return (
        <HStack maxW='36%'>
            <Text minWidth={"fit-content"} color="white"> Input date from </Text>
            <Input value={inputValueMin} maxW='125' bg='white' placeholder='yyyy-mm-dd' onChange={handleChangeMin} />
            <Text color="white"> To </Text>
            <Input value={inputValueMax} maxW='125' bg='white' placeholder='yyyy-mm-dd' onChange={handleChangeMax} />
            <Button onReset={() => ''} minW='55' onClick={() => { setSend(true) }}>Submit</Button>
        </HStack>
    )
}