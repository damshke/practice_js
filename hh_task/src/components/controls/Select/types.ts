import { CSSObject } from '@emotion/core';
import { BaseThemeState, EnumLike, StyleDefinition } from '@greensight/gds/types/src';
import { SVGRIcon } from '@greensight/gds/types/src/types/Utils';
import { FC, ReactNode } from 'react';

export interface SelectState {
    isOpen: boolean;
    isSearch?: boolean;
    hasSelected?: boolean;
}

export type SelectStateFull<V extends EnumLike, S extends EnumLike> = BaseThemeState<V, S> & SelectState;

export interface SelectTheme<V extends EnumLike, S extends EnumLike> {
    label: StyleDefinition<SelectStateFull<V, S>>;
    optionsList: StyleDefinition<SelectStateFull<V, S>>;
    option: StyleDefinition<SelectStateFull<V, S>>;
    selectContainer: StyleDefinition<SelectStateFull<V, S>>;
    select: StyleDefinition<SelectStateFull<V, S>>;
    arrowButton: StyleDefinition<SelectStateFull<V, S>>;
}

export interface SelectBaseProps<V extends EnumLike, S extends EnumLike>
    extends Partial<BaseThemeState<V, S, SelectTheme<V, S>>>,
        Partial<SelectState> {
    children?: ReactNode;
    block?: boolean;
    Icon?: SVGRIcon | FC<any>;
    iconRight?: boolean;
    css?: CSSObject;
    label?: string;
    optionsList?: Set<string>;
    opened?: boolean;
    meta?: any;
    utils?: any;
    handleClick?: () => void;
}
