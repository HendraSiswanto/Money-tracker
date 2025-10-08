import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { BsArrowDownCircleFill } from "react-icons/bs";
import type { Type } from "../hooks/useType";
import useType from "../hooks/useType";
import { useState } from "react";

interface Props {
  onSelectType: (dataExpense: Type) => void;
  selectedType: Type;
}

const Expense = ({ onSelectType, selectedType }: Props) => {
  const { data } = useType();
  const [inputValue, setInputValue] = useState("");

  function Rupiah(num: bigint): string {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    const numeric = raw ? BigInt(raw) : BigInt(0);
    setInputValue(raw ? Rupiah(numeric) : "");
  };

  return (
    <>
      <Flex flexDirection="column" gap={2}>
        <Menu>
          <MenuButton
            _active={{ bgColor: "#45241cd4" }}
            _hover={{ bgColor: "#45241cd4" }}
            bgColor="#45241cff"
            as={Button}
            width="260px"
          >
            <Box display="flex" justifyContent="space-between">
              {selectedType?.out || "Select Type Of Expense"}{" "}
              <Box>
                {selectedType?.emote || (
                  <Icon
                    boxSize={5}
                    as={BsArrowDownCircleFill as React.ElementType}
                  />
                )}
              </Box>
            </Box>
          </MenuButton>
          <MenuList bg="#45241cff">
            {data.map((dataExpense) => (
              <MenuItem
                justifyContent="space-between"
                bg="#45241cd4"
                key={dataExpense.id}
                onClick={() => onSelectType(dataExpense)}
                width="258px"
                pl={3}
              >
                {dataExpense.out}
                <Box>{dataExpense.emote}</Box>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>

        <Box
          mb={5}
          width="fit-content"
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <Input
            width="260px"
            bgColor="transparent"
            color="black"
            border="0.5px solid #969696ff"
            type="text"
            _focus={{
              outline: "none",
              borderColor: "#9ecaed",
              boxShadow: "0 0 10px #9ecaed",
            }}
            _hover={{ borderColor: "#b0adadff" }}
            value={inputValue}
            placeholder="Rp."
            _placeholder={{ color: "#615e5e4a" }}
            onChange={handleChange}
          ></Input>
          <Input
          className="dateInput"
            type="date"
            border="0.5px solid #969696ff"
            width="-moz-fit-content"
            placeholder="DD-MM-YYYY"
            color="#101010"

          ></Input>
        </Box>
      </Flex>
    </>
  );
};

export default Expense;
