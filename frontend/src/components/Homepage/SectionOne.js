import { Flex, Container, Heading, Stack, Text, Button } from '@chakra-ui/react';
import Illustration from './Illustration';
import AlertMsg from './gettingStarted';
import { ethers } from "ethers";
import Cookies from 'universal-cookie';

const cookies = new Cookies();



async function requestAccount() {

  if (window.ethereum) {

    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

    return Array.isArray(accounts) ? accounts[0] : null;

  } else {
    console.log('MetaMask not detected')
  };

}

  async function request(url, options = null) {
    const response = await fetch(url, options);
    const json = await response.json();
    return json;
  }


  const login = async () => {

    let account = await requestAccount();

    if (!account) return console.log("An error has occured !");


    const { random } = await request('http://127.0.0.1:5000/auth/random');

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    let signature = await signer.signMessage(random);

    const body = { signature, random, address: account }

    const { token } = await request('http://127.0.0.1:5000/auth/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    console.log(token);
    cookies.set("authorization", token);


  }

export default function GettingStarted() {


  return (

    <Container maxW={'5xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}>
        <Heading
          fontWeight={1000}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
          color={'#003057'}>
          Arbitrage Bot{' '}
          <Text as={'span'} color={'#FFB200'}>
            Plateform
          </Text>
        </Heading>
        <Text color={'white'} maxW={'3xl'} fontWeight="bold">
          You will be able to track successfully your gains and losses
          with this intuitive plateform equiped with most sophisticeted
          statistics to help you manage your portfolio
        </Text>
        <Stack spacing={6} direction={'row'}>
          <AlertMsg />
          <Button rounded={'full'} px={6} onClick={login}>
            Connect Wallet
          </Button>
        </Stack>
        <Flex w={'full'}>
          <Illustration
            height={{ sm: '23rem', lg: '26rem' }}
            mt={{ base: 20, sm: 2 }}
          />
        </Flex>
      </Stack>
    </Container>
  );
  }
