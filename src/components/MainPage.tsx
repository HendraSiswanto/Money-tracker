import {
  Button,
  Text,
  Container,
  Flex,
  Image,
  List,
  ListItem,
  VStack,
} from "@chakra-ui/react";
import Logo from "../assets/Vector2.svg";
import Dompet from "../assets/Dompet.svg";
import { useState } from "react";


const MainPage = () => {

  const [transaction,setTransaction] = useState(false)
  return (
    <>
      <Flex
        gap={5}
        flexDirection="column"
        width="90px"
        alignItems="center"
        position="fixed"
        mt="20px"
      >
        <Image boxSize="28px" src={Logo} />
        <List paddingY="5px">
          <ListItem>
            <Button
              borderRadius={0}
              bgColor={transaction? "#947f7f4b" : "#1C4532"}
              height="80px"
              onClick={() => setTransaction(true)}
              _hover={{
                borderLeft: "4px",
                justifyContent: "center",
                bgColor: "#947f7f4b",
                width: "100px",
                borderRight: "4px",
                borderRightColor: "#947F7F",
              }}
            >
              <VStack>
                <Image src={Dompet} />
                <Text color="#a2acbaff" fontWeight="medium" fontSize="12px">
                  Transactions
                </Text>
              </VStack>
            </Button>
          </ListItem>
        </List>
      </Flex>
      <Container></Container>
    </>
  );
};

export default MainPage;
