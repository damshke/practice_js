import { CSSObject } from '@emotion/core';
import { EnumLike, useThemeCSS } from '@greensight/gds';
import { Ref, forwardRef, useMemo } from 'react';
import { InputBaseProps, InputStateFull, InputTheme } from './types';
import { Variants, Sizes } from './enums';
import { INPUT_THEMES } from './themes/basic';

export const BaseInput = <V extends EnumLike, S extends EnumLike>(
    {
        children,
        block = false,
        size,
        theme,
        variant,
        label,
        placeholder,
        css,
        focus = false,
        textArea = false,
    }: InputBaseProps<V, S>,
    ref: Ref<HTMLButtonElement>
) => {
    const hasChildren = !!children;
    const state = useMemo<InputStateFull<V, S>>(
        () => ({
            hasChildren,
            size,
            variant,
            block,
            label,
            placeholder,
            focus,
            textArea,
        }),
        [hasChildren, size, variant, block, label, placeholder, focus, textArea]
    );

    if (!theme) {
        throw new Error('[Input] theme is required');
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { input: totalCSS, inputBlock: inputBlockCSS, error: errorCSS, label: labelCSS } = useThemeCSS(theme!, state);

    return (
        <div css={inputBlockCSS as CSSObject}>
            <label css={labelCSS as CSSObject}>{label}</label>
            <input></input>
            <span css={errorCSS as CSSObject}>{meta.error}</span>
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
        ref
    ) => (
        <InputRef ref={ref} theme={theme as any} variant={variant as any} size={size as any} {...(props as any)} />
    )) as <T extends React.ElementType<any> = 'input'>(
        props: InputBaseProps<V, S>,
        ref: Ref<HTMLButtonElement>
    ) => InputReturn;

    (renderThemedInput as any).displayName = 'Input';

    return forwardRef(renderThemedInput) as typeof renderThemedInput;
};

export const Input = createInputWithTheme<typeof Variants, typeof Sizes>(
    INPUT_THEMES.basic,
    Variants.primary,
    Sizes.md
);
