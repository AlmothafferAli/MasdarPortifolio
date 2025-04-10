import { Providers } from "@/app/features/Provider";
import store from "@/app/features/Store"; // <-- Update path based on your structure
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <ToastContainer />
        
        <Providers>{children}</Providers>
      </div>
    </>
  );
}
