import { IEmployee } from "./Interfaces";

export interface IButtonProps {
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  content?: string;
  className?: string;
  type?: "submit" | "reset" | "button";
  children?: React.ReactNode;
  disabled?: boolean;
}

export interface IButtonThemeProps {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export interface IProjectCardProps {
  title?: string;
  description?: string;
  image?: string;
  logo?: string;
  link?: string;
  className?: string;
  children?: React.ReactNode;
  buttonClassName?: string;
  buttonName?: string;
  icon?: React.ReactNode;
}
export interface IEmployeeCardsProps {
  employee?: IEmployee;
  className?: string;
  children?: React.ReactNode;
  buttonClassName?: string;
  buttonName?: string;
  link?: string;
}

// input props
export interface IInputProps {
  children?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  onfocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  value?: string;
  className?: string;
  required?: boolean;
  name?: string;
  accept?: string;
  multiple?: boolean;
}

export interface IAouth2Props {
  children?: React.ReactNode;
  className?: string;
}
export interface Idecimal {
  children?: React.ReactNode;
  dec?: number;
  className?: string;
}
