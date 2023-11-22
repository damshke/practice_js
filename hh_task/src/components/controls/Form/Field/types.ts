import { CSSObject } from '@emotion/core';
import { HTMLAttributes, ReactNode } from 'react';

export interface FieldProps extends HTMLAttributes<HTMLInputElement> {
    size?: string;
    name: string;
    label?: string;
    placeholder?: string;
    css?: CSSObject;
    wrapperCSS?: CSSObject;
    showError?: boolean;
    register?: any;
    error?: string;
    children?: ReactNode;
}
