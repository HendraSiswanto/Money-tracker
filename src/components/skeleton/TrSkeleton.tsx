import {
  Skeleton,
  Tr,
  Td,
  Tbody,
  Box,
  Table,
  Th,
  Thead,
} from "@chakra-ui/react";

const TableSkeleton = () => {
  return (
    <Box display="flex" justifyContent="center" mt={6} mb={6}>
      <Table size="md" variant="simple" width="container.xl">
        <Thead>
          <Tr>
            <Th
              textAlign="center"
              width="80px"
              border="2px solid #1C4532"
              color="#1C4532"
            >
              Action
            </Th>
            <Th
              textAlign="center"
              width="80px"
              border="2px solid #1C4532"
              color="#1C4532"
            >
              Income/Expense
            </Th>
            <Th
              textAlign="center"
              width="180px"
              border="2px solid #1C4532"
              color="#1C4532"
            >
              Type
            </Th>
            <Th
              textAlign="center"
              width="200px"
              border="2px solid #1C4532"
              color="#1C4532"
            >
              Date
            </Th>
            <Th
              textAlign="center"
              width="350px"
              border="2px solid #1C4532"
              color="#1C4532"
            >
              Note
            </Th>
            <Th
              textAlign="center"
              width="280px"
              border="2px solid #1C4532"
              color="#1C4532"
            >
              Amount
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {[...Array(6)].map((_, i) => (
            <Tr key={i}>
              <Td border="2px solid #1C4532">
                <Skeleton height="25px" />
              </Td>
              <Td border="2px solid #1C4532">
                <Skeleton height="25px" />
              </Td>
              <Td border="2px solid #1C4532">
                <Skeleton height="25px" />
              </Td>
              <Td border="2px solid #1C4532">
                <Skeleton height="25px" />
              </Td>
              <Td border="2px solid #1C4532">
                <Skeleton height="25px" />
              </Td>
              <Td border="2px solid #1C4532">
                <Skeleton height="25px" />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TableSkeleton;
