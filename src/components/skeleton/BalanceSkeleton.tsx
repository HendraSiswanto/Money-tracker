import {
  Box,
  Container,
  Flex,
  SimpleGrid,
  Grid,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";

export default function BalanceSkeleton() {
  return (
    <Container maxW="container.xl" px={0}>
      <Flex flexDirection="column" p={1}>
        <SimpleGrid mt={8} mb={4} columns={{ base: 1, md: 4 }} spacing="50px">
          {Array.from({ length: 4 }).map((_, i) => (
            <Box
              key={i}
              p={5}
              h="230px"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="lg"
              boxShadow="sm"
            >
              <Flex justify="space-between" align="center" mb={4}>
                <SkeletonCircle size="10" />
                <Skeleton height="14px" width="40px" />
              </Flex>

              <Skeleton height="16px" width="70%" mb={2} />
              <Skeleton height="28px" width="60%" />
            </Box>
          ))}
        </SimpleGrid>
        <Box
          mt={3}
          p={5}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="lg"
        >
          <Flex justify="space-between" mb={4}>
            <Skeleton height="18px" width="220px" />
            <Skeleton height="32px" width="160px" />
          </Flex>

          <Skeleton height="170px" borderRadius="md" />
        </Box>

        <Grid templateColumns={{ base: "1fr", md: "420px 1fr" }} gap={5} mt={6}>
          <Box
            p={4}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="lg"
            h="250px"
          >
            <SkeletonText noOfLines={4} spacing="3" />
          </Box>

          <Box
            p={4}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="lg"
            minH="250px"
          >
            <Skeleton height="100%" borderRadius="md" />
          </Box>
        </Grid>
      </Flex>
    </Container>
  );
}
