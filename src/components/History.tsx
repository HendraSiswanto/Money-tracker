import {
  Box,
  Button,
  Text,
  Tooltip,
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
  Checkbox,
} from "@chakra-ui/react";
import { useState, useRef } from "react";

import { BsPenFill, BsTrash3Fill } from "react-icons/bs";
import {
  useTransactions,
  type TransactionType,
} from "../hooks/useTransactions";
import HistorySkeleton from "./skeleton/HistorySkeleton";

const History: React.FC = () => {
  const {
    historyTransactions,
    filters,
    setFilters,
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
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deletedId, setDeletedId] = useState<number | null>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const rupiahFormat = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

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

      {isLoading ? (
        <HistorySkeleton />
      ) : (
        <Container maxW="container.xl" mt={8} mb={10}>
          <Flex justify="space-between" mb={6} gap={4} wrap="wrap">
            <Heading
              size="lg"
              bgGradient="linear(to-r, #54bd8cff, #45241cd4)"
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
                _hover={{ bgColor: "#b3b2b2ff" }}
                onChange={(e) => setSortOption(e.target.value as any)}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="high">Highest</option>
                <option value="low">Lowest</option>
              </Select>
              <Select
                color="#696969"
                border="0 solid"
                boxShadow="1px  1px 2px 2px rgba(0, 0, 0, 0.3)"
                width="150px"
                _hover={{ bgColor: "#b3b2b2ff" }}
                value={filters.year}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    year: Number(e.target.value),
                  }))
                }
              >
                {Array.from({ length: 5 }).map((_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </Select>
              <Select
                color="#696969"
                border="0 solid"
                boxShadow="1px  1px 2px 2px rgba(0, 0, 0, 0.3)"
                width="150px"
                _hover={{ bgColor: "#b3b2b2ff" }}
                value={filters.month ?? ""}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    month:
                      e.target.value === "" ? null : Number(e.target.value),
                  }))
                }
              >
                <option value="">All months</option>
                {Array.from({ length: 12 }).map((_, i) => (
                  <option key={i} value={i}>
                    {new Date(0, i).toLocaleString("en-US", { month: "long" })}
                  </option>
                ))}
              </Select>
            </Flex>
          </Flex>
          <Stack spacing={4}>
            {historyTransactions.length > 0 ? (
              <>
                <Checkbox
                  w="fit-content"
                  ml="10.5px"
                  fontSize="sm"
                  fontWeight="bold"
                  color="#504f4fc4"
                  borderColor="gray.300"
                  isChecked={
                    historyTransactions.length > 0 &&
                    selectedIds.length === historyTransactions.length
                  }
                  isIndeterminate={
                    selectedIds.length > 0 &&
                    selectedIds.length < historyTransactions.length
                  }
                  onChange={(e) =>
                    setSelectedIds(
                      e.target.checked
                        ? historyTransactions.map((t) => t.id!)
                        : []
                    )
                  }
                >
                  Select All
                </Checkbox>
                <Button
                  colorScheme="red"
                  isDisabled={selectedIds.length === 0}
                  onClick={async () => {
                    await Promise.all(
                      selectedIds.map((id) => removeTransaction(id))
                    );
                    setSelectedIds([]);
                  }}
                >
                  Delete Selected ({selectedIds.length})
                </Button>
                {historyTransactions.map((item) => (
                  <Box
                    key={item.id}
                    p={4}
                    border="1px solid"
                    borderColor="gray.300"
                    borderRadius="lg"
                    position="relative"
                    _hover={{ boxShadow: "md" }}
                  >
                    <Checkbox
                      position="absolute"
                      top="10px"
                      borderColor="gray.300"
                      left="10px"
                      isChecked={selectedIds.includes(item.id!)}
                      onChange={() => toggleSelect(item.id!)}
                    />
                    <Flex justify="space-between" gap={3} w="100%">
                      <Flex flexDir="column" gap={1} w="100%" pt={5}>
                        <Flex justify="center">
                          <Badge
                            position="absolute"
                            top="18px"
                            left="50%"
                            transform="translateX(-50%)"
                            colorScheme={
                              item.outcome === "income" ? "green" : "red"
                            }
                            color={
                              item.outcome === "income"
                                ? "#1C4532"
                                : "#45241cff"
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

                        {item.note ? (
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
                        ) : (
                          <Text
                            fontSize="sm"
                            fontWeight="bold"
                            color="gray.500"
                            isTruncated
                            maxW="180px"
                          >
                            No Note
                          </Text>
                        )}
                      </Flex>

                      <Flex align="center" gap={2}>
                        <Text
                          fontWeight="bold"
                          color={
                            item.outcome === "income" ? "#1C4532" : "#45241cff"
                          }
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
                  borderColor="gray.300"
                  borderRadius="lg"
                >
                  <Flex justify="space-between" align="center">
                    <Text fontWeight="semibold" color="gray.600">
                      Balance
                    </Text>

                    <Text
                      fontWeight="bold"
                      fontSize="lg"
                      color={balance >= 0 ? "#1C4532" : "#45241cff"}
                    >
                      {rupiahFormat.format(balance)}
                    </Text>
                  </Flex>
                </Box>
              </>
            ) : (
              <Box
                p={10}
                textAlign="center"
                border="1px dashed"
                borderColor="gray.300"
                borderRadius="lg"
                color="gray.500"
              >
                <Text fontSize="lg" fontWeight="semibold">
                  No transactions yet
                </Text>

                <Text fontSize="sm" mt={2}>
                  Start by adding your first income or expense
                </Text>
              </Box>
            )}
          </Stack>
        </Container>
      )}
    </>
  );
};
export default History;
