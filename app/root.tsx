import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from "./tailwind.css";
import Header from "./components/Header";


export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = () => [
  { title: "Welcome to the Lab - Mike Vautour" },
  { charSet: "utf-8" },
  { name: "viewport", content: "width=device-width, initial-scale=1" },
];

import { ThemeProvider, useTheme } from "./utils/theme-provider";


function AppEntry(){ 
  const [theme] = useTheme()
  
  return (
      <html lang="en" className={theme? theme : 'light'}>
      <head>
        <Meta />
        <Links />
      </head>
      <body className="p-0 m-0 min-h-screen flex flex-col bg-light dark:bg-dark text-dark dark:text-light">
        <Header />
        <main className="px-3 w-full py-16 md:py-16 lg:py-6">
          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppEntry />
    </ThemeProvider>
  )
}