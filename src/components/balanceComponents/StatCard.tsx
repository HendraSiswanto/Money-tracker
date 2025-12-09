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
    onClick?: () => void;
};

export const StatCard = ({
  title,
  value,
  percent,
  iconColor,
  fontColor,
  icon,
}: Props) => {
  const isNegative = percent.includes("-");

  return (
    <Box
      mt={8}
      mb={4}
      p={7}
      bg="transparent"
      borderRadius="lg"
      border="1px solid #605f5f37"
      boxShadow="5px 5px 10px #605f5f37"
      w="270px"
    >
      <Stat>
        <Icon
          bgColor="#e4e4e7c3"
          borderRadius="full"
          p={2}
          color={fontColor}
          boxSize="60px"
          as={icon as React.ElementType}
        />
        <StatLabel fontSize="sm" color="gray.500">
          {title}
        </StatLabel>
        <StatNumber fontWeight="bold" color={fontColor}>
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
          {percent}% 
          <Text color="gray.600">vs last 30 days</Text>
        </StatHelpText>
      </Stat>
    </Box>
  );
};
