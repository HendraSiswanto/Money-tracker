import {
  Box,
  Card,
  Skeleton,
  SkeletonText,
  Flex,
  Stack,
  Container,
} from "@chakra-ui/react";

const TransactionSkeleton = () => {
  return (
    <>
      <Container maxW="container.xl" mt={8}>
        <Flex gap={10} mt={8}>
          <Flex flexDir="column" gap={6}>
            <Card p={6} w="350px" h="380px">
              <Skeleton height="20px" w="120px" mb={3} />
              <Skeleton height="36px" />
              <SkeletonText mt={4} noOfLines={2} spacing="2" />
            </Card>
            <Card mt={1} w="350px" h="380px">
              <Skeleton height="24px" w="160px" mb={4} />
              <Skeleton height="40px" mb={3} />
              <Skeleton height="40px" mb={3} />
              <Skeleton height="40px" />
            </Card>
          </Flex>
          <Box flex="1">
            <Skeleton height="18px" w="200px" mb={4} />

            <Stack spacing={8}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Box
                  key={i}
                  p={4}
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="md"
                  width="900px"

                >
                  <Flex justify="space-between">
                    <SkeletonText noOfLines={2} w="20%" />
                    <Skeleton height="24px" w="100px" />
                  </Flex>
                </Box>
              ))}
            </Stack>

            <Skeleton mt={10} height="280px" borderRadius="lg" />
          </Box>
        </Flex>
      </Container>
    </>
  );
};

export default TransactionSkeleton;
