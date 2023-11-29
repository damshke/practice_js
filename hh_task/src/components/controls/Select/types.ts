import { BaseThemeState, EnumLike, StyleDefinition } from '@greensight/gds/types/src';
import { SVGRIcon } from '@greensight/gds/types/src/types/Utils';
import { FC, ReactNode } from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';

export type Option = {
    id: string;
    name: string;
};

export interface SelectState {
    isOpen: boolean;
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
    name: string;
    Icon?: SVGRIcon | FC<any>;
    iconRight?: boolean;
    label?: string;
    optionsList?: Option[];
    isOpen?: boolean;
    value?: string;
    handleClick?: () => void;
    onClick?: UseFormSetValue<FieldValues>;
}
