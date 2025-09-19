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
import Bayar from "../assets/Payments.svg"

interface Props{

}

import { useState } from "react";

const MainPage = () => {
  const [click, setClick] = useState(false);
  function handleClick() {
    if (!click) {
      setClick(true);
    } else {
      setClick(false);
    }
  }

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
              width="100px"
              borderRadius={0}
              bgColor={click ? "#947f7f4b" : "#1C4532"}
              borderRight={click ? "4px solid #947F7F" : ""}
              borderLeft={click? "4px solid" :""}
              height="80px"
              onClick={() => handleClick()}
              _hover={{
                borderLeft: "4px",
                bgColor: "#947f7f4b",
                width: "100px",
                borderRight: "4px",
                borderRightColor: "#947F7F",
              }}
            >
              <VStack>
                <Image src={Bayar} />
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
