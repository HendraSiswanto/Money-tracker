import {
  Box,
  Button,
  Card,
  Heading,
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
} from "@chakra-ui/react";
import Expense from "./Expense";
import { useState, useEffect, useRef } from "react";
import type { TypeExpense } from "../hooks/useExpense";
import type { TypeIncome } from "../hooks/useIncome";
import type { Data } from "../data/types";

import Income from "./Income";
import { BsPenFill, BsTrash3Fill } from "react-icons/bs";
import {
  createTransaction,
  deleteTransactions,
  updateTransaction,
  getTransactions,
} from "../api/transaction";
import TrSkeleton from "./skeleton/TrSkeleton";

interface Props {
  dataExpense: TypeExpense;
  dataIncome: TypeIncome;
}
interface allDataIncome {
  id?: number;
  outcome: string;
  type: string;
  amount: number;
  date: string;
  note?: string;
  timestamp: number;
}
type allDataExpense = allDataIncome;

const Transaction: React.FC = () => {
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const res = await fetch("http://localhost:3000/transactions");
      const data: Data[] = await res.json();

      const income = data.filter(
        (x: any) => x.outcome.toLowerCase() === "income"
      );
      const expense = data.filter(
        (x: any) => x.outcome.toLowerCase() === "expense"
      );

      setAllDataIncome(income);
      setAllDataExpense(expense);

      setSumIncome(income.reduce((acc, item) => acc + item.amount, 0));
      setSumExpense(expense.reduce((acc, item) => acc + item.amount, 0));

      setTimeout(() => {
        setIsLoading(false);
      }, 1200);
    }

    fetchData();
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  const [editData, setEditData] = useState<allDataIncome | null>(null);
  const [isEditOpen, setEditOpen] = useState(false);
  const [changeTipe, setTipe] = useState<Props>({} as Props);
  const [selected, setSelected] = useState("income");
  const [check, setCheck] = useState("balance");
  const [allDataIncome, setAllDataIncome] = useState<allDataIncome[]>([]);
  const [allDataExpense, setAllDataExpense] = useState<allDataExpense[]>([]);
  const [sumIncome, setSumIncome] = useState<number>(0);
  const [sumExpense, setSumExpense] = useState<number>(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deletedId, setDeletedId] = useState<number | null>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  const rupiahFormat = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  const handleSave = async (
    newData: allDataIncome,
    typeData: "income" | "expense"
  ) => {
    setIsLoading(true);
    const isEditing = !!newData.id;
    if (!isEditing) {
      await createTransaction({
        outcome: typeData,
        type: newData.type,
        amount: newData.amount,
        note: newData.note,
        date: newData.date,
        timestamp: Date.now(),
      });
    } else {
      await updateTransaction({
        id: newData.id!,
        amount: newData.amount,
        type: newData.type,
        timestamp: Date.now(),
        outcome: typeData,
        note: newData.note,
        date: newData.date,
      });
    }
    const latest = await getTransactions();

    const latestIncome = latest.filter((x) => x.outcome === "income");
    const latestExpense = latest.filter((x) => x.outcome === "expense");

    setAllDataIncome(latestIncome);
    setAllDataExpense(latestExpense);

    setSumIncome(latestIncome.reduce((acc, item) => acc + item.amount, 0));
    setSumExpense(latestExpense.reduce((acc, item) => acc + item.amount, 0));
    setIsLoading(false);
  };

  const handleOpenDialog = (id: number) => {
    setDeletedId(id);
    onOpen();
  };

  const handleDelete = async () => {
    if (!deletedId) return;

    await deleteTransactions(deletedId);

    setAllDataIncome((prev) => {
      const updated = prev.filter((item) => item.id !== deletedId);
      setSumIncome(updated.reduce((acc, item) => acc + item.amount, 0));
      return updated;
    });
    setAllDataExpense((prev) => {
      const updated = prev.filter((item) => item.id !== deletedId);
      setSumExpense(updated.reduce((acc, item) => acc + item.amount, 0));
      return updated;
    });

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

    await updateTransaction({
      id: editData.id!,
      amount: editData.amount,
      note: editData.note,
      date: editData.date
        ? editData.date
        : new Date().toISOString().split("T")[0],
      type: editData.type,
      outcome: editData.outcome,
      timestamp: Number(editData.timestamp),
    });
    const latest = await getTransactions();
    const latestIncome = latest.filter((x) => x.outcome === "income");
    const latestExpense = latest.filter((x) => x.outcome === "expense");

    setAllDataIncome(latestIncome);
    setAllDataExpense(latestExpense);

    setSumIncome(latestIncome.reduce((acc, item) => acc + item.amount, 0));
    setSumExpense(latestExpense.reduce((acc, item) => acc + item.amount, 0));

    setEditOpen(false);
  };

  const balancedTransaction = [...allDataIncome, ...allDataExpense];
  const sortedTransactions = [...balancedTransaction].sort(
    (a, b) => a.timestamp - b.timestamp
  );
  const sortedAllIncome = [...allDataIncome].sort(
    (a, b) => a.timestamp - b.timestamp
  );

  const sortedAllExpense = [...allDataExpense].sort(
    (a, b) => a.timestamp - b.timestamp
  );

  const balance = sumIncome - sumExpense;

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
      ;
      <Card
        ml={2}
        width="fit-content"
        mt={6}
        bgColor="transparent"
        border="1px solid #605f5f37"
        boxShadow="5px 5px 10px #605f5f37"
        alignItems="center"
        gap={2}
      >
        <Heading
          size="md"
          mb={4}
          textAlign="center"
          color="#1C4532"
          fontWeight="bold"
          mt={5}
        >
          START TRACKING
        </Heading>

        <Box display="flex" flexDirection="row" width="fit-content" gap={10}>
          <Button
            ml="110px"
            px="70px"
            bgColor="#1C4532"
            _active={{ bgColor: "#1c4532db" }}
            _hover={{ bgColor: "#1c4532db" }}
            onClick={() => setSelected("income")}
          >
            Income 💰
          </Button>

          <Button
            mr="110px"
            px="70px"
            bgColor="#45241cff"
            _active={{ bgColor: "#45241cd4" }}
            _hover={{ bgColor: "#45241cd4" }}
            onClick={() => setSelected("expense")}
          >
            Expense 💸
          </Button>
        </Box>

        {selected === "income" ? (
          <Income
            selectedType={changeTipe.dataIncome}
            onSelectType={(dataIncome) =>
              setTipe({ ...changeTipe, dataIncome })
            }
            saveIncome={handleSave}
          />
        ) : (
          <Expense
            selectedType={changeTipe.dataExpense}
            onSelectType={(dataExpense) =>
              setTipe({ ...changeTipe, dataExpense })
            }
            saveExpense={handleSave}
          />
        )}
      </Card>
      {allDataIncome.length > 0 || allDataExpense.length > 0 ? (
        <Box display="flex" justifyContent="center" mt={7}>
          <Box display="flex" justifyContent="space-between" width="1100px">
            <Button
              px="70px"
              bgColor="#f8f8f8"
              _hover={{ bgColor: "#b3b2b2ff" }}
              color="#696969"
              border="0 solid"
              boxShadow="1px  1px 2px 2px rgba(0, 0, 0, 0.3)"
              onClick={() => setCheck("balance")}
            >
              Balance Transaction
            </Button>
            <Button
              px="70px"
              onClick={() => setCheck("income")}
              bgColor="#1C4532"
              _hover={{ bgColor: "#1c4532db" }}
              isDisabled={allDataIncome.length === 0}
            >
              Income Transaction
            </Button>
            <Button
              px="70px"
              bgColor="#45241cff"
              _active={{ bgColor: "#45241cd4" }}
              onClick={() => setCheck("expense")}
              _hover={{ bgColor: "#45241cd4" }}
              isDisabled={allDataExpense.length === 0}
            >
              Expense Transaction
            </Button>
          </Box>
        </Box>
      ) : (
        ""
      )}
      {(allDataIncome.length > 0 || allDataExpense.length > 0) &&
        check === "balance" && (
          <>
            {isLoading ? (
              <TrSkeleton />
            ) : (
              <Box display="flex" justifyContent="center" mt={6} mb={6}>
                <Table
                  style={{ tableLayout: "fixed" }}
                  size="md"
                  variant="simple"
                  width="container.xl"
                >
                  <Thead>
                    <Tr>
                      <Th
                        textAlign="center"
                        border="2px solid #1C4532"
                        color="#1C4532"
                        w="160px"
                      >
                        Action
                      </Th>
                      <Th
                        textAlign="center"
                        width="15px"
                        border="2px solid #1C4532"
                        color="#1C4532"
                        w="140px"
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
                    {sortedTransactions.map((item) => (
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
        )}
      {allDataIncome.length > 0 && check === "income" && (
        <Box display="flex" justifyContent="center" mt={6} mb={6}>
          <Table size="md" variant="simple" width="container.xl">
            <Thead>
              <Tr>
                <Th
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
                  w="80px"
                >
                  Income/Expense
                </Th>
                <Th
                  textAlign="center"
                  border="2px solid #1C4532"
                  color="#1C4532"
                  w="180px"
                >
                  Type
                </Th>
                <Th
                  textAlign="center"
                  border="2px solid #1C4532"
                  color="#1C4532"
                  w="200px"
                >
                  Date
                </Th>
                <Th
                  textAlign="center"
                  border="2px solid #1C4532"
                  color="#1C4532"
                  w="350px"
                >
                  Note
                </Th>
                <Th
                  textAlign="center"
                  border="2px solid #1C4532"
                  color="#1C4532"
                  w="280px"
                >
                  Amount
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {sortedAllIncome.map((allDataIncome) => (
                <Tr key={allDataIncome.id}>
                  <Td
                    textAlign="center"
                    border="2px solid #1C4532"
                    color="#1C4532"
                  >
                    <Box display="flex" justifyContent="space-between">
                      <Button
                        bgColor="#45241cff"
                        _active={{ bgColor: "#45241cd4" }}
                        _hover={{ bgColor: "#45241cd4" }}
                        onClick={() => {
                          if (allDataIncome.id !== undefined) {
                            handleOpenDialog(allDataIncome.id);
                          }
                        }}
                      >
                        <Icon
                          boxSize={5}
                          as={BsTrash3Fill as React.ElementType}
                        />
                      </Button>
                      <Button
                        ml={2}
                        bgColor="#1C4532"
                        _active={{ bgColor: "#1c4532db" }}
                        _hover={{ bgColor: "#1c4532db" }}
                      >
                        <Icon boxSize={5} as={BsPenFill as React.ElementType} />
                      </Button>
                    </Box>
                  </Td>
                  <Td
                    textAlign="center"
                    border="2px solid #1C4532"
                    color="#1C4532"
                  >
                    {" "}
                    {allDataIncome.outcome}
                  </Td>
                  <Td
                    textAlign="center"
                    border="2px solid #1C4532"
                    color="#1C4532"
                  >
                    {allDataIncome.type}
                  </Td>

                  <Td
                    textAlign="center"
                    border="2px solid #1C4532"
                    color="#1C4532"
                  >
                    {new Date(allDataIncome.date).toLocaleDateString("en-CA")}
                  </Td>
                  <Td
                    textAlign="center"
                    border="2px solid #1C4532"
                    color="#1C4532"
                    wordBreak="break-word"
                    textOverflow="ellipsis"
                  >
                    <Tooltip label={allDataIncome.note} hasArrow>
                      <Text isTruncated maxW="160px" mx="auto">
                        {allDataIncome.note || "-"}
                      </Text>
                    </Tooltip>
                  </Td>
                  <Td
                    textAlign="center"
                    border="2px solid #1C4532"
                    color="#1C4532"
                  >
                    {rupiahFormat.format(allDataIncome.amount)}
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
                  {rupiahFormat.format(sumIncome)}
                </Td>
              </Tr>
            </Tfoot>
          </Table>
        </Box>
      )}
      {allDataExpense.length > 0 && check === "expense" && (
        <Box display="flex" justifyContent="center" mt={6} mb={6}>
          <Table size="md" variant="simple" width="container.xl">
            <Thead>
              <Tr>
                <Th
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
                  w="80px"
                >
                  Income/Expense
                </Th>
                <Th
                  textAlign="center"
                  border="2px solid #1C4532"
                  color="#1C4532"
                  w="180px"
                >
                  Type
                </Th>
                <Th
                  textAlign="center"
                  border="2px solid #1C4532"
                  color="#1C4532"
                  w="200px"
                >
                  Date
                </Th>
                <Th
                  textAlign="center"
                  border="2px solid #1C4532"
                  color="#1C4532"
                  w="350px"
                >
                  Note
                </Th>
                <Th
                  textAlign="center"
                  border="2px solid #1C4532"
                  color="#1C4532"
                  w="280px"
                >
                  Amount
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {sortedAllExpense.map((allDataExpense) => (
                <Tr key={allDataExpense.id}>
                  <Td
                    textAlign="center"
                    border="2px solid #1C4532"
                    color="#1C4532"
                  >
                    <Box display="flex" justifyContent="space-between">
                      <Button
                        bgColor="#45241cff"
                        _active={{ bgColor: "#45241cd4" }}
                        _hover={{ bgColor: "#45241cd4" }}
                        onClick={() => {
                          if (allDataExpense.id !== undefined) {
                            handleOpenDialog(allDataExpense.id);
                          }
                        }}
                      >
                        <Icon
                          boxSize={5}
                          as={BsTrash3Fill as React.ElementType}
                        />
                      </Button>
                      <Button
                        ml={2}
                        bgColor="#1C4532"
                        _active={{ bgColor: "#1c4532db" }}
                        _hover={{ bgColor: "#1c4532db" }}
                      >
                        <Icon boxSize={5} as={BsPenFill as React.ElementType} />
                      </Button>
                    </Box>
                  </Td>
                  <Td
                    textAlign="center"
                    border="2px solid #1C4532"
                    color="#1C4532"
                  >
                    {" "}
                    {allDataExpense.outcome}
                  </Td>
                  <Td
                    textAlign="center"
                    border="2px solid #1C4532"
                    color="#1C4532"
                  >
                    {allDataExpense.type}
                  </Td>

                  <Td
                    textAlign="center"
                    border="2px solid #1C4532"
                    color="#1C4532"
                  >
                    {new Date(allDataExpense.date).toLocaleDateString("en-CA")}
                  </Td>
                  <Td
                    textAlign="center"
                    border="2px solid #1C4532"
                    color="#1C4532"
                    wordBreak="break-word"
                    textOverflow="ellipsis"
                  >
                    <Tooltip label={allDataExpense.note} hasArrow>
                      <Text isTruncated maxW="160px" mx="auto">
                        {allDataExpense.note || "-"}
                      </Text>
                    </Tooltip>
                  </Td>
                  <Td
                    textAlign="center"
                    border="2px solid #1C4532"
                    color="#1C4532"
                  >
                    {rupiahFormat.format(allDataExpense.amount)}
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
                  {rupiahFormat.format(sumExpense)}
                </Td>
              </Tr>
            </Tfoot>
          </Table>
        </Box>
      )}
    </>
  );
};
export default Transaction;
