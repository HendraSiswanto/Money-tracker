import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Image,
  List,
  ListItem,
  VStack,
} from "@chakra-ui/react";
import Logo from "../assets/Vector2.svg";
import Dompet from "../assets/Dompet.svg";

interface transaksi{

}

const MainPage = () => {
  return (
    <>
      <Grid position="fixed" display="flex" mt="20px">
        <VStack paddingLeft={10}>
        <Image src={Logo} />
        <List paddingY="5px">
          <ListItem>
            <Button width="100%" borderRadius={0}bgColor='#1C4532'  _hover={{bgColor:"#947f7f4b"}}>
              <VStack>
                <Image src={Dompet} />
              </VStack>
            </Button>
          </ListItem>
        </List>
        </VStack>
      </Grid>
      <Container></Container>
    </>
  );
};

export default MainPage;
