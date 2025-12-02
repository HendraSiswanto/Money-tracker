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
} from "@chakra-ui/react";
import { useState, useRef } from "react";

import { BsPenFill, BsTrash3Fill } from "react-icons/bs";
import { useTransactions } from "../hooks/useTransactions";
import HisSkeleton from "./skeleton/HisSkeleton";

interface allDataIncome {
  id?: number;
  outcome: string;
  type: string;
  amount: number;
  date: string;
  note?: string;
  timestamp: number;
}

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
  const [editData, setEditData] = useState<allDataIncome | null>(null);
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

  const handleEdit = (item: allDataIncome) => {
    setEditData({
      id: item.id,
      amount: item.amount,
      note: item.note ?? "",
      date: item.date ? item.date.slice(0, 10) : "",
      type: item.type,
      timestamp: Number(item.timestamp),
      outcome: item.outcome,
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
      {transactions.length > 0 ? (
        <>
          <Flex gap={3} mb={4} justify="end" mr="75px" mt={4}>
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
          {isLoading ? (
            <HisSkeleton />
          ) : (
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
                        {item.outcome}
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
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
};
export default History;
