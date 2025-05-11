import { toast } from "react-toastify";
import {
  useAddFAQMutation,
  useDeleteFAQMutation,
  useUpdateFAQMutation,
} from "../features/Api/FAQApi";
import { IFAQ } from "../features/Type/Interfaces";

export const useFAQ = () => {
  const [addFAQ, { isLoading: isAddingFAQ }] =
    useAddFAQMutation();
  const [updateFAQMutation, { isLoading: isUpdatingFAQ }] =
    useUpdateFAQMutation();
  const [deleteFAQMutation, { isLoading: isDeletingFAQ }] =
    useDeleteFAQMutation();
  const handleError = (error: any) => {
    console.table(error);
    toast.error(
      `${
        (error as { data?: { message?: string } }).data?.message ||
        "Failed to create employee"
      }`
    );
  };
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
    } catch (error) {
      handleError(error);
    }
  };
  const updateFAQ = async (FAQ: IFAQ, id: string) => {
    try {
      const response = await updateFAQMutation({ id, faq: FAQ }).unwrap();
      toast.success("FAQ updated successfully");
      return response;
    } catch (error) {
      console.table(error);
      handleError(error);
    }
  };
  const deleteFAQ = async (id: string) => {
    try {
      const response = await deleteFAQMutation(id).unwrap();
      toast.success("Employee deleted successfully");
      return response;
    } catch (error) {
      console.table(error);
      handleError(error);
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
