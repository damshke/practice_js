import { BaseThemeState, EnumLike, StyleDefinition } from '@greensight/gds/types/src';

export interface InputState {
    focus: boolean;
    testArea: boolean;
}

export type InputStateFull<V extends EnumLike, S extends EnumLike> = BaseThemeState<V, S> & InputState;

export interface InputTheme<V extends EnumLike, S extends EnumLike> {
    label: StyleDefinition<InputStateFull<V, S>>;
    input: StyleDefinition<InputStateFull<V, S>>;
    error: StyleDefinition<InputStateFull<V, S>>;
}
