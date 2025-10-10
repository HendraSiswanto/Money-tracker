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
import type { TypeIncome } from "../hooks/useIncome";
import useType from "../hooks/useIncome";
import { useState } from "react";

interface Props {
  onSelectType: (dataIncome: TypeIncome) => void;
  selectedType: TypeIncome;
}

const Expense = ({ onSelectType, selectedType }: Props) => {
  const { data } = useType();
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [inputNote, setInputNote] = useState("");
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
  const handleNote = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputNote(e.target.value);
  };

  return (
    <>
      <Flex flexDirection="column" gap={2}>
        <Menu>
          <MenuButton
            _active={{ bgColor: "#1c4532db" }}
            _hover={{ bgColor: "#1c4532db" }}
            bgColor="#1C4532"
            as={Button}
            width="260px"
          >
            <Box display="flex" justifyContent="space-between">
              {selectedType?.in || "Select Type Of Income"}{" "}
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
          <MenuList bg="#1C4532">
            {data.map((dataIncome) => (
              <MenuItem
                _hover={{ bgColor: "#94b0a3db" }}
                justifyContent="space-between"
                bg="#1C4532"
                key={dataIncome.id}
                onClick={() => onSelectType(dataIncome)}
                width="258px"
                pl={3}
              >
                {dataIncome.in}
                <Box>{dataIncome.emote}</Box>
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
            color={value ? "black" : "#615e5e4a"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            sx={{
              "::-webkit-calendar-picker-indicator": {
                color: "#615e5e4a",
                filter:
                  "invert(40%) sepia(10%) saturate(200%) hue-rotate(0deg) brightness(90%)",
                cursor: "pointer",
              },
            }}
            _hover={{ borderColor: "#969696ff" }}
            _focus={{
              outline: "none",
              borderColor: "#9ecaed",
              boxShadow: "0 0 10px #9ecaed",
            }}
          ></Input>
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
            value={inputNote}
            placeholder="Note"
            _placeholder={{ color: "#615e5e4a" }}
            onChange={handleNote}
          ></Input>
        </Box>
      </Flex>
    </>
  );
};

export default Expense;
