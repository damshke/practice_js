import React, { CSSProperties, FC, Ref, forwardRef, useMemo } from 'react';
import { EnumLike, useThemeCSS } from '@scripts/gds';
import { SelectBaseProps, SelectStateFull, SelectTheme } from './types';
import { Sizes, Variants } from './enums';
import { SELECT_THEMES } from './themes/basic';

export const BaseSelect = <V extends EnumLike, S extends EnumLike>(
    {
        theme,
        size,
        variant,
        Icon,
        label,
        optionsList = new Set(),
        isOpen = false,
        handleClick,
        meta,
        helpers,
    }: SelectBaseProps<V, S>,
    ref: Ref<HTMLSelectElement>
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
        arrowButton: iconCSS,
        option: optionCSS,
        label: labelCSS,
        optionsList: optionsGroupCSS,
        selectContainer: selectContainerCSS,
    } = useThemeCSS(theme!, state);

    return (
        <div css={selectContainerCSS as CSSObject} onClick={handleClick}>
            <span css={labelCSS as CSSObject}>{label}</span>
            <div css={totalCSS as CSSObject}>
                {meta?.value || 'Not selected'}
                {Icon && <Icon css={iconCSS as CSSObject} />}
            </div>
            <ul css={optionsGroupCSS as CSSObject}>
                {[...optionsList].map((item, i) => (
                    <li key={i} css={optionCSS as CSSObject} onClick={() => helpers.setValue(item)}>
                        {item}
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
    const ThemedSelect = (({ theme = defaultTheme, variant = defaultVariant, size = defaultSize, ...props }, ref) => (
        <SelectRef theme={theme} variant={variant} size={size} {...props} />
    )) as (props: SelectBaseProps<V, S>, ref: Ref<HTMLButtonElement>) => SelectReturn;
    (ThemedSelect as any).displayName = 'Button';

    return forwardRef(ThemedSelect) as typeof ThemedSelect;
};

export const Select = createSelectWithTheme<typeof Variants, typeof Sizes>(
    SELECT_THEMES.basic,
    Variants.primary,
    Sizes.md
);
