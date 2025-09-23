import {
  Button,
  Text,
  Container,
  Flex,
  Image,
  List,
  ListItem,
  VStack,
  Box,
} from "@chakra-ui/react";
import useImage, {type Sided} from "../hooks/useImage";
import Logo from "../assets/Vector2.svg";

interface Props {
  onSelectImage: (imageData: Sided) => void,
  selectImage: Sided | null
}

const MainPage = ({onSelectImage,selectImage}:Props) => {
  const {data} = useImage();

  return (
    <>
      <Flex
      h="100vh" w="100%"
      >
        <Box 
        maxWidth="7%"
        justifyItems="center"
        flex="1"
        gap={5}
        flexDirection="column"
        alignItems="center"
        mt="20px">
        <Image boxSize="28px" src={Logo} />
        <List paddingY="5px">

        {data.map((imageData) => (
          <ListItem key={imageData.id}>
            <Button
              width="100%"
              borderRadius={0}
              bgColor={imageData.id === selectImage?.id? "#947f7f4b" : "#1C4532"}
              borderRight={imageData.id === selectImage?.id? "4px solid #947F7F" : ""}
              
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
         <Box flex={1} bgColor="#F2F2F6" maxWidth="100%">tes</Box>
      </Flex>
     
    </>
  );
};

export default MainPage;
