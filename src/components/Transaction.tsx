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
} from "@chakra-ui/react";
import Expense from "./Expense";
import { useState } from "react";
import type { TypeExpense } from "../hooks/useExpense";
import type { TypeIncome } from "../hooks/useIncome";

import Income from "./Income";
interface Props {
  dataExpense: TypeExpense;
  dataIncome: TypeIncome;
}
interface allDataIncome {
  outcome: string;
  type: string;
  amount: string;
  date: string;
  note: string;
}
type allDataExpense = allDataIncome;

const Transaction: React.FC = () => {
  const [changeTipe, setTipe] = useState<Props>({} as Props);
  const [selected, setSelected] = useState("income");
  const [check, setCheck] = useState("");
  const [allDataIncome, setAllDataIncome] = useState<allDataIncome[]>([]);
  const [allDataExpense, setAllDataExpense] = useState<allDataExpense[]>([]);
  const [sumIncome, setSumIncome] = useState<number>(0);
  const [sumExpense, setSumExpense] = useState<number>(0);
  const rupiahFormat = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  const handleSave = (
    newData: allDataIncome,
    typeData: "income" | "expense"
  ) => {
    const setData =
      typeData === "income" ? setAllDataIncome : setAllDataExpense;
    const setSum = typeData === "income" ? setSumIncome : setSumExpense;

    setData((prev) => {
      const cleanNewAmount = parseFloat(
        newData.amount
          .replace(/\./g, "")
          .replace(/,/g, "")
          .replace(/[^\d.-]/g, "")
      );
      const prevSum = prev.reduce((acc, item) => {
        const cleanPrev = parseFloat(
          item.amount
            .replace(/\./g, "")
            .replace(/,/g, "")
            .replace(/[^\d.-]/g, "")
        );
        return acc + cleanPrev;
      }, 0);
      const newTotal = prevSum + cleanNewAmount;

      setSum(newTotal);
      return [...prev, newData];
    });
  };

  const balance = sumIncome - sumExpense
  return (
    <>
      <Card
        ml={2}
        width="fit-content"
        mt={10}
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
            saveIncome={(data) => handleSave(data, "income")}
          />
        ) : (
          <Expense
            selectedType={changeTipe.dataExpense}
            onSelectType={(dataExpense) =>
              setTipe({ ...changeTipe, dataExpense })
            }
            saveExpense={(data) => handleSave(data, "expense")}
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
          <Box display="flex" justifyContent="center" mt={6} mb={6}>
            <Table size="md" variant="simple" width="container.xl">
              <Thead>
                <Th
                  textAlign="center"
                  width="15px"
                  border="2px solid #1C4532"
                  color="#1C4532"
                >
                  Income/Expense
                </Th>
                <Th
                  textAlign="center"
                  border="2px solid #1C4532"
                  color="#1C4532"
                >
                  Type
                </Th>
                <Th
                  textAlign="center"
                  border="2px solid #1C4532"
                  color="#1C4532"
                >
                  Date
                </Th>
                <Th
                  textAlign="center"
                  border="2px solid #1C4532"
                  color="#1C4532"
                >
                  Note
                </Th>
                <Th
                  textAlign="center"
                  border="2px solid #1C4532"
                  color="#1C4532"
                >
                  Amount
                </Th>
              </Thead>
              <Tbody>
                {allDataIncome.map((allDataIncome, index) => (
                  <>
                    <Tr key={index}>
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
                        {allDataIncome.date}
                      </Td>
                      <Td
                        textAlign="center"
                        border="2px solid #1C4532"
                        color="#1C4532"
                        wordBreak="break-word"
                        textOverflow="ellipsis"
                      >
                        {allDataIncome.note || "-"}
                      </Td>
                      <Td
                        textAlign="center"
                        border="2px solid #1C4532"
                        color="#1C4532"
                      >
                        {allDataIncome.amount}
                      </Td>
                    </Tr>
                  </>
                ))}
                {allDataExpense.map((allDataExpense, index) => (
                  <>
                    <Tr key={index}>
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
                        {allDataExpense.date}
                      </Td>
                      <Td
                        textAlign="center"
                        border="2px solid #1C4532"
                        color="#1C4532"
                        wordBreak="break-word"
                        textOverflow="ellipsis"
                      >
                        {allDataExpense.note || "-"}
                      </Td>
                      <Td
                        textAlign="center"
                        border="2px solid #1C4532"
                        color="#1C4532"
                      >
                        {allDataExpense.amount}
                      </Td>
                    </Tr>
                  </>
                ))}
              </Tbody>

              <Tfoot>
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
              </Tfoot>
            </Table>
          </Box>
        )}
      {allDataIncome.length > 0 && check === "income" && (
        <Box display="flex" justifyContent="center" mt={6} mb={6}>
          <Table size="md" variant="simple" width="container.xl">
            <Thead>
              <Th
                textAlign="center"
                width="15px"
                border="2px solid #1C4532"
                color="#1C4532"
              >
                Income/Expense
              </Th>
              <Th textAlign="center" border="2px solid #1C4532" color="#1C4532">
                Type
              </Th>
              <Th textAlign="center" border="2px solid #1C4532" color="#1C4532">
                Date
              </Th>
              <Th textAlign="center" border="2px solid #1C4532" color="#1C4532">
                Note
              </Th>
              <Th textAlign="center" border="2px solid #1C4532" color="#1C4532">
                Amount
              </Th>
            </Thead>
            <Tbody>
              {allDataIncome.map((allDataIncome, index) => (
                <>
                  <Tr key={index}>
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
                      {allDataIncome.date}
                    </Td>
                    <Td
                      textAlign="center"
                      border="2px solid #1C4532"
                      color="#1C4532"
                      wordBreak="break-word"
                      textOverflow="ellipsis"
                    >
                      {allDataIncome.note || "-"}
                    </Td>
                    <Td
                      textAlign="center"
                      border="2px solid #1C4532"
                      color="#1C4532"
                    >
                      {allDataIncome.amount}
                    </Td>
                  </Tr>
                </>
              ))}
            </Tbody>

            <Tfoot>
              <Td
                colSpan={4}
                textAlign="right"
                border="2px solid #1C4532"
                color="#1C4532"
                fontWeight="bold"
              >
                Total
              </Td>
              <Td textAlign="center" border="2px solid #1C4532" color="#1C4532">
                {rupiahFormat.format(sumIncome)}
              </Td>
            </Tfoot>
          </Table>
        </Box>
      )}
      {allDataExpense.length > 0 && check === "expense" && (
        <Box display="flex" justifyContent="center" mt={6}mb={6}>
          <Table size="md" variant="simple" width="container.xl">
            <Thead>
              <Th
                textAlign="center"
                width="15px"
                border="2px solid #1C4532"
                color="#1C4532"
              >
                Income/Expense
              </Th>
              <Th textAlign="center" border="2px solid #1C4532" color="#1C4532">
                Type
              </Th>
              <Th textAlign="center" border="2px solid #1C4532" color="#1C4532">
                Date
              </Th>
              <Th textAlign="center" border="2px solid #1C4532" color="#1C4532">
                Note
              </Th>
              <Th textAlign="center" border="2px solid #1C4532" color="#1C4532">
                Amount
              </Th>
            </Thead>
            <Tbody>
              {allDataExpense.map((allDataExpense, index) => (
                <>
                  <Tr key={index}>
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
                      {allDataExpense.date}
                    </Td>
                    <Td
                      textAlign="center"
                      border="2px solid #1C4532"
                      color="#1C4532"
                      wordBreak="break-word"
                      textOverflow="ellipsis"
                    >
                      {allDataExpense.note || "-"}
                    </Td>
                    <Td
                      textAlign="center"
                      border="2px solid #1C4532"
                      color="#1C4532"
                    >
                      {allDataExpense.amount}
                    </Td>
                  </Tr>
                </>
              ))}
            </Tbody>

            <Tfoot>
              <Td
                colSpan={4}
                textAlign="right"
                border="2px solid #1C4532"
                color="#1C4532"
                fontWeight="bold"
              >
                Total
              </Td>
              <Td textAlign="center" border="2px solid #1C4532" color="#1C4532">
                {rupiahFormat.format(sumExpense)}
              </Td>
            </Tfoot>
          </Table>
        </Box>
      )}
    </>
  );
};

export default Transaction;
