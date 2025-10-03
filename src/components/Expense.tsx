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
  onSelectType: (tipe: Type) => void;
  selectedType: Type;
}

const Expense = ({ onSelectType, selectedType }: Props) => {
  const { data } = useType();
  const [inputValue, setInputValue] = useState<string>("");
  const Rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits:10
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    const numericValue = parseFloat(rawValue.replace(/[^0-9.-]/g, ""));

    if (isNaN(numericValue)) {
      setInputValue("");
    } else {
      setInputValue(Rupiah.format(numericValue));
    }
  };

  return (
    <>
      <Flex flexDirection="column">
        <Menu>
          <MenuButton
            _active={{ bgColor: "#878787ff" }}
            _hover={{ bgColor: "#878787ff" }}
            bgColor="#999ca2ff"
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
          <MenuList>
            {data.map((tipe) => (
              <MenuItem
                justifyContent="space-between"
                bgColor="#323439ff"
                key={tipe.id}
                onClick={() => onSelectType(tipe)}
                width="258px"
                pl={3}
              >
                {tipe.out}
                <Box>{tipe.emote}</Box>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>

        <Input
          width="260px"
          bgColor="#999ca2ff"
          type="text"
          value={inputValue}
          placeholder="Rp."
          onChange={handleChange}
        ></Input>
      </Flex>
    </>
  );
};

export default Expense;
