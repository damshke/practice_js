import { CSSObject } from '@emotion/core';
import { HTMLProps } from 'react';

export interface FieldProps extends Omit<HTMLProps<HTMLInputElement>, 'label' | 'size'> {
    name: string;
    css?: CSSObject;
    variant?: 'primary';
    size?: 'sm' | 'md';
    placeholder?: string;
    label?: string;
    error?: string;
    touched?: string;
    textArea?: boolean;
    Icon?: SVGAElement;
    optionsArr?: Set<string>;
    handleClickSelected?: () => void;
}
