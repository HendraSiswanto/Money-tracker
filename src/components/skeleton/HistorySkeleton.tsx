import {
  Box,
  Skeleton,
  SkeletonText,
  Stack,
  Flex,
  Container,
} from "@chakra-ui/react";

const HistorySkeleton = () => {
  return (
    <>
      <Container maxW="container.xl" mt={8} mb={10}>
        <Stack spacing={4}>
          <Flex justifyContent="space-between">
            <Skeleton height="40px" ml={4} w="300px" />
            <Skeleton height="40px" w="250px" />
            <Flex justify="flex-end" gap={3}>
              <Skeleton height="40px" w="150px" />
              <Skeleton height="40px" w="150px" />
              <Skeleton height="40px" w="150px" />
              <Skeleton height="40px" w="150px" />
            </Flex>
          </Flex>
          <Flex justify="space-between" mt={3}>
            <Skeleton ml="10.5px" height="30px" w="150px" />
            <Skeleton height="40px" w="170px" />
          </Flex>
          {Array.from({ length: 6 }).map((_, i) => (
            <Box
              key={i}
              p={4}
              border="1px solid"
              borderColor="gray.200"
              borderRadius="lg"
            >
              <Flex>
                <Skeleton height="16px" w="16px" textAlign="start" mb={4} />
                <Skeleton height="22px" w="100px" mx="auto" mb={4} />
              </Flex>

              <Flex justify="space-between" align="center">
                <SkeletonText noOfLines={3} w="60%" />
                <Skeleton height="28px" w="100px" />
              </Flex>
            </Box>
          ))}

          <Box
            p={4}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="lg"
          >
            <Flex justify="space-between">
              <Skeleton height="20px" w="80px" />
              <Skeleton height="28px" w="140px" />
            </Flex>
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default HistorySkeleton;
