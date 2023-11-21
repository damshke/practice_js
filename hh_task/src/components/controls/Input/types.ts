import { CSSObject } from '@emotion/core';
import { ChangeEvent, MouseEvent, ReactNode, Ref } from 'react';

import { BaseThemeState, EnumLike, StyleDefinition } from '@greensight/gds';

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
    name?: string;
    placeholder?: string;
    defaultValue?: string;
    block?: boolean;
    error?: ReactNode | boolean;
    showError?: boolean;
    hint?: ReactNode;
    label?: ReactNode;
    type?: 'number' | 'card' | 'email' | 'money' | 'password' | 'tel' | 'text' | 'time' | 'color' | 'url';
    wrapperRef?: Ref<HTMLDivElement>;
    children?: ReactNode;
    onChange?: (event: ChangeEvent<HTMLInputElement>, payload: { value: string }) => void;
    onClear?: (event: MouseEvent<HTMLButtonElement>) => void;
    onClick?: (event: MouseEvent<HTMLDivElement>) => void;
    css?: CSSObject;
    field?: any;
    meta?: any;
    helpers?: any;
}
