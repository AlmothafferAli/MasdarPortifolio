export interface IButtonProps {
    onClick?: () => void,
    content?: string,
    className?: string,
    type?: "submit" | "reset" | "button",

    
}

export interface IButtonThemeProps {
    className?: string,
    onClick?: () => void,
    children?: React.ReactNode,
}





export interface IProjectCardProps {
    title?: string,
    description?: string,
    image?: string,
    link?: string,
    className?: string,
    children?: React.ReactNode,
    buttonClassName?: string,
    variants?: any,  // Animation variants
    index?: number   // Index for staggered animations
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
  }

export interface IAouth2Props {
    children?: React.ReactNode
    className?: string,
    
}