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
import useImage, {type Sided} from "../hooks/useImage";
import Logo from "../assets/Vector2.svg";

const MainPage = () => {
  const {data,setImageData} = useImage();
  const handleClick = (id: number) =>{
    setImageData(data.map(imageData => imageData.id === id ? { ...imageData, clicked: !imageData.clicked } : imageData))
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

        {data.map((imageData) => (
          <ListItem key={imageData.id}>
            <Button
              width="100px"
              borderRadius={0}
              bgColor={imageData.clicked? "#947f7f4b" : "#1C4532"}
              borderRight={imageData.clicked? "4px solid #947F7F" : ""}
              borderLeft={imageData.clicked? "4px solid" :""}
              height="80px"
              onClick={() => handleClick(imageData.id)}
              _hover={{
                borderLeft: "4px",
                bgColor: "#947f7f4b",
                width: "100px",
                borderRight: "4px",
                borderRightColor: "#947F7F",
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
      </Flex>
      <Container></Container>
    </>
  );
};

export default MainPage;
