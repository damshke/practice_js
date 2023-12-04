import { BaseThemeState, EnumLike, StyleDefinition } from '@greensight/gds/types/src';

export interface ButtonState {
    hidden: boolean;
    disabled: boolean;
    hasChildren: boolean;
    block: boolean;
    iconAfter: boolean;
    rounded: boolean;
}

export type ButtonStateFull<V extends EnumLike, S extends EnumLike> = BaseThemeState<V, S> & ButtonState;

export interface ButtonTheme<V extends EnumLike, S extends EnumLike> {
    button: StyleDefinition<ButtonStateFull<V, S>>;
    icon: StyleDefinition<ButtonStateFull<V, S>>;
}
