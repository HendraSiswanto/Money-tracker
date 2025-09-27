import {
  Button,
  Text,
  Flex,
  Image,
  List,
  ListItem,
  VStack,
  Box,
} from "@chakra-ui/react";
import useImage, { type Sided } from "../hooks/useImage";
import Logo from "../assets/Vector2.svg";
import Expense from "./Expense";

interface Props {
  onSelectImage: (imageData: Sided) => void;
  selectImage: Sided | null;
}

const MainPage = ({ onSelectImage, selectImage }: Props) => {
  const { data } = useImage();

  return (
    <>
      <Flex position="fixed" h="100vh" w="100%">
        <Box
          maxWidth="7%"
          justifyItems="center"
          flex="1"
          flexDirection="column"
          alignItems="center"
        >
          <Image mt="20px" boxSize="28px" src={Logo} />
          <List mt={6} paddingY="5px">
            {data.map((imageData) => (
              <ListItem key={imageData.id}>
                <Button
                  width="100px"
                  borderRadius={0}
                  bgColor={
                    imageData.id === selectImage?.id ? "#947f7f4b" : "#1C4532"
                  }
                  borderRight={
                    imageData.id === selectImage?.id ? "4px solid #947F7F" : ""
                  }
                  borderLeft={
                    imageData.id === selectImage?.id
                      ? "4px solid transparent"
                      : ""
                  }
                  height="80px"
                  onClick={() => onSelectImage(imageData)}
                  _hover={{
                    bgColor: "#947f7f4b",
                    width: "100px",
                  }}
                >
                  <VStack>
                    <Image src={imageData.imageUrl} />
                    <Text color="#a2acbaff" fontWeight="medium" fontSize="12px">
                      {imageData.name}
                    </Text>
                  </VStack>
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box flex={1} bgColor="#f2f2f6fa" maxWidth="100%">
           
    <Expense />
        </Box>
      </Flex>
    </>
  );
};

export default MainPage;
