import { toast } from "react-toastify";

export const handleError = (error: { data?: { message?: string } }) => {
    console.table(error);
    toast.error(
      `${
        error.data?.message ||
        "Failed to create employee"
      }`
    );
  };
  