

import { IAuthResponse, ILoginRequest, IRegisterRequest } from '../features/Type/Interfaces';




  // Auth
  export interface UseAuthReturn {
    login: (credentials: ILoginRequest) => Promise<IAuthResponse | void>;
    register: (form: IRegisterRequest) => Promise<IAuthResponse | void>;
    admin: (form: IRegisterRequest) => Promise<IAuthResponse | void>;
    isLoading: boolean;
    error: string;
  }


  // Notification



// User

