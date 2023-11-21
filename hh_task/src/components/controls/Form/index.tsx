import React, { ReactNode, SyntheticEvent, useCallback, useMemo, useRef } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, UseFormReturn, FieldValues, UseFormProps, DefaultValues, FormProvider } from 'react-hook-form';
import { CSSObject } from '@emotion/core';
import { AnyObjectSchema } from 'yup';
import FormField from './Field';
import { FormContext } from './useForm';

export interface FormProps<T extends FieldValues>
    extends Omit<UseFormProps<T>, 'children'>,
        Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'ref' | 'onReset' | 'children' | 'onChange'> {
    initialValues: DefaultValues<T>;
    validationSchema?: AnyObjectSchema;
    onSubmit: (values: T, formProps?: UseFormReturn<T>) => void | Promise<any>;
    onChange?: (
        values: T,
        formProps: UseFormReturn<T, any>,
        exactChange: { [name: string]: any }
    ) => void | Promise<any>;

    onReset?: (values: T, formProps: UseFormReturn<T>) => void | Promise<any>;
    children?: ReactNode | ((props: UseFormReturn<T>) => ReactNode);
    isForm?: boolean;
    css?: CSSObject;
}

export interface FieldProps<T> {
    field?: {
        value: T;
        onChange: (
            eventOrValue:
                | {
                      target: {
                          value: T;
                      };
                  }
                | T
        ) => void;
    };
    meta?: {
        error?: string;
    };
    helpers?: { setValue: (value: T) => void };
}

const Form = <T extends FieldValues>({
    initialValues,
    validationSchema,
    onSubmit,
    onReset,
    onChange,
    isForm = true,
    children: childrenProp,
    mode = 'all',
    css,
    ...props
}: FormProps<T>) => {
    const form = useForm({
        defaultValues: initialValues,
        mode,
        ...(validationSchema && { resolver: yupResolver(validationSchema) }),
        ...props,
    });

    const reset: typeof form.reset = useCallback(
        (newValues, keepStateOptions) => {
            form.reset(newValues, keepStateOptions);
            const values = form.getValues();
            if (onReset) onReset(values, form);
        },
        [form, onReset]
    );

    const formHandlerRef = useRef<any>();
    formHandlerRef.current = form.handleSubmit(v => onSubmit(v, form));

    const onSubmitHandler = useCallback((event: SyntheticEvent) => {
        event.stopPropagation();
        if (formHandlerRef.current) formHandlerRef.current(event);
    }, []);

    const onChangeHandler = useCallback(
        (key: string, value: any) => {
            if (onChange) onChange(form.getValues(), form, { [key]: value });
        },
        [form, onChange]
    );

    const children: typeof childrenProp = useMemo(
        () => (typeof childrenProp === 'function' ? childrenProp({ ...form }) : childrenProp),
        [childrenProp, form]
    );

    const providerValue = useMemo(
        () => ({ onChange: onChangeHandler, onSubmitHandler }),
        [onChangeHandler, onSubmitHandler]
    );

    return (
        <FormProvider {...form} reset={reset}>
            <FormContext.Provider value={providerValue}>
                {isForm ? (
                    <form onSubmit={onSubmitHandler} css={css}>
                        {children}
                    </form>
                ) : (
                    <div css={css}>{children}</div>
                )}
            </FormContext.Provider>
        </FormProvider>
    );
};

Form.Field = FormField;

export default Form;
