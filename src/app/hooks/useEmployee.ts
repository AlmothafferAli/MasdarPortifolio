import { toast } from "react-toastify";
import {
  useAddEmployeeMutation,
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation,
} from "../features/Api/EmployeeApi";
import { useGetEmployeesQuery } from "../features/Api/EmployeeApi";
import { IEmployeeDto } from "../features/Type/Interfaces";

export const useEmployee = () => {
  const { data, isLoading, error } = useGetEmployeesQuery();
  const [addEmployee, { isLoading: isAddingEmployee }] =
    useAddEmployeeMutation();
  const [updateEmployeeMutation, { isLoading: isUpdatingEmployee }] =
    useUpdateEmployeeMutation();
  const [deleteEmployeeMutation, { isLoading: isDeletingEmployee }] =
    useDeleteEmployeeMutation();
  const handleError = (error: any) => {
    console.table(error);
    toast.error(
      `${
        (error as { data?: { message?: string } }).data?.message ||
        "Failed to create employee"
      }`
    );
  };
  const createEmployee = async (employee: IEmployeeDto) => {
    if (
      !employee.name ||
      !employee.description ||
      !employee.employeeRole ||
      !employee.employeeImage
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await addEmployee(employee).unwrap();
      toast.success("Employee created successfully");
    } catch (error) {
      handleError(error);
    }
  };
  const updateEmployee = async (employee: IEmployeeDto, id: string) => {
    try {
      const response = await updateEmployeeMutation({ employee, id }).unwrap();
      toast.success("Employee updated successfully");
      return response;
    } catch (error) {
      console.table(error);
      handleError(error);
    }
  };
  const deleteEmployee = async (id: string) => {
    try {
      const response = await deleteEmployeeMutation(id).unwrap();
      toast.success("Employee deleted successfully");
      return response;
    } catch (error) {
      console.table(error);
      handleError(error);
    }
  };

  return {
    data,
    isLoading,
    error,
    isAddingEmployee,
    createEmployee,
    isUpdatingEmployee,
    updateEmployee,
    isDeletingEmployee,
    deleteEmployee,
  };
};
