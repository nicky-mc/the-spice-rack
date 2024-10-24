import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Home from "./page"; // Import your Home page
import "./globals.css";
import localFont from "next/font/local";

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
    "Social Media on a Spicy Level (don't be naughty! not like that!)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <SignedIn>
            <div className="flex justify-end p-4">
              <UserButton />
            </div>
            {children}
          </SignedIn>
          <SignedOut>
            <Home />
          </SignedOut>
        </body>
      </html>
    </ClerkProvider>
  );
}
