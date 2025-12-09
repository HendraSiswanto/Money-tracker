import {
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Icon,
} from "@chakra-ui/react";
import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";

type Props = {
  title: string;
  value: number;
  percent: string;
  iconColor: string;
  fontColor: string;
  icon: React.ElementType;
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
      p={5}
      bg="transparent"
      borderRadius="lg"
      shadow="md"
      w="300px"
    >
      <Stat>
        <Icon color={"gray"} boxSize={5} as={icon as React.ElementType} />
        <StatLabel fontSize="sm" color="gray.500">
          {title}
        </StatLabel>
        <StatNumber fontWeight="bold" color={fontColor}>
          Rp {value.toLocaleString("id-ID")}
        </StatNumber>
        <StatHelpText display="flex" alignItems="center" gap={1}>
          <Icon
            as={isNegative ? FiArrowDownRight : FiArrowUpRight}
            color={iconColor}
          />
          {percent} vs last 30 days
        </StatHelpText>
      </Stat>
    </Box>
  );
};
