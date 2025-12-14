import { Box, Flex, Text, Button, Grid, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

type Category = {
  id: number;
  name: string;
  type: "income" | "expense";
  color: string;
  icon?: string;
};

export default function Category() {
  // Temp static categories (replace later with API or localStorage)
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Salary", type: "income", color: "#1C4532" },
    { id: 2, name: "Freelance", type: "income", color: "#276749" },
    { id: 3, name: "Food", type: "expense", color: "#C53030" },
    { id: 4, name: "Shopping", type: "expense", color: "#9B2C2C" },
  ]);

  const incomeCategories = categories.filter((c) => c.type === "income");
  const expenseCategories = categories.filter((c) => c.type === "expense");

  return (
    <Box p={5}>

      <Flex justify="space-between" align="center" mb={5}>
        <Text fontSize="2xl" fontWeight="bold" color="gray.700">
          Categories
        </Text>
        <Button colorScheme="teal">+ Add Category</Button>
      </Flex>

      {/* Income Section */}
      <Box mb={8}>
        <Text fontSize="lg" fontWeight="bold" color="#1C4532" mb={3}>
          Income Categories
        </Text>

        <Grid templateColumns="repeat(auto-fill, minmax(140px, 1fr))" gap={4}>
          {incomeCategories.map((cat) => (
            <Box
              key={cat.id}
              p={3}
              border="1px solid #e5e5e5"
              borderRadius="md"
              bg="whiteAlpha.50"
            >
              <Flex justify="space-between" align="center">
                <Text fontWeight="bold" color={cat.color}>
                  {cat.name}
                </Text>

                <Flex gap={1}>
                  <IconButton
                    aria-label="edit"
                    size="sm"
                    icon={<FiEdit />}
                    variant="ghost"
                  />
                  <IconButton
                    aria-label="delete"
                    size="sm"
                    icon={<FiTrash2 />}
                    variant="ghost"
                  />
                </Flex>
              </Flex>
            </Box>
          ))}
        </Grid>
      </Box>

      {/* Expense Section */}
      <Box mb={8}>
        <Text fontSize="lg" fontWeight="bold" color="#C53030" mb={3}>
          Expense Categories
        </Text>

        <Grid templateColumns="repeat(auto-fill, minmax(140px, 1fr))" gap={4}>
          {expenseCategories.map((cat) => (
            <Box
              key={cat.id}
              p={3}
              border="1px solid #e5e5e5"
              borderRadius="md"
              bg="whiteAlpha.50"
            >
              <Flex justify="space-between" align="center">
                <Text fontWeight="bold" color={cat.color}>
                  {cat.name}
                </Text>

                <Flex gap={1}>
                  <IconButton
                    aria-label="edit"
                    size="sm"
                    icon={<FiEdit />}
                    variant="ghost"
                  />
                  <IconButton
                    aria-label="delete"
                    size="sm"
                    icon={<FiTrash2 />}
                    variant="ghost"
                  />
                </Flex>
              </Flex>
            </Box>
          ))}
        </Grid>
      </Box>

    </Box>
  );
}
