import { toast } from "react-toastify";
import {
  useAddEmployeeMutation,
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation,
} from "../features/Api/EmployeeApi";
import { useGetEmployeesQuery } from "../features/Api/EmployeeApi";
import { IEmployeeDto } from "../features/Type/Interfaces";
import { handleError } from "./useHandleError";

export const useEmployee = () => {
  const { data, isLoading, error } = useGetEmployeesQuery({pageNumber:1,pageSize:10});
  const [addEmployee, { isLoading: isAddingEmployee }] =
    useAddEmployeeMutation();
  const [updateEmployeeMutation, { isLoading: isUpdatingEmployee }] =
    useUpdateEmployeeMutation();
  const [deleteEmployeeMutation, { isLoading: isDeletingEmployee }] =
    useDeleteEmployeeMutation();

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
    } catch (error: unknown) {
      handleError(error as { data?: { message?: string } });
    }
  };
  const updateEmployee = async (employee: IEmployeeDto, id: string) => {
    try {
      const response = await updateEmployeeMutation({ employee, id }).unwrap();
      toast.success("Employee updated successfully");
      return response;
    } catch (error) {
      console.table(error);
      handleError(error as { data?: { message?: string } });
    }
  };
  const deleteEmployee = async (id: string) => {
    try {
      const response = await deleteEmployeeMutation(id).unwrap();
      toast.success("Employee deleted successfully");
      return response;
    } catch (error) {
      console.table(error);
      handleError(error as { data?: { message?: string } });
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
