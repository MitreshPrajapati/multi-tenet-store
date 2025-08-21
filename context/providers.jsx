"use client";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ThemeProvider } from "next-themes";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function NextThemeProvider({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
     
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
}
