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
      <Box display="flex" justifyContent="center" mt={7}>
        <Box display="flex" justifyContent="space-between" width="1100px">
          <Button px="70px" bgColor="#6c6d6dff">
            Balance Transaction
          </Button>
          <Button      
            px="70px"
            bgColor="#1C4532"
            _active={{ bgColor: "#1c4532db" }}
            _hover={{ bgColor: "#1c4532db" }}
          >
            Income Transaction
          </Button>
          <Button
            px="70px"
            bgColor="#45241cff"
            _active={{ bgColor: "#45241cd4" }}
            _hover={{ bgColor: "#45241cd4" }}
          >
            Expense Transaction
          </Button>
        </Box>
      </Box>
      {allDataIncome.length > 0 && (
        <Box display="flex" justifyContent="center" mt={6}>
          <Table size="md" variant="simple" width="container.xl">
            <Thead>
              <Th
                textAlign="center"
                width="15px"
                border="2px solid #1C4532"
                color="#1C4532"
              >
                Income
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
    </>
  );
};

export default Transaction;
