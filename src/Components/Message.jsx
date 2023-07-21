import { Avatar, HStack, Text } from '@chakra-ui/react'
import React from 'react'

const Message = ({ text, uri, user }) => {
    return (
        <HStack alignSelf={user === "other" ? "flex-start" : "flex-end"} borderRadius={"base"} padding={"4"} paddingY={"2"} bg={"gray.100"}>
            {
                user === "other" && < Avatar src={uri} />
            }
            <Text>{text}</Text>
            {
                user !== "other" && < Avatar src={uri} />
            }
        </HStack>
    )
}

export default Message