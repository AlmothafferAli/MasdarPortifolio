

import { IAuthResponse, ICompanyRequest, ICompanyResponse, ILoginRequest, IRegisterRequest } from '../features/Type/Interfaces';




  // Auth
  export interface UseAuthReturn {
    login: (credentials: ILoginRequest) => Promise<IAuthResponse | void>;
    register: (form: IRegisterRequest) => Promise<IAuthResponse | void>;
    admin: (form: IRegisterRequest) => Promise<IAuthResponse | void>;
    isLoading: boolean;
    error: string;
  }

  export interface UseCompanyReturn {
    createCompany: (company: ICompanyRequest) => Promise<ICompanyResponse | void>;
    getCompany: () => Promise<ICompanyResponse | void>;
    updateCompanyName: (name: string) => void;
    updateCompanyDescription: (description: string) => void;
    addCompanyWord: (word: string) => void;
    removeCompanyWord: (word: string) => void;
    company: ICompanyResponse;
    loading: boolean;
    error: string;
  }
  // Notification



// User

