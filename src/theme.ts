import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import type { Styles } from "@chakra-ui/theme-tools";
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const styles: Styles = {
  global: {
    body: {
      bg: "#f2f2f6fa",
      fontFamily: "Inter",
      margin: 0,
    },
  },
};
const theme = extendTheme({ config, styles });

export default theme;
