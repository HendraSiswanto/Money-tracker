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
} from "@chakra-ui/react";
import Vector1 from "../assets/Vector.svg";
import Vector2 from "../assets/Vector1.svg";
import { useState } from "react";

interface FormValues {
  email: string;
  username: string;
  password: string;
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    console.log(email, password);
  };

  return (
    <Box
      textAlign="center"
      bgColor="#F7FAFC"
      position="fixed"
      width="45%"
      top="-1"
      bottom="-1"
      borderRightRadius="14px"
    >
      <HStack justifyContent="center" pt="98px" flex="">
        <Text
          fontSize="46px"
          color="#1C4532"
          fontWeight="900"
          letterSpacing={2}
        >
          M
          <Image
            display="inline"
            height="38px"
            marginLeft="0.5px"
            marginRight="-2"
            pb="-1"
            pt="3px"
            src={Vector1}
          />{" "}
          N
          <Image
            display="inline"
            height="38px"
            marginLeft="0.5px"
            marginRight="-2"
            pb="-1"
            pt="3px"
            src={Vector2}
          />{" "}
          Y
        </Text>
        <Text
          ml="7"
          fontSize="46px"
          color="#1C4532"
          fontWeight="900"
          letterSpacing={2}
        >
          TRACKER
        </Text>
      </HStack>

      <Text fontSize="48px" color="#171923" fontWeight="750" pb={3}>
        Sign in
      </Text>

      <Text fontSize="18px" color="#718096" pb={5}>
        Don't have an account?{" "}
        <Link fontWeight="500" color="#1C4532" textDecoration="underline">
          Create Now
        </Link>
      </Text>
      <form onSubmit={onSubmit}>
        <Stack gap="2" align="flex-start" maxW="sm" color="#718096">
          <Text fontSize="16px" ml="70px">
            E-mail
          </Text>
          <Input
            _placeholder={{ color: "#4A5568" }}
            _hover={{ borderColor: "#CBD5E0" }}
            ml="73px"
            bgColor="#F7FAFC"
            borderColor="#CBD5E0"
            textColor="#4A5568"
            type="email"
            borderRadius="12px"
            placeholder="me@example.com"
            height="50px"
            width="528px"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
          />
          <Text fontSize="16px" ml="70px">
            Password
          </Text>
          <Input
            _placeholder={{ color: "#4A5568" }}
            _hover={{ borderColor: "#CBD5E0" }}
            ml="73px"
            bgColor="#F7FAFC"
            borderColor="#CBD5E0"
            textColor="#4A5568"
            type="password"
            borderRadius="12px"
            placeholder="@#*%"
            height="50px"
            width="528px"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
          />

          <Button
            onClick={onSubmit}
            mt={4}
            borderRadius="20px"
            width="528px"
            height="50px"
            ml="73px"
            bgColor="#1C4532"
            color="#F7FAFC"
          >
            Sign In
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Login;
