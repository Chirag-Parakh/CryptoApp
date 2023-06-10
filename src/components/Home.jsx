import { HStack, VStack , Image , Text} from '@chakra-ui/react'
import React from 'react'
import img1 from '../images/1.jpg'



const Home = () => {
  return (
   <>
   <VStack>
    
   </VStack>
   <HStack
   bgColor={"black"}
   width="100vw"
   height="100vh"
   >
    <VStack
    width={"50vw"}
    height={"full"}
    >
      <Image 
      src={img1}
      width={"60%"}
      marginTop={"20%"}
      borderRadius={"1rem"}
      />
      <Text
      color={"whiteAlpha.700"}
      width={"full"}
      textAlign={"center"}
      padding={"2"}
      fontSize={"2rem"}
      fontFamily="monospace"
      >
        CRYPTO X
      </Text>
    </VStack>

    <VStack>

    </VStack>
   </HStack>
   </>
  )
}

export default Home
