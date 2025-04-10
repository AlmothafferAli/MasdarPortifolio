"use client";
import { Providers } from "./features/Provider";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import ThemeProvider from "./components/ThemeProvider";
import HeaderOverlay from "./components/HeaderOverlay";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="dark:bg-darkSecondary min-h-screen flex flex-col">
        <Providers>
          <ThemeProvider>
            <Header />
            <HeaderOverlay />
            <main className="flex-grow">{children}</main>
            <Footer />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
