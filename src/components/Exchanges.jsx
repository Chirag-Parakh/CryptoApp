import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {server} from "../index"
import { Container, Heading, HStack, Image,  Text, VStack } from '@chakra-ui/react';
import Loader from './Loader';
import Errorcomponent from './Errorcomponent';


const Exchanges = () => {

  const [exchanges , setExchanges] = useState([]);
  const [loading , setLoading] = useState(true);
  const [error , setError] = useState(false);

useEffect(() => {
  const fetchexchanges = async() => {
  try {
      const {data} = await axios.get(`${server}/exchanges`);
      setExchanges(data);
      setLoading(false);
  } catch (error) {
    setError(true);
    setLoading(false);
  }
  };
fetchexchanges();

}, [])

if(error) return <Errorcomponent/>

  return (
    <Container maxW={"container.xl"}>
{
  loading? <Loader /> : (
    <>
    <HStack 
    flexWrap={"wrap"}
    justifyContent={"center"}
    >
      {exchanges.map((i) => (
       <Exchangecard 
       name={i.name} 
       img={i.image} 
       rank={i.trust_score_rank} 
       url={i.url}
       key={i.id}
       country={i.country}
       />
      )) }
    </HStack>


    </>
  )
}

    </Container>
  )
}


const Exchangecard = ({name , img , rank , url , country}) => (
<a href={url} target={"_blank"} rel="noreferrer">

<VStack width={"52"} shadow={"lg"} p={"8"} borderRadius={"lg"} transition={"all 0.3s"} m={"4"}
css={{

  "&:hover":{
    transform:"scale(1.1)"
  }
}}
>
  <Image
   src={img}
    width={"10"} 
    h={"12"} 
    objectFit={"contain"}
    alt={"Exchanges"}
    />
    <Heading size={"md"} noOfLines={1}>{rank}</Heading>
    <Text>{name}</Text>
    <Text fontSize={"small"}>{country}</Text>
</VStack>

</a>

)




export default Exchanges
