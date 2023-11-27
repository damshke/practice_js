import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react';

import { BaseThemeState, EnumLike, StyleDefinition } from '@greensight/gds';

export interface InputState {
    textArea: boolean;
}

export type InputStateFull<V extends EnumLike, S extends EnumLike> = BaseThemeState<V, S> &
    InputState &
    Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'size'>;

export interface InputTheme<V extends EnumLike, S extends EnumLike> {
    label: StyleDefinition<InputStateFull<V, S>>;
    error: StyleDefinition<InputStateFull<V, S>>;
    input: StyleDefinition<InputStateFull<V, S>>;
    inputBlock: StyleDefinition<InputStateFull<V, S>>;
}

export interface InputBaseProps<V extends EnumLike, S extends EnumLike>
    extends Partial<BaseThemeState<V, S, InputTheme<V, S>>>,
        Partial<InputState> {
    id: string;
    name?: string;
    placeholder?: string;
    error?: string;
    showError?: boolean;
    label?: ReactNode;
    type?: 'number' | 'card' | 'email' | 'money' | 'password' | 'tel' | 'text' | 'time' | 'color' | 'url';
    children?: ReactNode;
}
