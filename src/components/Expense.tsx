import {
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsArrowDownCircleFill } from "react-icons/bs";

const Expense = () => {
  const [type, setType] = useState([
    { out: "Utilities", money: 0 },
    { out: "Transport", money: 0 },
    { out: "Food", money: 0 },
    { out: "Sport", money: 0 },
    { out: "Entertainment", money: 0 },
  ]);


  return (
  
    <>

    <Menu>
      <MenuButton
        bgColor="#43464cff"
        as={Button}
        rightIcon={<Icon boxSize={5} as={BsArrowDownCircleFill as React.ElementType} />}
      >{  }</MenuButton>
      <MenuList>
        {type.map((type) => (
          <MenuItem value={type.out}>{type.out}</MenuItem>
        ))}
      </MenuList>
    </Menu>
    </>
  );
};

export default Expense;
