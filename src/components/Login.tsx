"use client";

import { Box, HStack, Image, Link, Stack, Text, Input } from "@chakra-ui/react";
import Vector1 from "../assets/Vector.svg";
import Vector2 from "../assets/Vector1.svg";

interface FormValues {
  username: string;
  password: string;
}

const Login = () => {
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
          fontFamily="Inter"
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
          fontFamily="Inter"
          fontWeight="900"
          letterSpacing={2}
        >
          TRACKER
        </Text>
      </HStack>

      <Text
        fontSize="48px"
        color="#171923"
        fontFamily="Inter"
        fontWeight="750"
        pb={3}
      >
        Sign in
      </Text>

      <Text fontSize="18px" color="#718096" fontFamily="Inter" pb={5}>
        Don't have an account?{" "}
        <Link fontWeight="500" color="#1C4532" textDecoration="underline">
          Create Now
        </Link>
      </Text>
      <form>
        <Stack gap="2" align="flex-start" maxW="sm" color="#718096">
          <Text fontFamily="Inter" fontSize="16px" ml="70px">
            E-mail
          </Text>
          <Input
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
          />
          <Text fontFamily="Inter" fontSize="16px" ml="70px">
            Password
          </Text>
          <Input
            _hover={{ borderColor: "#CBD5E0" }}
            ml="73px"
            bgColor="#F7FAFC"
            borderColor="#CBD5E0"
            textColor="#4A5568"
            type="password"
            borderRadius="12px"
            placeholder="me@example.com"
            height="50px"
            width="528px"
          />
        </Stack>
      </form>
    </Box>
  );
};

export default Login;
