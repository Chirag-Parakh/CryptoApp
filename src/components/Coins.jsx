import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from "../index"
import { Container, HStack, Button, Text ,  Select} from '@chakra-ui/react';
import Loader from './Loader';
import Errorcomponent from './Errorcomponent';
import Coincard from './Coincard';


const Coins = () => {

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");
  const currencysymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
  const btns = new Array(132).fill(1)

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  }

  useEffect(() => {
    const fetcoins = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetcoins();
  }, [currency, page])

  if (error) return <Errorcomponent meassage={"Error fetching the coins"}/>

  return (
    <Container maxW={"100%"}>
      {
        loading ? <Loader /> : (
          <>
          <HStack m={"1"} width="100%">
            <Text> Select the currency :</Text>
          <Select value={currency} onChange={(e) => setCurrency(e.target.value)} width={"21"} margin={"2"} padding={"-1"}>
            <option value="inr">INR</option>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
          </Select>
          </HStack>
            <HStack 
            flexWrap={"wrap"}
            justifyContent={"space-evenly"}
            >
              {coins.map((i) => (
                <Coincard
                  id={i.id}
                  key={i.market_cap_rank}
                  name={i.name}
                  img={i.image}
                  symbol={i.symbol}
                  price={i.current_price}
                  currencysymbol={currencysymbol}
                />
              ))}
            </HStack>
            <HStack
            w={"80%"}
            overflowX={"auto"}
            m={"auto"}
            padding="5"
            
          >
              {
                btns.map((items , index) => (
                  <Button
                   bgColor={"blackAlpha.900"} 
                   color={"white"}
                   onClick={() => changePage(index)}
                    >
                      {index+1}
                  </Button>
                ))
              }
            </HStack>
          </>
        )
      }
    </Container>
  )
}

export default Coins
