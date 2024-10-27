import localFont from "next/font/local";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/AntRegistry";
import { ClerkProvider } from "@clerk/nextjs";
import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "The Spice Rack",
  description:
    "Where being 'not normal' is the normal!, a social media platform to connect with like-minded individuals",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          <link rel="icon" type="image/png" href="/favicon.png" />
        </Head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </body>
      </html>
    </ClerkProvider>
  );
}
