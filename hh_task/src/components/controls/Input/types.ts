import { CSSObject } from '@emotion/core';
import { BaseThemeState, EnumLike, StyleDefinition } from '@greensight/gds';
import { ReactNode } from 'react';

export interface InputState {
    focus: boolean;
    textArea: boolean;
    meta?: any;
    field?: any;
    helpers?: any;
}

export type InputStateFull<V extends EnumLike, S extends EnumLike> = BaseThemeState<V, S> & InputState;

export interface InputTheme<V extends EnumLike, S extends EnumLike> {
    label: StyleDefinition<InputStateFull<V, S>>;
    error: StyleDefinition<InputStateFull<V, S>>;
    input: StyleDefinition<InputStateFull<V, S>>;
    inputBlock: StyleDefinition<InputStateFull<V, S>>;
}

export interface InputBaseProps<V extends EnumLike, S extends EnumLike>
    extends Partial<BaseThemeState<V, S, InputTheme<V, S>>>,
        Partial<InputState> {
    value?: string;
    children?: ReactNode;
    block?: boolean;
    label?: string;
    name?: string;
    placeholder?: string;
    error?: ReactNode | boolean;
    showError?: boolean;
    type?: 'number' | 'email' | 'tel' | 'text';
    field?: any;
    meta?: any;
    helpers?: any;
    css?: CSSObject;
}
