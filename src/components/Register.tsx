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
import Vector1 from "../assets/Vector.svg";
import Vector2 from "../assets/Vector1.svg";
import { useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
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

  return (
    <Box
      bgColor="#1C4532"
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      overflow="hidden"
    >
      <Box
        textAlign="center"
        bgColor="#F7FAFC"
        position="fixed"
        width="45%"
        top="-1"
        bottom="-1"
        borderRightRadius="14px"
      >
        <HStack justifyContent="center" pt="98px">
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
          Create Account
        </Text>

        <Text fontSize="18px" color="#718096" pb={5}>
          Already have an account?{" "}
          <Link href="/login" fontWeight="500" color="#1C4532">
            Sign In
          </Link>
        </Text>

        <form onSubmit={onSubmit}>
          <Stack gap="2" align="flex-start" maxW="sm" color="#718096">
            {/* Name */}
            <Text fontSize="16px" ml="70px">
              Name
            </Text>
            <Input
              _placeholder={{ color: "#4A5568" }}
              _hover={{ borderColor: "#CBD5E0" }}
              ml="73px"
              bgColor="#F7FAFC"
              borderColor="#CBD5E0"
              textColor="#4A5568"
              type="text"
              borderRadius="12px"
              placeholder="John Doe"
              height="50px"
              width="528px"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* Email */}
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
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password */}
            <Text fontSize="16px" ml="70px">
              Password
            </Text>
            <InputGroup
              ml="73px"
              bgColor="#F7FAFC"
              borderColor="#CBD5E0"
              textColor="#4A5568"
              width="528px"
            >
              <InputRightElement
                pl={2}
                mr={5}
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize={20}
                height="100%"
              >
                <Box h="35px" mr={2} borderLeft="1px solid #CBD5E0" />
                <IconButton
                  aria-label={show ? "Hide Password" : "Show Password"}
                  icon={
                    show ? (
                      <BsEyeFill size="20px" color="#718096" />
                    ) : (
                      <BsEyeSlashFill size="20px" color="#718096" />
                    )
                  }
                  onClick={() => setShow(!show)}
                />
              </InputRightElement>
              <Input
                borderRadius="12px"
                _placeholder={{ color: "#4A5568" }}
                _hover={{ borderColor: "#CBD5E0" }}
                height="50px"
                type={show ? "text" : "password"}
                placeholder="@#*%"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>

            <Button
              _hover={{ bgColor: "#173929ff", color: "#F7FAFC" }}
              mt={5}
              borderRadius="20px"
              width="528px"
              height="50px"
              ml="73px"
              bgColor="#1C4532"
              color="#F7FAFC"
              type="submit"
            >
              Create Account
            </Button>
          </Stack>
        </form>
      </Box>
      <Box
        justifyContent="center"
        position="absolute"
        bgColor="#F7FAFC"
        textAlign="center"
        width="540px"
        height="335px"
        display="inline-block"
        right="110px"
        mt={145}
        borderRadius="10px"
      >
        <Text
          color="#1C4532"
          fontSize="32px"
          fontWeight="bold"
          mt="42px"
          lineHeight="40px"
        >
          Reach financial <br />
          goals faster
        </Text>
        <Text
          pt={10}
          fontSize="14px"
          fontWeight="550"
          color="#718096"
          lineHeight="25px"
          pb={10}
        >
          reach your financial freedom <br />
          using this money tracker!
        </Text>
        <Button
          _hover={{ bgColor: "#173929ff", color: "#F7FAFC" }}
          fontSize="14px"
          fontWeight="medium"
          color="#F7FAFC"
          width="168px"
          height="46px"
          bgColor="#1C4532"
          borderRadius="70px"
        >
          Learn More
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
