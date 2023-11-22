import { CSSObject } from '@emotion/core';
import { EnumLike, useThemeCSS } from '@greensight/gds';
import { Ref, forwardRef, useMemo } from 'react';
import { InputBaseProps, InputStateFull, InputTheme } from './types';
import { Variants, Sizes } from './enums';
import { INPUT_THEMES } from './themes/basic';

export const BaseInput = <V extends EnumLike, S extends EnumLike>({
    id,
    children,
    size = 'md',
    theme,
    variant,
    label = '',
    placeholder = '',
    name = '',
    textArea = false,
    error,
    ...props
}: InputBaseProps<V, S>) => {
    const hasChildren = !!children;
    const showError = !!error;

    const state = useMemo<InputStateFull<V, S>>(
        () => ({
            hasChildren,
            size,
            variant,
            label,
            placeholder,
            textArea,
        }),
        [hasChildren, size, variant, label, placeholder, textArea]
    );

    if (!theme) {
        throw new Error('[Input] theme is required');
    }

    const { input: totalCSS, inputBlock: inputBlockCSS, error: errorCSS, label: labelCSS } = useThemeCSS(theme!, state);

    return (
        <div css={inputBlockCSS as CSSObject}>
            <label css={labelCSS as CSSObject} htmlFor={name}>
                {label}
            </label>
            {textArea ? (
                <textarea id={id} css={totalCSS as CSSObject} placeholder={placeholder} name={name} {...props} />
            ) : (
                <input css={totalCSS as CSSObject} placeholder={placeholder} name={name} {...props} />
            )}
            {showError && <span css={errorCSS as CSSObject}>{error}</span>}
        </div>
    );
};

const InputRef = forwardRef(BaseInput) as typeof BaseInput;

export const createInputWithTheme = <V extends EnumLike, S extends EnumLike>(
    defaultTheme: InputTheme<V, S>,
    defaultVariant: V | keyof V,
    defaultSize: S | keyof S
) => {
    type InputReturn = ReturnType<typeof InputRef>;

    const renderThemedInput = ((
        { theme = defaultTheme, variant = defaultVariant, size = defaultSize, ...props },
        ref: Ref<HTMLInputElement>
    ) => <InputRef theme={theme} variant={variant} size={size} {...props} />) as (
        props: InputBaseProps<V, S>,
        ref: Ref<HTMLInputElement>
    ) => InputReturn;
    (renderThemedInput as any).displayName = 'Input';

    return forwardRef(renderThemedInput) as typeof renderThemedInput;
};

export const Input = createInputWithTheme<typeof Variants, typeof Sizes>(
    INPUT_THEMES.basic,
    Variants.primary,
    Sizes.md
);
