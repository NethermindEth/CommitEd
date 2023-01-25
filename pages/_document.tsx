import { ColorModeScript, ColorModeScriptProps } from "@chakra-ui/react";
import { Html, Head, Main, NextScript } from "next/document";
import theme from "../theme";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        {/* 👇 Here's the script */}
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
