import { Inter, Lato, Montserrat, Mulish, Poppins, Raleway, Roboto_Mono } from "next/font/google";
import "./globals.css";
import SessionWrapper from "./SessionWrapper";
import ReduxProvider from "./ReduxProvider";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})
const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap'
})
const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: '300'
})
 
const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
})
const mulish = Mulish({
  subsets: ['latin'],
  variable: '--font-mulish',
  display: 'swap'
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap'
})
const lato = Lato({
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap',
  weight: '300'
})
export const metadata = {
  title: "ChatMan",
  description: "AI Powered Chat App",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
    <html lang="en">
      <body className={`${inter.variable} ${roboto_mono.variable} ${raleway.variable} ${poppins.variable} ${mulish.variable} ${montserrat.variable} ${lato.variable}`}>
        <ReduxProvider>
        {children}
        </ReduxProvider>
        </body>
    </html>
    </SessionWrapper>
  );
}
