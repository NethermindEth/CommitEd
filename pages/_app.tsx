import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import theme from "../theme";

const UITheme = extendTheme(theme);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={UITheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
