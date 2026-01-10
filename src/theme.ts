import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import type { Styles } from "@chakra-ui/theme-tools";
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const styles: Styles = {
  global: () => ({
    html: {
      height: "100%",
      overflow: "hidden",
    },
    body: {
      height: "100%",
      overflow: "hidden",
      bg: "#f2f2f6fa",
      fontFamily: "Inter",
      margin: 0,
    },
    "#__next, #root": {
      height: "100%",
      overflow: "hidden",
    },
  }),
};

const theme = extendTheme({ config, styles });

export default theme;
