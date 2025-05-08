import { Providers } from "./features/Provider";
import "./globals.css";
import ThemeProvider from "./components/ThemeProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClientLayout from "./components/ClientLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar">
      <body className="dark:bg-darkSecondary font-body min-h-screen flex flex-col">
        <Providers>
          <ThemeProvider>
            <ClientLayout>{children}</ClientLayout>
            <ToastContainer />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
