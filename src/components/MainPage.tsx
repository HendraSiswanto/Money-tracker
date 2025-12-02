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
import Transaction from "./Transaction";
import History from "./History";

interface Props {
  onSelectImage: (imageData: Sided) => void;
  selectImage: Sided | null;
}

const MainPage = ({ onSelectImage, selectImage }: Props) => {
  const { data } = useImage();

   const renderPage = () => {
    switch (selectImage?.name) {
      case "Transaction":
        return <Transaction />;
      case "History":
        return <History />;
      default:
        return <Transaction />; // default
    }
  };

  return (
    <>
      <Flex>
        <Box
          position="fixed"
          left="0"
          top="0"
          bottom="0"
          bgColor="#1C4532"
          justifyItems="center"
          flexDirection="column"
          alignItems="center"
        >
          <Image mt="20px" boxSize="28px" src={Logo} bgColor="#1C4532" />
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
        <Box flex={1} ml="125px">
           {renderPage()}
        </Box>
      </Flex>
    </>
  );
};

export default MainPage;
