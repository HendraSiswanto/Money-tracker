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
import { useState, useRef } from "react";
import type { Category } from "../types/CategoryTypes";

interface Props {
  categories: Category[];

  saveIncome: (
    data: {
      outcome: string;
      type: string;
      amount: number;
      date: string;
      note: string;
      timestamp: number;
      categoryId: number;
    },
    typeData: "income" | "expense"
  ) => void;
}

const Income = ({ saveIncome, categories }: Props) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  const [rawAmount, setRawAmount] = useState<bigint>();
  const dateRef = useRef<HTMLInputElement | null>(null);
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
    setRawAmount(numeric);
    setInputValue(raw ? Rupiah(numeric) : "");
  };
  const handleNote = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputNote(e.target.value);
  };
  const handleReset = () => {
    setValue("");
    setInputValue("");
    setInputNote("");
  };

  const handleSaveIncome = async () => {
    const selectedCategory = categories.find(
      (c) => c.id === selectedCategoryId
    )!;

    if (!selectedCategoryId) {
      console.log("NO CATEGORY");
      return;
    }

    if (!rawAmount || rawAmount <= 0n) {
      console.log("INVALID AMOUNT");
      return;
    }

    const payload = {
      outcome: "income",
      type: selectedCategory.name,
      amount: Number(rawAmount),
      date: value,
      note: inputNote,
      timestamp: Date.now(),
      categoryId: selectedCategoryId,
    };

    console.log("SENDING:", payload);

    await saveIncome(payload, "income");
    handleReset();
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
            color="white"
          >
            <Box display="flex" justifyContent="space-between">
              {selectedCategoryId
                ? categories.find((c) => c.id === selectedCategoryId)?.name
                : "Select Type Of Income"}
              <Box>
                {categories.find((c) => c.id === selectedCategoryId)?.emote || (
                  <Icon
                    boxSize={5}
                    as={BsArrowDownCircleFill as React.ElementType}
                  />
                )}
              </Box>
            </Box>
          </MenuButton>
          <MenuList color="white" bg="#1C4532">
            {categories.map((cat) => (
              <MenuItem
                _hover={{ bgColor: "#94b0a3db" }}
                justifyContent="space-between"
                bg="#1C4532"
                key={cat.id}
                onClick={() => setSelectedCategoryId(cat.id)}
                width="258px"
                pl={3}
              >
                {cat.name}
                <Box>{cat.emote}</Box>
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
          <Box onClick={() => dateRef.current?.showPicker?.()}>
            <Input
              cursor="pointer"
              ref={dateRef}
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
          </Box>
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

          <Box display="flex" justifyContent="center" gap={3}>
            <Button
              color="white"
              bgColor="#45241cff"
              _hover={{ bgColor: "#45241cd4" }}
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              color="white"
              bgColor="#1C4532"
              _hover={{ bgColor: "#1c4532db" }}
              isDisabled={!selectedCategoryId || !inputValue || !value}
              onClick={handleSaveIncome}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default Income;
