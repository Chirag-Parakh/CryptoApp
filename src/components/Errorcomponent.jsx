import { Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'

const Errorcomponent = ({props}) => {
  return (
    <Alert
    status='error'
    width={"xl"}
    bottom={"4"}
    left={"50%"}
    transform={"translateX(-50%)"}
    position={"fixed"}
    >
      <AlertIcon/>
    {props.message}
    </Alert>
  )
}

export default Errorcomponent
