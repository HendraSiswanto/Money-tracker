import {
  Box,
  Button,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Text,
  Tooltip,
  Icon,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Modal,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Flex,
  Select,
  Heading,
  Container,
  Stack,
  Badge,
  IconButton,
} from "@chakra-ui/react";
import { useState, useRef } from "react";

import { BsPenFill, BsTrash3Fill } from "react-icons/bs";
import {
  useTransactions,
  type TransactionType,
} from "../hooks/useTransactions";
import HisSkeleton from "./skeleton/HisSkeleton";

const History: React.FC = () => {
  const {
    transactions,
    isLoading,
    sortOption,
    filterOption,
    setSortOption,
    setFilterOption,
    saveTransaction,
    removeTransaction,
    balance,
  } = useTransactions();
  const [editData, setEditData] = useState<TransactionType | null>(null);
  const [isEditOpen, setEditOpen] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deletedId, setDeletedId] = useState<number | null>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const rupiahFormat = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  const handleOpenDialog = (id: number) => {
    setDeletedId(id);
    onOpen();
  };

  const handleDelete = async () => {
    if (!deletedId) return;
    await removeTransaction(deletedId);
    onClose();
  };

  const handleEdit = (item: TransactionType) => {
    setEditData({
      id: item.id,
      amount: item.amount,
      note: item.note ?? "",
      date: item.date ? item.date.slice(0, 10) : "",
      type: item.type,
      timestamp: Number(item.timestamp),
      outcome: item.outcome,
      categoryId: item.categoryId,
    });
    setEditOpen(true);
  };
  const formatOutcome = (outcome: string) =>
    outcome.charAt(0).toUpperCase() + outcome.slice(1);

  const saveEditData = async () => {
    if (!editData) return;
    await saveTransaction(editData, editData.outcome as "income" | "expense");
    setEditOpen(false);
  };

  return (
    <>
      <Modal isCentered isOpen={isEditOpen} onClose={() => setEditOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Amount"
              type="number"
              value={editData?.amount ?? ""}
              onChange={(e) =>
                setEditData(
                  (prev) => prev && { ...prev, amount: +e.target.value }
                )
              }
            />

            <Input
              mt={3}
              placeholder="Note"
              value={editData?.note ?? ""}
              onChange={(e) =>
                setEditData((prev) => prev && { ...prev, note: e.target.value })
              }
            />

            <Input
              mt={3}
              type="date"
              value={editData?.date ?? ""}
              onChange={(e) =>
                setEditData((prev) => prev && { ...prev, date: e.target.value })
              }
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={saveEditData}>
              Save
            </Button>
            <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Transaction
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this transaction?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Container maxW="container.xl" mt={8}>
        <Flex justify="space-between" mb={6} gap={4} wrap="wrap">
          <Heading
            size="lg"
            bgGradient="linear(to-r, #1C4532, #45241cd4)"
            bgClip="text"
          >
            Transaction History
          </Heading>

          <Flex gap={3}>
            <Select
              color="#696969"
              border="0 solid"
              boxShadow="1px  1px 2px 2px rgba(0, 0, 0, 0.3)"
              width="150px"
              bgColor="#f8f8f8"
              _hover={{ bgColor: "#b3b2b2ff" }}
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value as any)}
            >
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </Select>

            <Select
              color="#696969"
              border="0 solid"
              boxShadow="1px  1px 2px 2px rgba(0, 0, 0, 0.3)"
              width="150px"
              value={sortOption}
              bgColor="#f8f8f8"
              _hover={{ bgColor: "#b3b2b2ff" }}
              onChange={(e) => setSortOption(e.target.value as any)}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="high">Highest</option>
              <option value="low">Lowest</option>
            </Select>
          </Flex>
        </Flex>
        <Stack spacing={4}>
          {transactions.map((item) => (
            <Box
              key={item.id}
              p={4}
              border="1px solid"
              borderColor="gray.300"
              borderRadius="lg"
              _hover={{ boxShadow: "md" }}
            >
              <Flex justify="space-between" gap={5} align="center">
                <Flex flexDir="column" gap={1}>
                  <Flex justify="center">
                    <Badge
                      colorScheme={item.outcome === "income" ? "green" : "red"}
                      color={
                        item.outcome === "income" ? "#1C4532" : "#45241cff"
                      }
                      px={3}
                      py={1}
                      mb={1}
                      borderRadius="full"
                      textTransform="capitalize"
                    >
                      {item.outcome.toUpperCase()}
                    </Badge>
                  </Flex>

                  <Text fontWeight="bold" fontSize="sm" color="gray.500">
                    {item.type}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    {new Date(item.date).toLocaleDateString("id-ID")}
                  </Text>

                  {item.note && (
                    <Tooltip label={item.note}>
                      <Text
                        fontSize="sm"
                        fontWeight="bold"
                        color="gray.500"
                        isTruncated
                        maxW="180px"
                      >
                        {item.note}
                      </Text>
                    </Tooltip>
                  )}
                </Flex>

                <Flex align="center" gap={3}>
                  <Text
                    fontWeight="bold"
                    color={item.outcome === "income" ? "#1C4532" : "#45241cff"}
                  >
                    {rupiahFormat.format(item.amount)}
                  </Text>

                  <IconButton
                    bgColor="green.100"
                    color="green.600"
                    _hover={{ bg: "green.50" }}
                    aria-label="Edit"
                    icon={<BsPenFill />}
                    size="sm"
                    onClick={() => handleEdit(item)}
                  />

                  <IconButton
                    aria-label="Delete"
                    icon={<BsTrash3Fill />}
                    size="sm"
                    colorScheme="red"
                    onClick={() => {
                      if (item.id !== undefined) {
                        handleOpenDialog(item.id);
                      }
                    }}
                  />
                </Flex>
              </Flex>
            </Box>
          ))}
          <Box
            p={4}
            border="1px solid"
            borderColor="green.300"
            borderRadius="lg"
            bg="green.50"
          >
            <Flex justify="space-between">
              <Text fontWeight="bold">Balance</Text>
              <Text fontWeight="bold">{rupiahFormat.format(balance)}</Text>
            </Flex>
          </Box>
        </Stack>
      </Container>

      {transactions.length > 0 ? (
        <>
          {isLoading ? (
            <HisSkeleton />
          ) : (
            <>
              <Box display="flex" justifyContent="center" mt={6} mb={6}>
                <Table
                  style={{ tableLayout: "fixed" }}
                  size="md"
                  variant="simple"
                  width="1200px"
                >
                  <Thead>
                    <Tr>
                      <Th
                        whiteSpace="nowrap"
                        textAlign="center"
                        border="2px solid #1C4532"
                        color="#1C4532"
                        w="80px"
                      >
                        Action
                      </Th>
                      <Th
                        textAlign="center"
                        width="15px"
                        border="2px solid #1C4532"
                        color="#1C4532"
                        w="120px"
                      >
                        Income/Expense
                      </Th>
                      <Th
                        textAlign="center"
                        border="2px solid #1C4532"
                        color="#1C4532"
                        w="140px"
                      >
                        Type
                      </Th>
                      <Th
                        textAlign="center"
                        border="2px solid #1C4532"
                        color="#1C4532"
                        w="140px"
                      >
                        Date
                      </Th>
                      <Th
                        textAlign="center"
                        border="2px solid #1C4532"
                        color="#1C4532"
                        w="200px"
                      >
                        Note
                      </Th>
                      <Th
                        textAlign="center"
                        border="2px solid #1C4532"
                        color="#1C4532"
                        w="160px"
                      >
                        Amount
                      </Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {transactions.map((item) => (
                      <Tr key={item.id}>
                        <Td
                          textAlign="center"
                          border="2px solid #1C4532"
                          color="#1C4532"
                        >
                          <Flex justifyContent="center" gap={2} w="100%">
                            <Button
                              bgColor="#45241cff"
                              _active={{ bgColor: "#45241cd4" }}
                              _hover={{ bgColor: "#45241cd4" }}
                              onClick={() => {
                                if (item.id !== undefined) {
                                  handleOpenDialog(item.id);
                                }
                              }}
                              w="40px"
                              h="40px"
                            >
                              <Icon
                                boxSize={5}
                                as={BsTrash3Fill as React.ElementType}
                              />
                            </Button>
                            <Button
                              w="40px"
                              h="40px"
                              bgColor="#1C4532"
                              _active={{ bgColor: "#1c4532db" }}
                              _hover={{ bgColor: "#1c4532db" }}
                              onClick={() => handleEdit(item)}
                            >
                              <Icon
                                boxSize={5}
                                as={BsPenFill as React.ElementType}
                              />
                            </Button>
                          </Flex>
                        </Td>
                        <Td
                          textAlign="center"
                          border="2px solid #1C4532"
                          color="#1C4532"
                        >
                          {" "}
                          {formatOutcome(item.outcome)}
                        </Td>
                        <Td
                          textAlign="center"
                          border="2px solid #1C4532"
                          color="#1C4532"
                        >
                          {item.type}
                        </Td>

                        <Td
                          textAlign="center"
                          border="2px solid #1C4532"
                          color="#1C4532"
                        >
                          {new Date(item.date).toLocaleDateString("en-CA")}
                        </Td>
                        <Td
                          textAlign="center"
                          border="2px solid #1C4532"
                          color="#1C4532"
                          wordBreak="break-word"
                          textOverflow="ellipsis"
                        >
                          <Tooltip label={item.note} hasArrow>
                            <Text isTruncated maxW="160px" mx="auto">
                              {item.note || "-"}
                            </Text>
                          </Tooltip>
                        </Td>
                        <Td
                          textAlign="center"
                          border="2px solid #1C4532"
                          color="#1C4532"
                        >
                          {rupiahFormat.format(item.amount)}
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
                        Total
                      </Td>
                      <Td
                        textAlign="center"
                        border="2px solid #1C4532"
                        color="#1C4532"
                      >
                        {rupiahFormat.format(balance)}
                      </Td>
                    </Tr>
                  </Tfoot>
                </Table>
              </Box>
            </>
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
};
export default History;
