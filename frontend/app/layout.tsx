import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { ChakraProviders, SessionProviders } from "./providers";


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className="bg-white">
        <SessionProviders session={session}>
          <ChakraProviders>{children}</ChakraProviders>
        </SessionProviders>
      </body>
    </html>
  );
}
