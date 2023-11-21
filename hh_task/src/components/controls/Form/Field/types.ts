import { CSSObject } from '@emotion/core';
import { ReactNode } from 'react';

export interface FieldProps extends Omit<HTMLInputElement, 'label' | 'size'> {
    size?: HTMLInputElement['size'];
    name: string;
    label?: string | ReactNode;
    css?: CSSObject;
    wrapperCSS?: CSSObject;
    showError?: boolean;
}
