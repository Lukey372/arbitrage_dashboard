import {
  Stack,
  Container,
  Box,
  Text,
  Heading,
  SimpleGrid
} from '@chakra-ui/react';
import {ReactNode} from 'react';

export default function Features() {
  return (
    <Box alignContent='flex-start' >
      
      <Container maxW={'6xl'}  >
        <Stack direction={{ base: 'column', lg: 'row' }}>
          <Stack
            flex={1}
            color={'black'}
            justify={{ lg: 'center' }}
            py={{ base: 4, md: 20, xl: 60 }}>
            <Box mb={{ base: 8, md: 20 }}>
              <Text
                fontFamily={'heading'}
                fontWeight={400}
                textTransform={'uppercase'}
                mb={20}
                fontSize={'4xl'}
                color={'white'}>
                Technology
              </Text>
              <Heading
                color={'#003057'}
                mb={5}
                fontWeight={800}
                fontSize={{ base: '3xl', md: '5xl' }}
                textAlign={'center'}>
                21st Century's Lastest Features
              </Heading>
              <Text fontSize={'xl'} color={'white'}fontWeight={600}textAlign={'center'}>
                The NewLife™ technology allows you to monitor your investment and get
                complete insights at real time. The proprietary
                software/hardware ecosystem prevents your portfolio from getting
                neglected.
              </Text>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={20}>
              {stats.map((stat) => (
                <Box key={stat.title}>
                  <Text
                    fontFamily={'heading'}
                    fontSize={'4xl'}
                    fontWeight={800}
                    color={'#FFB200'}
                    mb={3}>
                    {stat.title}
                  </Text>
                  <Text fontSize={'xl'} color={'white'}fontWeight={500}>
                    {stat.content}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
          
        </Stack>
      </Container>
    </Box>
  );
}
interface Props {
  children?: ReactNode
  // any props that come into the component
}

const StatsText = ({ children }:Props) => (
  <Text as={'span'}fontSize={'2xl'} fontWeight={900} color={'#003057'}>
    {children}
  </Text>
);

const stats = [
  {
    title: '10+',
    content: (
      <>
        <StatsText>Software modules</StatsText> for detailed monitoring and
        real-time analytics
      </>
    ),
  },
  {
    title: '24/7',
    content: (
      <>
        <StatsText>Analytics</StatsText> enabled right in your dashboard without
        history limitations
      </>
    ),
  },
  {
    title: '100%',
    content: (
      <>
        <StatsText>Accuracy</StatsText> in executing buy & sell orders before anyone else
      </>
    ),
  },
  {
    title: '300k+',
    content: (
      <>
        <StatsText>Trading Volume</StatsText> since the official launching of the arbitrage bot in the ronin blockchain
      </>
    ),
  },
];