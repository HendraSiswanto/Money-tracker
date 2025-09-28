import {
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
  onSelectType: (tipe: Type) =>void;
  selectedType: Type | null;
}


const Expense = ({onSelectType,selectedType}: Props) => {
  const {data} = useType()
  
  return (
    <>
      <Menu>
        <MenuButton
          bgColor="#43464cff"
          as={Button}
          rightIcon={
            <Icon boxSize={5} as={BsArrowDownCircleFill as React.ElementType} />
          }
        >
          {selectedType?.out || "tes"}
        </MenuButton>
        <MenuList>
          {data.map((tipe) => (
            <MenuItem key={tipe.id} onClick={() => onSelectType(tipe)}>
              {tipe.out}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
};

export default Expense;
