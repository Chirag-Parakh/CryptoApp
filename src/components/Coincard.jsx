import React from 'react'
import { VStack , Image , Text, Heading } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Coincard = ({id , name , img , price , symbol , currencysymbol}) => (

<Link to={`/coin/${id}`}>

<VStack  w="52" marginY={"5"} shadow={"lg"} p={["4" , "9"]} borderRadius={"lg"} transition={"all 0.3s"} 
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
         <Heading size={"md"} noOfLines={"1"}>{symbol}</Heading>
        <Text textAlign={"center"}>{name}</Text>
        <Text>{price? `${currencysymbol}${price}` : `NA`}</Text>
    </VStack>
</Link>
    )
    

export default Coincard
