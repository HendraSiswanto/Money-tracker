"use client";

import {
  Box,
  HStack,
  Image,
  Link,
  Stack,
  Text,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

import Vector1 from "../assets/Vector.svg";
import Vector2 from "../assets/Vector1.svg";
import Icon from "../assets/Icon.svg";
import { useRegister } from "../hooks/useRegister";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await useRegister(name, email, password);
      alert("Account created! Please log in.");
      window.location.href = "/login";
    } catch (err: any) {
      alert("Register failed: " + err.response?.data?.error);
    }
  };

  useEffect(() => {
  const original = document.body.style.overflow;
  document.body.style.overflow = "hidden";

  return () => {
    document.body.style.overflow = original;
  };
}, []);
  return (
    <Box
      minH="100dvh"
      bg={{ base: "#F7FAFC", lg: "#1C4532" }}
      display="flex"
      flexDir={{ base: "column", lg: "row" }}
      overflow="hidden"
    >
      <Box
        w={{ base: "100%", lg: "45%" }}
        bg="#F7FAFC"
        minH="100dvh"
        borderRightRadius={{ md: "14px" }}
        px={{ base: 4, md: 0 }}
        py={{ base: 6, md: 10 }}
      >
        <Stack
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="center"
          pt="80px"
          spacing={2}
        >
          <Text fontSize="46px" color="#1C4532" fontWeight="900">
            M
            <Image display="inline" h="38px" mx="1px" src={Vector1} />
            N
            <Image display="inline" h="38px" mx="1px" src={Vector2} />Y
          </Text>

          <Text
            ml={{ base: 0, md: 4 }}
            fontSize="46px"
            color="#1C4532"
            fontWeight="900"
          >
            TRACKER
          </Text>
        </Stack>
        <Text
          fontSize="48px"
          color="#171923"
          fontWeight="750"
          textAlign="center"
        >
          Create Account
        </Text>

        <Text fontSize="18px" color="#718096" textAlign="center" mb={6}>
          Already have an account?{" "}
          <Link href="/login" fontWeight="500" color="#1C4532">
            Sign In
          </Link>
        </Text>

        <form onSubmit={onSubmit}>
          <Stack
            gap="2"
            w="100%"
            maxW={{ base: "100%", md: "480px", xl: "540px" }}
            mx="auto"
            color="#718096"
          >
            <Text>Name</Text>
            <Input
              w="100%"
              borderColor="#CBD5E0"
              borderRadius="12px"
              _placeholder={{ color: "#4A5568" }}
              _hover={{ borderColor: "#CBD5E0" }}
              h="50px"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Text>E-mail</Text>
            <Input
              borderRadius="12px"
              borderColor="#CBD5E0"
              _placeholder={{ color: "#4A5568" }}
              _hover={{ borderColor: "#CBD5E0" }}
              w="100%"
              h="50px"
              placeholder="me@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Text>Password</Text>
            <InputGroup>
              <Input
                h="50px"
                borderColor="#CBD5E0"
                borderRadius="12px"
                _placeholder={{ color: "#4A5568" }}
                _hover={{ borderColor: "#CBD5E0" }}
                type={show ? "text" : "password"}
                placeholder="@#*%"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement
                mr={2}
                mt={1}
                pl={2}
                borderLeft="1px solid #CBD5E0"
                h="80%"
                justifyContent="center"
              >
                <IconButton
                  aria-label="toggle password"
                  variant="ghost"
                  icon={
                    show ? (
                      <BsEyeFill color="#718096" />
                    ) : (
                      <BsEyeSlashFill color="#718096" />
                    )
                  }
                  onClick={() => setShow(!show)}
                />
              </InputRightElement>
            </InputGroup>

            <Button
              mt={5}
              h="50px"
              borderRadius="20px"
              bg="#1C4532"
              color="#F7FAFC"
              _hover={{ bg: "#173929" }}
              type="submit"
            >
              Create Account
            </Button>
          </Stack>
        </form>
      </Box>

      <Box
        display={{ base: "none", md: "none", lg: "flex" }}
        flex="1"
        alignItems="center"
        justifyContent="center"
        flexDir="column"
        gap={6}
        flexWrap="wrap"
      >
        <Box
          bg="#F7FAFC"
          w={{ lg: "420px", xl: "540px" }}
          h="335px"
          borderRadius="10px"
          textAlign="center"
        >
          <Text fontSize="32px" color="#1C4532" fontWeight="bold" mt="42px">
            Reach financial <br /> goals faster
          </Text>
          <Text mt={6} fontSize="14px" color="#718096">
            reach your financial freedom <br />
            using this money tracker!
          </Text>
          <Button
            mt={6}
            w="168px"
            h="46px"
            borderRadius="70px"
            bg="#1C4532"
            color="#F7FAFC"
          >
            Learn More
          </Button>
        </Box>

        <Box
          bg="#F7FAFC"
          w={{ lg: "220px", xl: "275px" }}
          h="85px"
          borderRadius="10px"
          display="flex"
          alignItems="center"
          px={5}
        >
          <Image src={Icon} />
          <Box ml={10}>
            <Text fontSize="14px" color="#1C4532">
              Earning
            </Text>
            <Text fontSize="24px" fontWeight="bold" color="#1C4532">
              $999.99
            </Text>
          </Box>
        </Box>
        <Box
          color="#a2acbaff"
          textAlign="center"
          maxW={{ lg: "320px", xl: "450px" }}
          fontSize="20px"
        >
          <Text color="#a2acbaff" fontSize="20px">
            Analyzing your money expense and track it for comfortable money
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
