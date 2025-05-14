export interface PageResponse<T> {
  data?: T[];
  pagesCount: number;
  currentPage: number;
  totalCount: number;
  isLast: boolean;
}

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface IAuthResponse {
  username: string;
  token: string;
}
export interface ICompanyResponse {
  id: string;
  name: string;
  description: string;
  words: string[];
  about: string;
  aboutImage: string;
}
export interface ICompanyRequest {
  name: string;
  description: string;
  words: string[];
  about: string;
  aboutImage: string;
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
  isDark: boolean;
}
export interface ICompanyState {
  company: ICompanyResponse;
  loading: boolean;
  error: string | null;
}
export interface IProjectRequest {
  name: string;
  description: string;
  image: string;
  logo: string;
  images: string[];
  companyId: string;
}

export interface IProjectUpdateRequest {
  name: string;
  description: string;
  image: string;
  images: string[];
  logo: string;
}
export interface IProjectResponse {
  name: string;
  description: string;
  image: string;
  logo: string;
  images: string[];
  companyId: string;
}
export interface IServiceUpdateRequest {
  name: string;
  description: string;
  image: string;
  summary: string;
  benefits: string;
  features: string;
  price: string;
  link: string;
  files: string[];
}
export interface IprojectDto {
  id: string;
  name: string;
  description: string;
  image: string;
  logo: string;
  images: string[];
}
export interface IProject {
  id: string;
  name: string;
  description: string;
  image: string;
  logo: string;
}
export interface IFileResponse {
  fileUrl: string;
}
export interface IServiceRequest {
  name: string;
  description: string;
  image: string;
  files: string[];
  summary: string;
  benefits: string;
  features: string;
  price: string;
  link: string;
  companyId: string;
}
export interface IServiceUpdateRequest {
  name: string;
  description: string;
  image: string;
  files: string[];
  summary: string;
  benefits: string;
  features: string;
  price: string;
  link: string;
}
export interface IService {
  id: string;
  name: string;
  description: string;
  image: string;
  summary: string;
  benefits: string;
  features: string;
  price: string;
  link: string;
}

export interface IServiceDto {
  name: string;
  description: string;
  image: string;
  summary: string;
  benefits: string;
  features: string;
  price: string;
  link: string;
  companyId: string;
}

export interface IPartnerRequest {
  id: string;
  name: string;
  logo: string;
  introduction: string;
  website: string;
}
export interface IPartnersCreateRequest {
  name: string;
  logo: string;
  website: string;
  introduction: string;
  companyId: string;
}
export interface IPartnerUpdateRequest {
  name: string;
  logo: string;
  website: string;
  introduction: string;
}

export interface IPartnerResponse {
  name: string;
  logo: string;
  website: string;
  introduction: string;
}
export interface IPartnerDto {
  name: string;
  logo: string;
  website: string;
  introduction: string;
}
export interface IPartner {
  id: string;
  name: string;
  logo: string;
  website: string;
  introduction: string;
}
export interface IEmployee {
  id: string;
  name: string;
  description: string;
  employeeRole: string;
  employeeImage: string;
  companyId: string;
}
export interface IEmployeeDto {
  name: string;
  description: string;
  employeeRole: string;
  employeeImage: string;
  companyId: string;
}
export interface IPService {
  id: string;
  name: string;
  description: string;
  image: string;
  partnerId: string;
}
export interface IPServiceDto {
  name: string;
  description: string;
  image: string;

  partnerId: string;
}

export interface IPserviceResponse {
  name: string;
  description: string;
  image: string;
}

export interface IFAQ {
  question: string;
  answer: string;
  companyId: string;
}

export interface IFAQUpdateRequest {
  id: string;
  question: string;
  answer: string;
}
export interface IFAQDto {
  question: string;
  answer: string;
}
export interface IUltraMsg {
  phoneNumber: string;

  message: string;
}
