export interface ILoginRequest {
    username: string;
    password: string;
  }
  
  export interface IAuthResponse {
    username: string;
    token: string;
  }
  export interface IUserResponse {
    id: string;
    name: string;
    username: string;
    imageProfile: string;
  }
  export interface IUserFilter {
    Name?: string;
    PageNumber?: number;
    PageSize?: number; 
  }
  export interface IRegisterRequest {
    name: string;
    username: string;
    password: string;
  }
  export interface IAddImageRequest {
    profileImage: string;
  }
  export interface IHeaderState {
    isToggled: boolean;
    isDark:boolean;
  }
  