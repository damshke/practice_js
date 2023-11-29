import React, { Ref, forwardRef, useMemo } from 'react';
import { EnumLike, useThemeCSS } from '@scripts/gds';
import { Option } from '@views/vacancies/Filters/types';
import { CSSObject } from '@emotion/core';
import { SelectBaseProps, SelectStateFull, SelectTheme } from './types';
import { Sizes, Variants } from './enums';
import { SELECT_THEMES } from './themes/basic';

export const BaseSelect = <V extends EnumLike, S extends EnumLike>(
    {
        theme,
        size = 'md',
        variant,
        label = '',
        name = '',
        onClick,
        optionsList = [],
        Icon,
        isOpen = false,
        handleClick,
        value,
    }: SelectBaseProps<V, S>,
    ref: Ref<HTMLDivElement>
) => {
    const state = useMemo<SelectStateFull<V, S>>(
        () => ({
            size,
            variant,
            label,
            isOpen,
        }),
        [size, variant, label, isOpen]
    );

    if (!theme) {
        throw new Error('[Select] theme is required');
    }
    const {
        select: totalCSS,
        option: optionCSS,
        label: labelCSS,
        selectContainer: selectContainerCSS,
        arrowButton: arrowCSS,
        optionsList: optionsListCSS,
    } = useThemeCSS(theme!, state);

    return (
        <div css={selectContainerCSS as CSSObject} onClick={handleClick} ref={ref}>
            <span css={labelCSS as CSSObject}>{label}</span>
            <div css={totalCSS as CSSObject}>
                {optionsList.find(i => i.id === value)?.name || 'Not selected'}
                {Icon && <Icon css={arrowCSS as CSSObject} />}
            </div>
            <ul css={optionsListCSS as CSSObject}>
                {[...optionsList].map((item: Option) => (
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                    <li
                        key={item.id}
                        css={optionCSS as CSSObject}
                        value={item.id}
                        onClick={() => {
                            if (onClick) onClick(name, item.id);
                        }}
                    >
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const SelectRef = forwardRef(BaseSelect) as typeof BaseSelect;

export const createSelectWithTheme = <V extends EnumLike, S extends EnumLike>(
    defaultTheme: SelectTheme<V, S>,
    defaultVariant: V | keyof V,
    defaultSize: S | keyof S
) => {
    type SelectReturn = ReturnType<typeof SelectRef>;
    const ThemedSelect = (({ theme = defaultTheme, variant = defaultVariant, size = defaultSize, ...props }) => (
        <SelectRef theme={theme} variant={variant} size={size} {...props} />
    )) as (props: SelectBaseProps<V, S>, ref: Ref<HTMLDivElement>) => SelectReturn;
    (ThemedSelect as any).displayName = 'Select';

    return forwardRef(ThemedSelect) as typeof ThemedSelect;
};

export const Select = createSelectWithTheme<typeof Variants, typeof Sizes>(
    SELECT_THEMES.basic,
    Variants.primary,
    Sizes.md
);
