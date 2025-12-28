import {
  Box,
  Skeleton,
  SkeletonText,
  Grid,
  Container,
  Flex,
} from "@chakra-ui/react";

const CategorySkeleton = () => {
  return (
    <>
      <Container maxW="container.xl" mt={8} mb={10}>
        <Flex justify="space-between">
          <Box>
            <Skeleton height="32px" w="180px" mb={3} />
            <SkeletonText noOfLines={2} spacing="2" />
          </Box>
          <Skeleton height="32px" w="150px" mt={4} mb={3} />
        </Flex>
        <Flex gap={1} justify="flex-start" mt={4}>
          <Skeleton height="32px" w="110px" mb={3} />

          <Skeleton height="32px" w="110px" mb={3} />
        </Flex>
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={4}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <Box
              key={i}
              p={4}
              border="1px solid"
              borderColor="gray.300"
              borderRadius="lg"
              boxShadow="sm"
            >
              <Skeleton height="32px" w="32px" mb={3} />
              <SkeletonText noOfLines={2} spacing="2" />
            </Box>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default CategorySkeleton;
