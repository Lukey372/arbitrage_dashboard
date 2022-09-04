import React, { useEffect, useState } from 'react';
import Table from './components/Table/index';
import Calculator from './components/Calculator';
import Layout from './skeleton/Layout';
import {Button} from '@chakra-ui/react';
import Home from './components/Homepage/Home';

interface Trade {
  tradeId: string
  side: string
  symbol: string
  eventTime: string
  lastTradeQuantity: number
  price: string
  commission: string
  commissionAsset: string
  effectiveGasPrice: string
  gasUsed: string
  amountIn: string
  amountOut: string
  profit: string
}

function App() {
  const [page, setPage] = useState('calculator')
  function pageSwitch() {
    page == "calculator" ? setPage('page') : setPage('calculator')
}
  
  return (
<Layout>
      {page == "calculator" ? <Home /> :
    <Table/>
      }
      <Button onClick={pageSwitch}>{page == "calculator" ? "Page" : "Calculator"}</Button>

      </Layout>

  );
}

export default App;

