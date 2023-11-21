import { CSSObject } from '@emotion/core';
import { EnumLike, useThemeCSS } from '@greensight/gds';
import { Ref, forwardRef, useMemo, useState, useCallback, ChangeEvent, useEffect } from 'react';
import { InputBaseProps, InputStateFull, InputTheme } from './types';
import { Variants, Sizes } from './enums';
import { INPUT_THEMES } from './themes/basic';

export const BaseInput = <V extends EnumLike, S extends EnumLike>(
    {
        children,
        block = false,
        size = 'md',
        theme,
        onChange,
        value,
        variant,
        label = '',
        placeholder = '',
        name = '',
        meta,
        helpers,
        field,
        focus = false,
        textArea = false,
        ...props
    }: InputBaseProps<V, S>,
    ref: Ref<HTMLInputElement>
) => {
    const hasChildren = !!children;
    const uncontrolled = value === undefined;

    const [stateValue, setStateValue] = useState('');

    const handleInputChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            if (field && field.onChange) field.onChange(event);
            if (onChange) {
                onChange(event, { value: event.target.value });
            }

            if (uncontrolled) {
                setStateValue(event.target.value);
            }
        },
        [onChange, uncontrolled, field]
    );

    useEffect(() => {
        if (uncontrolled) setStateValue(field?.value);
    }, [field?.value, uncontrolled, setStateValue]);

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
            meta,
            helpers,
            field,
        }),
        [hasChildren, size, variant, block, label, placeholder, focus, textArea, meta, helpers, field]
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
                <textarea
                    css={totalCSS as CSSObject}
                    placeholder={placeholder}
                    id={name}
                    onChange={handleInputChange}
                    name={name}
                    value={uncontrolled ? stateValue : value}
                    {...field}
                    {...meta}
                    {...props}
                />
            ) : (
                <input
                    css={totalCSS as CSSObject}
                    placeholder={placeholder}
                    id={name}
                    onChange={handleInputChange}
                    name={name}
                    value={uncontrolled ? stateValue : value}
                    {...field}
                    {...meta}
                    {...props}
                />
            )}
            <span css={errorCSS as CSSObject}>{meta?.error}</span>
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

    const renderThemedInput = (({ theme = defaultTheme, variant = defaultVariant, size = defaultSize, ...props }) => (
        <InputRef theme={theme} variant={variant} size={size} {...props} />
    )) as (props: InputBaseProps<V, S>, ref: Ref<HTMLInputElement>) => InputReturn;
    (renderThemedInput as any).displayName = 'Input';

    return forwardRef(renderThemedInput) as typeof renderThemedInput;
};

export const Input = createInputWithTheme<typeof Variants, typeof Sizes>(
    INPUT_THEMES.basic,
    Variants.primary,
    Sizes.md
);
