import React, { CSSProperties, Ref, forwardRef, useMemo } from 'react';
import { EnumLike, useThemeCSS } from '@scripts/gds';
import { Option } from '@views/Filters/types';
import { SelectBaseProps, SelectStateFull, SelectTheme } from './types';
import { Sizes, Variants } from './enums';
import { SELECT_THEMES } from './themes/basic';

export const BaseSelect = <V extends EnumLike, S extends EnumLike>(
    {
        theme,
        size,
        name,
        variant,
        Icon,
        label,
        optionsList = [],
        isOpen = false,
        handleClick,
        register,
        ...props
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
        arrowButton: iconCSS,
        option: optionCSS,
        label: labelCSS,
        optionsList: optionsGroupCSS,
        selectContainer: selectContainerCSS,
    } = useThemeCSS(theme!, state);
    return (
        <div css={selectContainerCSS as CSSProperties} onClick={handleClick} ref={ref}>
            <span css={labelCSS as CSSProperties}>{label}</span>
            <select css={totalCSS} {...register(name)} {...props}>
                {Icon && <Icon css={iconCSS as CSSProperties} />}
                {optionsList.map((value: Option) => (
                    <option css={optionCSS} key={value.id} value={value.name}>
                        {value.name}
                    </option>
                ))}
            </select>
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
    )) as (props: SelectBaseProps<V, S>, ref: Ref<HTMLDivElement>) => SelectReturn;
    (ThemedSelect as any).displayName = 'Select';

    return forwardRef(ThemedSelect) as typeof ThemedSelect;
};

export const Select = createSelectWithTheme<typeof Variants, typeof Sizes>(
    SELECT_THEMES.basic,
    Variants.primary,
    Sizes.md
);
