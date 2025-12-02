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
} from "@chakra-ui/react";
import Expense from "./Expense";
import { useState } from "react";
import type { TypeExpense } from "../hooks/useExpense";
import type { TypeIncome } from "../hooks/useIncome";

import Income from "./Income";
import TrSkeleton from "./skeleton/HisSkeleton";
import { useTransactions } from "../hooks/useTransactions";

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

const Transaction: React.FC = () => {
  const { transactions, saveTransaction, balance, isLoading } =
    useTransactions();
  const [changeTipe, setTipe] = useState<Props>({} as Props);
  const [selected, setSelected] = useState("income");

  const rupiahFormat = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  const handleSave = async (item: allDataIncome) => {
    await saveTransaction(item, item.outcome as "income" | "expense");
  };
  const formatOutcome = (outcome: string) =>
    outcome.charAt(0).toUpperCase() + outcome.slice(1);

  return (
    <>
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
      {transactions.length > 0 ? (
        <>
          {isLoading ? (
            <TrSkeleton />
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
                      colSpan={4}
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
export default Transaction;
