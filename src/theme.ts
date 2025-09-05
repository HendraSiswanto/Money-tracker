import {extendTheme, type ThemeConfig } from "@chakra-ui/react";
import type {Styles} from "@chakra-ui/theme-tools"
const config: ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: true
}

const styles : Styles ={
    global: () =>({
        body:{
            bg:'#1C4532'
        }
    })
}

const theme = extendTheme({config,styles})

export default theme