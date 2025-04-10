import { toast } from "react-toastify";
import { useLoginUserMutation, useRegisterUserMutation } from "../features/Api/UserApi";
import { IAuthResponse, ILoginRequest, IRegisterRequest } from "../features/Type/Interfaces";
import { useRouter } from "next/navigation";

export default function useAuth() {
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const [registerUser] = useRegisterUserMutation();
  const router = useRouter();
  const login = async (credentials: ILoginRequest): Promise<IAuthResponse | void> => {
    try {
     const response = await loginUser(credentials).unwrap(); 
     localStorage.setItem("token", response.token);
     toast.success("تم تسجيل الدخول بنجاح");
     return response; 
    } catch (err) {
      toast.error((err as { data?: { message?: string } }).data?.message || "فشل تسجيل الدخول. يرجى المحاولة مرة أخرى");
    }
  
  }

   const signUp = async (credentials: IRegisterRequest): Promise<IAuthResponse | void> => {
     try{
      const response = await registerUser(credentials).unwrap();
      localStorage.setItem("token", response.token);
      toast.success("تم انشاء الحساب بنجاح");
    router.push("/");      
      return response;
     }catch(err){
      console.table(err);
      toast.error((err as { data?: { message?: string } }).data?.message || "فشل تسجيل الدخول. يرجى المحاولة مرة أخرى");
    
    }
   }
  return { login, signUp, isLoading, error };
}