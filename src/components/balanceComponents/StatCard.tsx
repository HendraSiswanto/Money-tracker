import {
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Icon,
  Text,
} from "@chakra-ui/react";
import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";

type Props = {
  title: string;
  value: number;
  percent: string;
  iconColor: string;
  fontColor: string;
  icon: React.ElementType;
  active?: boolean;
  onClick?: () => void;
  activeColor?: string;
};

export const StatCard = ({
  title,
  value,
  percent,
  iconColor,
  fontColor,
  icon,
  active = false,
  onClick,
  activeColor = "rgba(0,0,0,0.05)",
}: Props) => {
  const isNegative = percent.includes("-");

  return (
    <Box
      h="100%"
      w="100%"
      p={7}
      transform={active ? "scale(1.02)" : "scale(1)"}
      transition="all 0.15s ease"
      bg={active ? activeColor : "transparent"}
      borderRadius="lg"
      border={active ? "2px solid #1C4532" : "1px solid #605f5f37"}
      boxShadow={active ? "0 0 12px #1C453260" : "5px 5px 10px #605f5f37"}
      onClick={onClick}
      cursor="pointer"
    >
      <Stat>
        <Icon
          bgColor={active ? fontColor : "#e4e4e7c3"}
          borderRadius="full"
          p={2}
          color={active ? "white" : fontColor}
          boxSize="60px"
          as={icon as React.ElementType}
        />
        <StatLabel fontSize="sm" fontWeight="bold" color="gray.600">
          {title}
        </StatLabel>
        <StatNumber fontWeight="semibold" color={fontColor}>
          Rp {value.toLocaleString("id-ID")}
        </StatNumber>
        <StatHelpText
          display="flex"
          alignItems="center"
          gap={2}
          color={iconColor}
          fontWeight="bold"
        >
          <Icon
            as={isNegative ? FiArrowDownRight : FiArrowUpRight}
            color={iconColor}
          />
          {percent}%<Text color="gray.600">vs last 30 days</Text>
        </StatHelpText>
      </Stat>
    </Box>
  );
};
