import {
  Box,
  Button,
  Card,
  Heading,
  Text,
  Tooltip,
  Container,
  Flex,
} from "@chakra-ui/react";
import Expense from "./Expense";
import { useState } from "react";
import type { TypeExpense } from "../hooks/useExpense";
import type { TypeIncome } from "../hooks/useIncome";

import Income from "./Income";
import TrSkeleton from "./skeleton/HisSkeleton";
import { useTransactions } from "../hooks/useTransactions";
import BalanceCard from "./BalanceCard";

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
  const {
    transactions,
    saveTransaction,
    isLoading,
    balance,
    totalExpense,
    totalIncome,
  } = useTransactions();
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
 
  const latestFive = transactions.slice(0, 6);
  return (
    <>
      <Container display="flex" flexDirection="row" maxW="container.xl" mt={8}>
        <Flex flexDirection="column" align="flex-start">
          <BalanceCard
            balance={balance}
            totalIncome={totalIncome}
            totalExpense={totalExpense}
            userName="Hendra Giswanto"
            userImage="/assets/profile.png"
          ></BalanceCard>

          <Card
            width="fit-content"
            mt={6}
            px="44px"
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

            <Box
              display="flex"
              bg="#E6E6E6"
              p="6px"
              borderRadius="full"
              gap={2}
              mt={2}
            >
              <Button
                flex="1"
                borderRadius="full"
                bgColor={selected === "income" ? "#1C4532" : "transparent"}
                color={selected === "income" ? "white" : "#1C4532"}
                _hover={{ bgColor: "#1c4532db", color: "white" }}
                onClick={() => setSelected("income")}
              >
                Income 💰
              </Button>

              <Button
                flex="1"
                borderRadius="full"
                bgColor={selected === "expense" ? "#45241cff" : "transparent"}
                color={selected === "expense" ? "white" : "#45241cff"}
                _hover={{ bgColor: "#45241cd4", color: "white" }}
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
        </Flex>
        {transactions.length > 0 ? (
          <>
            {isLoading ? (
              <TrSkeleton />
            ) : (
              <Box mt="2px" width="80%" maxW="900px" ml={10}>
                {latestFive.map((item) => (
                  <Flex
                    key={item.id}
                    align="center"
                    justify="space-between"
                    bgColor="transparent"
                    border="1px solid #605f5f37"
                    boxShadow="5px 5px 10px #605f5f37"
                    p={4}
                    mb={3}
                    borderRadius="md"
                    borderLeft={
                      item.outcome === "income"
                        ? "6px solid #1C4532"
                        : "6px solid #C53030"
                    }
                  >
                    <Box>
                      <Text fontWeight="bold" color="#1C4532">
                        {item.type}
                      </Text>
                      <Text fontSize="sm" color="gray.600" display="flex">
                        {new Date(item.date).toLocaleDateString("en-CA")} •
                        <Tooltip label={item.note} hasArrow>
                          <Text isTruncated maxW="160px" mx="auto">
                            {item.note || "-"}
                          </Text>
                        </Tooltip>
                      </Text>
                    </Box>

                    <Text
                      fontWeight="bold"
                      color={
                        item.outcome === "income" ? "green.500" : "red.500"
                      }
                      fontSize="lg"
                    >
                      {item.outcome === "income" ? "+ " : "- "}
                      {rupiahFormat.format(item.amount)}
                    </Text>
                  </Flex>
                ))}
              </Box>
            )}
          </>
        ) : (
          ""
        )}
      </Container>
    </>
  );
};
export default Transaction;
