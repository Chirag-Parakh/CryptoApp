import { Container, Box, HStack, Text, Select, VStack, Image, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Progress, GridItem , Button, Switch } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react'
import Loader from './Loader';
import axios from 'axios';
import { server } from '..';
import { useParams } from 'react-router-dom';
import Errorcomponent from './Errorcomponent';
import Chart from './Chart';

const CoinDetails = () => {

  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setchartArray] = useState([]);
  const currencysymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
const btns=["24h" , "7d" , "14d" , "30d" , "60d", "200d" , "365d" , "max"];
const switchChartStats=((key)=>{
  switch (key) {
    case "24h":
         setDays("24h");
         setLoading(true);
      break;
    case "7d":
         setDays("7d");
         setLoading(true);
      break;
    case "14d":
         setDays("14d");
         setLoading(true);
      break;
    case "30d":
         setDays("30d");
         setLoading(true);
      break;
    case "60d":
         setDays("60d");
         setLoading(true);
      break;
    case "200d":
         setDays("200d");
         setLoading(true);
      break;
    case "365d":
         setDays("365d");
         setLoading(true);
      break;
    case "max":
         setDays("max");
         setLoading(true);
      break;
  
    default:
         setDays("24h");
         setLoading(true);
      break;
  }
})

  const params = useParams()

  useEffect(() => {
    const fethcoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);


        const {data:chartData} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
        console.log(chartData);
       setchartArray(chartData.prices);
        setCoin(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fethcoin();
  }, [params.id , currency , days])

  if (error) return <Errorcomponent message={"Error fetching the coin details"} />

  return (
    <>
      {
        loading ? <Loader /> : (
          <Container
            m={"0"}
            padding={"10"}
            maxW="100%"
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Box width={"full"} borderWidth={1}>
             <Chart 
             arr={chartArray}
             currency={currencysymbol}
             days={days}/>
            </Box>

            <HStack p="4" overflowX={"auto"}>
              {
                btns.map((i) => (<Button key={i} onClick={()=>switchChartStats(i)}>{i}</Button>))
              }


            </HStack>


            <HStack m={"1"}>
              <Text> Select the currency :</Text>
              <Select value={currency} onChange={(e) => setCurrency(e.target.value)} width={"21"} margin={"2"} padding={"-1"}>
                <option value="inr">INR</option>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
              </Select>
            </HStack>

            <VStack
              spacing={"4"}
              p={["0" , "5"]}
              alignItems={"flex-start"}
              style={{ width: ["80%"] }}
            >
              <Text fontSize={"small"} alignSelf={"center"} opacity="0.7">
                Last update on {new Date(coin.market_data?.last_updated).toLocaleString()}
              </Text>
              <Image
                src={coin.image?.large}
                w={"16"}
                h={"16"}
              />
              <Stat>
                <StatLabel>{coin.name}</StatLabel>
                <StatNumber>{currencysymbol}{coin.market_data?.current_price[currency]}</StatNumber>
                <StatHelpText>
                  <StatArrow type={coin.market_data?.price_change_percentage_24h > 0 ? "increase" : "decrease"} />
                  {coin.market_data?.price_change_percentage_24h}%
                </StatHelpText>
              </Stat>
              <Badge fontSize={"2xl"} bgColor={"blackAlpha.900"} color={"white"}>{`#${coin.market_cap_rank}`}</Badge>

            <CustomBar 
            high={`${currencysymbol}${coin.market_data?.high_24h[currency]}`}
             low={`${currencysymbol}${coin.market_data?.low_24h[currency]}`} />

             <Box w="full" p="2">
                <Item title={"Max Supply"} value={coin.market_data?.max_supply}/>
                <Item title={"Circulating Supply"} value={coin.market_data?.circulating_supply}/>
                <Item title={"Market Cap"} value={`${currencysymbol}${coin.market_data?.market_cap[currency]}`}/>
                <Item title={"All time low"} value={`${currencysymbol}${coin.market_data?.atl[currency]}`}/>
                <Item title={"All time high"} value={`${currencysymbol}${coin.market_data?.ath[currency]}`}/>
             </Box>
            </VStack>
          </Container>
        )
      }

    </>
  )
}

const Item = ({title , value}) => (
  <HStack justifyContent={"space-between"} w="full" my={"4"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
      {title}
    </Text>
    <Text>
      {value}
    </Text>
  </HStack>
)

const CustomBar = ({high, low}) => (
<VStack w={"full"}>
  <Progress value={"50"} colorScheme={"teal"} w={"full"}/>
  <HStack justifyContent={"space-between"} w={"full"}>
     <Badge children={low} colorScheme={"red"}/>
<Text fontSize={"sm"}>24Hr Range</Text>
     <Badge children={high} colorScheme={"green"}/>
  </HStack>
</VStack>

)


export default CoinDetails
