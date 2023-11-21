import { CSSObject } from '@emotion/core';

export interface FieldProps extends Omit<HTMLInputElement, 'label' | 'size'> {
    size?: 'md' | 'sm';
    name: string;
    label?: string;
    css: CSSObject;
    showError?: boolean;
}
