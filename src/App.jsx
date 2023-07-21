import { Box, Button, Container, HStack, Input, VStack } from "@chakra-ui/react"
// import {Message} from "./Components/Message";
import Message from "./Components/Message.jsx"
import {onAuthStateChanged, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { app } from "./firebase"
import { useEffect, useState } from "react";
const auth = getAuth(app);

const loginHandler = () => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
}

function App() {
  const [user, setUser] = useState(false);
  <link rel="stylesheet" href="style.css" />
  // <script src=""></script>
  useEffect(()=>{
    onAuthStateChanged(auth,(data)=>{
      // console.log(data);
      setUser(data);
    })
  })

  return (
    <Box bg={"red.50"}>
      {user ? (<Container h={"100vh"} bg={"white"}>
        <VStack h="full" >
          <Button colorScheme={"red"} w={"full"} >Logout</Button>
          <VStack h={"100vh"} w={"full"} overflowY="auto">

            <Message user="other" text={"Sample Message"} />
            <Message user="other" text={"Sample Message"} />
            <Message user="other" text={"Sample Message"} />
            <Message user="other" text={"Sample Message"} />
            <Message user="other" text={"Sample Message"} />
            <Message user="other" text={"Sample Message"} />
            <Message user="other" text={"Sample Message"} />
          </VStack >
          <form action="" style={{ width: "100%" }}>
            <HStack padding={"2"}>
              <Input type="text" />
              <Button bg={"purple.100"}>Send</Button>
            </HStack>
          </form>
        </VStack>

      </Container>) : (
        <VStack h="100vh" justifyContent={"center"} bg={"white"}>
          <Button colorScheme={"purple"} onClick={loginHandler}>Sign with Google</Button>
        </VStack>
      )}
    </Box>
  );
}

export default App;
