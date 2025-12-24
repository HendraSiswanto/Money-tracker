import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Icon,
  Text,
  IconButton,
  Container,
  ButtonGroup,
} from "@chakra-ui/react";
import {
  BsPencil,
  BsTrash,
  BsPlusCircle,
  BsArrowDownCircle,
  BsArrowUpCircle,
} from "react-icons/bs";
import { useState } from "react";
import useCategories from "../hooks/useCategories";

export default function CategoryPage() {
  const { categories, addCategory, editCategory, removeCategory } =
    useCategories();
  const [activeType, setActiveType] = useState<"income" | "expense">("income");

  const filteredCategories = categories.filter(
    (cat) => cat.type === activeType
  );

  return (
    <Container maxW="container.xl" mt={8}>
      <Flex justify="space-between" align="center" mb={6} wrap="wrap" gap={4}>
        <Box borderBottom="1px" borderBottomColor="#1C4532" pb={1}>
          <Heading
            size="lg"
            bgGradient="linear(to-r, #1C4532, #38A169)"
            bgClip="text"
          >
            Categories
          </Heading>
          <Text fontSize="sm" color="gray.500">
            Manage your income and expense categories
          </Text>
        </Box>

        <Button
          leftIcon={<BsPlusCircle />}
          bg="#1C4532"
          color="white"
          _hover={{ bg: "#1c4532db" }}
        >
          New Category
        </Button>
      </Flex>

      <Flex mb={6} justify="space-between" align="center" wrap="wrap" gap={4}>
        <ButtonGroup isAttached variant="outline">
          <Button
            leftIcon={<BsArrowUpCircle />}
            onClick={() => setActiveType("income")}
            bg={activeType === "income" ? "#1C4532" : "transparent"}
            color={activeType === "income" ? "white" : "gray.600"}
            _hover={{ bg: activeType === "income" ? "#1c4532db" : "gray.100" }}
          >
            Income
          </Button>
          <Button
            leftIcon={<BsArrowDownCircle />}
            onClick={() => setActiveType("expense")}
            bg={activeType === "expense" ? "#45241c" : "transparent"}
            color={activeType === "expense" ? "white" : "gray.600"}
            _hover={{ bg: activeType === "expense" ? "#45241cd4" : "gray.100" }}
          >
            Expense
          </Button>
        </ButtonGroup>

        <Text fontSize="sm" color="gray.500">
          Showing {filteredCategories.length}{" "}
          {activeType === "income" ? "income" : "expense"} categories
        </Text>
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
        {filteredCategories.map((cat) => (
          <Box
            key={cat.id}
            p={4}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="lg"
            boxShadow="sm"
            transition="all 0.2s"
            _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
          >
            <Flex justify="space-between" align="center">
              <Text fontSize="2xl">{cat.emote}</Text>

              <Flex gap={1}>
                <IconButton
                  aria-label="Edit category"
                  icon={<Icon as={BsPencil} />}
                  size="sm"
                  variant="ghost"
                  color={cat.type === "income" ? "#1C4532" : "#45241c"}
                />
                <IconButton
                  aria-label="Delete category"
                  icon={<Icon as={BsTrash} />}
                  size="sm"
                  variant="ghost"
                  colorScheme="red"
                  onClick={() => removeCategory(cat.id)}
                />
              </Flex>
            </Flex>

            <Text
              mt={3}
              color={cat.type === "income" ? "#1C4532" : "#45241c"}
              fontWeight="bold"
            >
              {cat.name}
            </Text>
            <Text
              fontSize="xs"
              mt={1}
              fontWeight="semibold"
              color={cat.type === "income" ? "#1C4532" : "#45241c"}
            >
              {cat.type.toUpperCase()}
            </Text>
          </Box>
        ))}
      </Grid>
    </Container>
  );
}
