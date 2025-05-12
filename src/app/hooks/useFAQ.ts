import { toast } from "react-toastify";
import {
  useAddFAQMutation,
  useDeleteFAQMutation,
  useUpdateFAQMutation,
} from "../features/Api/FAQApi";
import { IFAQ } from "../features/Type/Interfaces";
import { handleError } from "./useHandleError";

export const useFAQ = () => {
  const [addFAQ, { isLoading: isAddingFAQ }] =
    useAddFAQMutation();
  const [updateFAQMutation, { isLoading: isUpdatingFAQ }] =
    useUpdateFAQMutation();
  const [deleteFAQMutation, { isLoading: isDeletingFAQ }] =
    useDeleteFAQMutation();
  const createFAQ = async (FAQ: IFAQ) => {
    if (
      !FAQ.question ||
      !FAQ.answer
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await addFAQ(FAQ).unwrap();
      toast.success("FAQ created successfully");
    } catch (error: unknown) {
      handleError(error as { data?: { message?: string } });
    }
  };
  const updateFAQ = async (FAQ: IFAQ, id: string) => {
    try {
      const response = await updateFAQMutation({ id, faq: FAQ }).unwrap();
      toast.success("FAQ updated successfully");
      return response;
    } catch (error: unknown) {
      console.table(error);
      handleError(error as { data?: { message?: string } });
    }
  };
  const deleteFAQ = async (id: string) => {
    try {
      const response = await deleteFAQMutation(id).unwrap();
      toast.success("Employee deleted successfully");
      return response;
    } catch (error: unknown) {
      console.table(error);
      handleError(error as { data?: { message?: string } });
    }
  };

  return {
    isAddingFAQ,
    createFAQ,
    isUpdatingFAQ,
    updateFAQ,
    isDeletingFAQ,
    deleteFAQ,
  };
};
