import { CSSObject } from '@emotion/core';
import { Ref, forwardRef, useMemo } from 'react';
import { EnumLike, useThemeCSS } from '@scripts/gds';
import { SelectBaseProps, SelectStateFull, SelectTheme } from './types';
import { Sizes, Variants } from './enums';
import { SELECT_THEMES } from './themes/basic';

export const BaseSelect = <V extends EnumLike, S extends EnumLike>({
    theme,
    size,
    variant,
    Icon,
    label,
    optionsList = new Set(),
    isOpen = false,
    handleClick,
    utils,
}: SelectBaseProps<V, S>) => {
    const state = useMemo<SelectStateFull<V, S>>(
        () => ({
            isOpen,
            size,
            variant,
            label,
        }),
        [isOpen, size, variant, label]
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
    } = useThemeCSS(theme!, state);

    return (
        <div css={selectContainerCSS as CSSObject} onClick={handleClick}>
            <span css={labelCSS as CSSObject}>{label}</span>
            <div css={totalCSS as CSSObject}>
                'Not selected'
                {Icon && <Icon css={iconCSS as CSSObject} />}
            </div>
            <ul css={optionsListCSS as CSSObject}>
                {[...optionsList].map((item, i) => (
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                    <li key={i} css={optionCSS as CSSObject} onClick={() => utils.setValue(item)}>
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
    const ThemedSelect = (({ theme = defaultTheme, variant = defaultVariant, size = defaultSize, ...props }) => (
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
