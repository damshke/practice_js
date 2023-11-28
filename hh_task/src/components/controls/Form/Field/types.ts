import { HTMLAttributes, ReactNode } from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

export interface FieldProps extends HTMLAttributes<HTMLInputElement> {
    size?: string;
    name: string;
    label?: string;
    placeholder?: string;
    showError?: boolean;
    error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
    children?: ReactNode | ReactNode[];
    textArea?: boolean;
    handleChange: () => void;
}
