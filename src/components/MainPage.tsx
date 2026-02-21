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
import Balance from "./Balance";
import Category from "./Category";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { supabase } from "../libs/supabase";

interface Props {
  onSelectImage: (imageData: Sided) => void;
  selectImage: Sided | null;
}

const MainPage = ({ onSelectImage, selectImage }: Props) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("activeMenu");
    onSelectImage(null as any);
    navigate("/login");
  };
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
      }
    };

    checkUser();
  }, []);

  const { data } = useImage();

  useEffect(() => {
    const saved = localStorage.getItem("activeMenu");
    if (!saved || !data.length) return;

    const found = data.find((d) => d.name === saved);
    if (found) onSelectImage(found);
  }, [data]);

  const renderPage = () => {
    switch (selectImage?.name) {
      case "Transaction":
        return <Transaction />;
      case "Balance":
        return <Balance />;
      case "Category":
        return <Category />;
      case "History":
        return <History />;
      default:
        return <Transaction />;
    }
  };

  return (
    <>
      <Flex>
        <Box
          justifyContent="space-between"
          alignItems="center"
          position={{ base: "fixed", md: "fixed" }}
          bottom={{ base: 0, md: 0 }}
          top={{ base: "auto", md: 0 }}
          left={0}
          w={{ base: "100%", md: "100px" }}
          h={{ base: "80px", md: "auto" }}
          minH={{ md: "100vh" }}
          bg="#1C4532"
          display="flex"
          flexDir={{ base: "row", md: "column" }}
          zIndex={100}
        >
          <List
            display="flex"
            flexDir={{ sm: "row", md: "column" }}
            alignItems="center"
            gap={{ md: 1 }}
          >
            <Flex
              ml={{ base: 5, md: 0 }}
              mt={{ base: 0, md: 8 }}
              mb={{ base: 0, md: 5 }}
              mr={{ base: 20, md: 0 }}
            >
              <Image boxSize="28px" src={Logo} bgColor="#1C4532" />
            </Flex>
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
                  onClick={() => {
                    localStorage.setItem("activeMenu", imageData.name);
                    onSelectImage(imageData);
                  }}
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

          <Box>
            <Button
              mr={{ base: 3, md: 0 }}
              mb={{ base: 0, md: 7 }}
              width="100%"
              bg="transparent"
              color="#d0421eff"
              _hover={{ bg: "#45241cff", color: "white" }}
              onClick={handleLogout}
            >
              <VStack spacing={1}>
                <FiLogOut size={18} />
                <Text fontSize="12px">Logout</Text>
              </VStack>
            </Button>
          </Box>
        </Box>
        <Box
          flex={1}
          ml={{ base: 0, md: "100px" }}
          mb={{ base: "80px", md: 0 }}
        >
          {renderPage()}
        </Box>
      </Flex>
    </>
  );
};

export default MainPage;
