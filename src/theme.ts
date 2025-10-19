import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import type { Styles } from "@chakra-ui/theme-tools";
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const styles: Styles = {
  global: () => ({
    body: {
      bg: "#f2f2f6fa",
      fontFamily: "Inter"
    },
  }),
};

const theme = extendTheme({ config, styles });

export default theme;
