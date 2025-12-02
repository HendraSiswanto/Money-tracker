import {
  Skeleton,
  Tr,
  Td,
  Tbody,
  Box,
  Table,
  Th,
  Thead,
  Tfoot,
} from "@chakra-ui/react";

const HisSkeleton = () => {
  return (
    <Box display="flex" justifyContent="center" mt={6} mb={6}>
      <Table size="md" variant="simple" width="1200px">
        <Thead>
          <Tr>
            <Th
              textAlign="center"
              width="115px"
              border="2px solid #1C4532"
              color="#1C4532"
            >
              Action
            </Th>
            <Th
              textAlign="center"
              width="171px"
              border="2px solid #1C4532"
              color="#1C4532"
            >
              Income/Expense
            </Th>
            <Th
              textAlign="center"
              width="200px"
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
              width="285px"
              border="2px solid #1C4532"
              color="#1C4532"
            >
              Note
            </Th>
            <Th
              textAlign="center"
              width="228px"
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
        <Tfoot>
          <Tr>
            <Td
              colSpan={5}
              textAlign="right"
              border="2px solid #1C4532"
              color="#1C4532"
              fontWeight="bold"
            >
              <Skeleton width="60px" height="25px" ml="auto" display="block" />
            </Td>
            <Td textAlign="center" border="2px solid #1C4532" color="#1C4532">
              <Skeleton height="25px" />
            </Td>
          </Tr>
        </Tfoot>
      </Table>
    </Box>
  );
};

export default HisSkeleton;
