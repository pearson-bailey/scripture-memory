import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Footer, Header } from "@/src/components/layout";
import { createClient } from "@/utils/supabase/server";
import { UserContext } from "../components";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Scripture Memory",
  description: "Memorize Scripture with ease",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          <div className="flex-1 w-full flex flex-col items-center">
            <UserContext value={user}>
              <Header />
              <div className="animate-in flex-1 flex flex-col opacity-0 max-w-4xl px-3">
                <div className="flex-1 flex flex-col">{children}</div>
              </div>
              <Footer />
            </UserContext>
          </div>
        </main>
      </body>
    </html>
  );
}
