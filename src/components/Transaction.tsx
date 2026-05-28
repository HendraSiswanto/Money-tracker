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
import Expense from "./inputForms/Expense";
import { useEffect, useState } from "react";
import Income from "./inputForms/Income";
import { useTransactions } from "../hooks/useTransactions";
import BalanceCard from "./charts/UserCard";
import LineCard from "./charts/LineCard";
import useCategories from "../hooks/useCategories";
import TransactionSkeleton from "./skeleton/TransactionSkeleton";
import { playSound } from "../utils/sound";
import { supabase } from "../libs/supabase";
import { useNavigate } from "react-router-dom";

interface allDataIncome {
  id?: number;
  outcome: string;
  type: string;
  amount: number;
  date: string;
  note?: string;
  timestamp: number;

  categoryId: number;
}

const Transaction: React.FC = () => {
  const navigate = useNavigate();
  const {
    transactions,
    saveTransaction,
    isLoading,
    balance,
    totalExpense,
    totalIncome,
  } = useTransactions();
  const [selected, setSelected] = useState("income");
  const { categories } = useCategories();
  const [user, setUser] = useState<any>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const rupiahFormat = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  const handleSave = async (item: allDataIncome) => {
    await saveTransaction(
      {
        ...item,
        categoryId: item.categoryId,
      },
      item.outcome as "income" | "expense",
    );
    playSound(item.outcome as "income" | "expense");
  };

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        navigate("/login", { replace: true });
      } else {
        setUser(data.session.user);
      }
    };

    checkSession();
  }, [navigate]);


useEffect(() => {
  if (!isLoading && user) {
    const t = setTimeout(() => setHasLoaded(true), 150);
    return () => clearTimeout(t);
  }
}, [isLoading, user]);

  const latestFive = (transactions ?? []).slice(0, 5);
  const incomeCategories = categories.filter((c) => c.type === "income");
  const [show, setShow] = useState(false);
  const expenseCategories = categories.filter((c) => c.type === "expense");
  const isEmpty = transactions.length === 0 && !show;
  return (
    <>
      {!hasLoaded ? (
        <TransactionSkeleton />
      ) : (
        <Container
          display="flex"
         flexDirection="row"
          height="90vh"
          maxW="container.xl"
          mt={2}
          justifyContent={isEmpty ? "center" : "flex-start"}
          alignItems={isEmpty ? "center" : "flex-start"}
        >
          <Flex
            flex="1"
            justifyContent={isEmpty ? "center" : "flex-start"}
            alignItems={isEmpty ? "center" : "flex-start"}
          >
            <Flex
              flexDirection={isEmpty ? "row" : "column"}
              gap={6}
              align={isEmpty ? "center" : "flex-start"}
            >
              <BalanceCard
                balance={balance}
                totalIncome={totalIncome}
                totalExpense={totalExpense}
                userName={user?.user_metadata?.name || "User"}
                userImage="/assets/profile.png"
              ></BalanceCard>
              {transactions.length > 0 || show ? (
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
                      bgColor={
                        selected === "income" ? "#1C4532" : "transparent"
                      }
                      color={selected === "income" ? "white" : "#1C4532"}
                      _hover={{ bgColor: "#1c4532db", color: "white" }}
                      onClick={() => setSelected("income")}
                    >
                      Income 💰
                    </Button>

                    <Button
                      flex="1"
                      borderRadius="full"
                      bgColor={
                        selected === "expense" ? "#45241cff" : "transparent"
                      }
                      color={selected === "expense" ? "white" : "#45241cff"}
                      _hover={{ bgColor: "#45241cd4", color: "white" }}
                      onClick={() => setSelected("expense")}
                    >
                      Expense 💸
                    </Button>
                  </Box>
                  {selected === "income" ? (
                    <Income
                      categories={incomeCategories}
                      saveIncome={handleSave}
                    />
                  ) : (
                    <Expense
                      categories={expenseCategories}
                      saveExpense={handleSave}
                    />
                  )}
                </Card>
              ) : null}
            </Flex>
          </Flex>
          {transactions.length > 0 ? (
            <>
              <Box
                display="flex"
                flexDir="column"
                mt="2px"
                width="80%"
                maxW="900px"
                ml={10}
              >
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  color="gray.600"
                  borderBottom="1px"
                  mb={1}
                >
                  RECENTS TRANSACTIONS
                </Text>

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
                        : "6px solid #45241cff"
                    }
                  >
                    <Box>
                      <Text fontWeight="bold" color="#1C4532">
                        {item.type}
                      </Text>
                      <Box fontSize="sm" color="gray.600" display="flex">
                        {new Date(item.date).toLocaleDateString("en-CA")} •
                        <Tooltip label={item.note} hasArrow>
                          <Text isTruncated maxW="160px" mx="auto" ml={1}>
                            {item.note || "No Note"}
                          </Text>
                        </Tooltip>
                      </Box>
                    </Box>

                    <Text
                      fontWeight="bold"
                      color={
                        item.outcome === "income" ? "#1C4532" : "#45241cff"
                      }
                      fontSize="lg"
                    >
                      {item.outcome === "income" ? "+ " : "- "}
                      {rupiahFormat.format(item.amount)}
                    </Text>
                  </Flex>
                ))}
                <LineCard></LineCard>
              </Box>
            </>
          ) : (
            <>
              {show === false ? (
                <Flex
                  alignContent="center"
                  flexDir="column"
                  p={16}
                  textAlign="center"
                  bgColor="transparent"
                  border="1px solid #605f5f37"
                  boxShadow="5px 5px 10px #605f5f37"
                  borderColor="gray.300"
                  borderRadius="xl"
                  mx="auto"
                >
                  <Heading size="md" color="#1C4532" mb={2}>
                    Start tracking your money 💸
                  </Heading>

                  <Text color="gray.600" mb={6}>
                    Track income & expenses to see your balance, trends, and
                    insights.
                  </Text>

                  <Flex justify="center" gap={4} mb={6} wrap="wrap">
                    <Box fontSize="sm" color="gray.600">
                      ① Choose type
                    </Box>
                    <Box fontSize="sm" color="gray.600">
                      ② Pick category
                    </Box>
                    <Box fontSize="sm" color="gray.600">
                      ③ Save & analyze
                    </Box>
                  </Flex>

                  <Flex gap={4} justify="center">
                    <Card
                      p={4}
                      cursor="pointer"
                      border="1px solid #1C4532"
                      _hover={{ bg: "#1C4532", color: "white" }}
                      onClick={() => {
                        setSelected("income");
                        setShow(true);
                      }}
                    >
                      <Text fontWeight="bold">+ Add Income</Text>
                      <Text fontSize="sm">Salary, bonus, etc</Text>
                    </Card>

                    <Card
                      p={4}
                      cursor="pointer"
                      border="1px solid #45241cff"
                      _hover={{ bg: "#45241cff", color: "white" }}
                      onClick={() => {
                        setSelected("expense");
                        setShow(true);
                      }}
                    >
                      <Text fontWeight="bold">− Add Expense</Text>
                      <Text fontSize="sm">Food, bills, etc</Text>
                    </Card>
                  </Flex>
                  <Text mt={6} fontSize="sm" color="gray.500">
                    You already have <b>{incomeCategories.length}</b> income and{" "}
                    <b>{expenseCategories.length}</b> expense categories
                  </Text>
                </Flex>
              ) : null}
            </>
          )}
        </Container>
      )}
    </>
  );
};
export default Transaction;
