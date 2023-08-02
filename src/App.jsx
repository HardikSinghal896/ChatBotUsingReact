import { Box, Button, Container, HStack, Input, VStack } from "@chakra-ui/react"
// import {Message} from "./Components/Message";
import Message from "./Components/Message.jsx"
import { signOut, onAuthStateChanged, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { app } from "./firebase"
import { useEffect, useRef, useState } from "react";
import { query, orderBy, getFirestore, addDoc, collection, serverTimestamp, onSnapshot } from "firebase/firestore"

const auth = getAuth(app);
const db = getFirestore(app);

const loginHandler = () => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
}

const logoutHandler = () => {
  signOut(auth);
}

function App() {
  const [user, setUser] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const divforScroll = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("fsdsadf");
    try {
      setMessage("");
      await addDoc(collection(db, "Messages"), {
        text: message,
        uid: user.uid,
        uri: user.photoURL,
        createdAt: serverTimestamp(),
      });
      divforScroll.current.scrollIntoView({ behavior: "smooth" });

    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    const q = query(collection(db, "Messages"), orderBy("createdAt", "asc"));
    const unsubscribe = onAuthStateChanged(auth, (data) => {
      // console.log(data);
      setUser(data);
    })
    const unsubscribeForMessage = onSnapshot(q, (snap) => {
      setMessages(
        snap.docs.map((item) => {
          const id = item.id;
          return { id, ...item.data() };
        })
      );
    });
    return () => {
      unsubscribe();
      unsubscribeForMessage();
    };
  }, []);

  return (
    <Box bg={"red.50"}>
      {user ? (<Container h={"100vh"} bg={"white"}>
        <VStack h="full" >
          <Button colorScheme={"red"} w={"full"} onClick={logoutHandler} >Logout</Button>
          <VStack h={"100vh"} w={"full"} overflowY="auto">
            {
              messages.map((item, key) => {
                return <Message key={item.id} user={item.uid === user.uid ? "me" : "other"} text={item.text} uri={item.uri} />
              })
            }

            <div ref={divforScroll}></div>
          </VStack >
          <form onSubmit={submitHandler} style={{ width: "100%" }}>
            <HStack padding={"2"}>
              <Input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
              <Button bg={"purple.100"} type={"submit"}>Send</Button>
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
