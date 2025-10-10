import { Box, Button, Card, Heading } from "@chakra-ui/react";
import Expense from "./Expense";
import { useState } from "react";
import type { TypeExpense } from "../hooks/useExpense";
import type { TypeIncome } from "../hooks/useIncome";

import Income from "./Income";
interface Props {
  dataExpense: TypeExpense;
  dataIncome: TypeIncome;
}

const Transaction = () => {
  const [changeTipe, setTipe] = useState<Props>({} as Props);
  const [selected,setSelected] = useState('income')

  return (
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
          onClick={() => setSelected('income')}
        >
          Income 💰
        </Button>

        <Button
          mr="110px"
          px="70px"
          bgColor="#45241cff"
          _active={{ bgColor: "#45241cd4" }}
          _hover={{ bgColor: "#45241cd4" }}
          onClick={()=> setSelected('expense')}
        >
          Expense 💸
        </Button>
      </Box>

      {selected === 'income' ?
      <Income selectedType={changeTipe.dataIncome}
        onSelectType={(dataIncome) => setTipe({ ...changeTipe, dataIncome })} />
     : <Expense
        selectedType={changeTipe.dataExpense}
        onSelectType={(dataExpense) => setTipe({ ...changeTipe, dataExpense })}
      />}
    </Card>
  );
};

export default Transaction;
