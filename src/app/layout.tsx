import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Footer, Header } from "@/src/components/layout";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          <div className="flex-1 w-full flex flex-col items-center">
            <Header />
            <div className="animate-in flex-1 flex flex-col opacity-0 max-w-4xl px-3">
              <main className="flex-1 flex flex-col">{children}</main>
            </div>
            <Footer />
          </div>
        </main>
      </body>
    </html>
  );
}
