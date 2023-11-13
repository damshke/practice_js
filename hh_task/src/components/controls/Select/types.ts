import { BaseThemeState, EnumLike, StyleDefinition } from '@greensight/gds/types/src';

export interface SelectState {
    focus: boolean;
    disabled: boolean;
}

export type SelectStateFull<V extends EnumLike, S extends EnumLike> = BaseThemeState<V, S> & SelectState;

export interface SelectTheme<V extends EnumLike, S extends EnumLike> {
    label: StyleDefinition<SelectStateFull<V, S>>;
    error: StyleDefinition<SelectStateFull<V, S>>;
}
