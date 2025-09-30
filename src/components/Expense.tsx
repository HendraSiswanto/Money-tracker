import {
  Box,
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { BsArrowDownCircleFill } from "react-icons/bs";
import type { Type } from "../hooks/useType";
import useType from "../hooks/useType";

interface Props {
  onSelectType: (tipe: Type) => void;
  selectedType: Type ;
}

const Expense = ({ onSelectType, selectedType }: Props) => {
  const { data } = useType();

  return (
    <>
      <Menu>
        <MenuButton
          _active={{ bgColor: "#323439ff" }}
          _hover={{ bgColor: "#323439ff" }}
          bgColor="#43464cff"
          as={Button}
          rightIcon={
            <Icon boxSize={5} as={BsArrowDownCircleFill as React.ElementType} />
          }
          width="260px"
        >
          <Box display="flex">{selectedType?.out + selectedType?.emote|| "Select Type Of Expense"}</Box>
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
    </>
  );
};

export default Expense;
