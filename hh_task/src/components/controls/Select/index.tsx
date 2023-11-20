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
        isDisabled = true,
        handleClick,
        utils,
        meta,
    }: SelectBaseProps<EnumLike, EnumLike>,
    ref: Ref<HTMLSelectElement>
) => {
    const state = useMemo<SelectStateFull<EnumLike, EnumLike>>(
        () => ({
            isOpen,
            isDisabled,
            size,
            variant,
            label,
        }),
        [isOpen, isDisabled, size, variant, label]
    );

    if (!theme) {
        throw new Error('[Select] theme is required');
    }

    const {
        select: totalCSS,
        arrowButton: iconCSS,
        option: optionCSS,
        optionsList: optionsListCSS,
        label: labelCSS,
        selectContainer: selectContainerCSS,
        disabledSelect: disabledSelectCSS,
    } = useThemeCSS(theme!, state);

    const handleItemClick = (item: string) => {
        if (utils && utils.setValue) {
            utils.setValue(item);
        }
    };

    return (
        <div css={selectContainerCSS as CSSProperties} onClick={handleClick}>
            <span css={labelCSS as CSSProperties}>{label}</span>
            <div css={meta?.value ? (totalCSS as CSSObject) : (disabledSelectCSS as CSSObject)}>
                {meta?.value || 'Not selected'}
                {Icon && <Icon css={iconCSS as CSSProperties} />}
            </div>
            <ul css={optionsListCSS as CSSProperties}>
                {[...optionsList].map((item, i) => (
                    <li key={i} css={optionCSS as CSSProperties} onClick={() => handleItemClick(item)}>
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
    )) as (props: SelectBaseProps<V, S>, ref: Ref<HTMLSelectElement>) => SelectReturn;
    (ThemedSelect as any).displayName = 'Select';

    return forwardRef(ThemedSelect) as typeof ThemedSelect;
};

export const Select = createSelectWithTheme<typeof Variants, typeof Sizes>(
    SELECT_THEMES.basic,
    Variants.primary,
    Sizes.md
);
