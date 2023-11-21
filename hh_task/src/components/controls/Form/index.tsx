import React, { ReactNode, useCallback, useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, UseFormReturn, FieldValues, SubmitHandler, UseFormProps, DefaultValues } from 'react-hook-form';
import { CSSObject } from '@emotion/core';
import { AnyObjectSchema } from 'yup';
import FormField from './Field';

export interface FormProps<T extends FieldValues>
    extends Omit<UseFormProps<T>, 'children'>,
        Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'ref' | 'onReset' | 'children' | 'onChange'> {
    initialValues: DefaultValues<T>;
    validationSchema?: AnyObjectSchema;
    onSubmit: (values: T, formProps?: UseFormReturn<T>) => void | Promise<any>;
    onReset?: (values: T, formProps: UseFormReturn<T>) => void | Promise<any>;
    children?: ReactNode | ((props: UseFormReturn<T>) => ReactNode);
    css?: CSSObject;
}

const Form = <T extends FieldValues>({
    initialValues,
    validationSchema,
    onSubmit,
    onReset,
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

    const handlerSubmit: SubmitHandler<FieldValues> = data => onSubmit(data);

    const children: typeof childrenProp = useMemo(
        () => (typeof childrenProp === 'function' ? childrenProp({ ...form }) : childrenProp),
        [childrenProp, form]
    );

    return (
        <form onSubmit={form.handleSubmit(handlerSubmit)} css={css} {...props} onReset={reset}>
            {children}
        </form>
    );
};

Form.Field = FormField;

export default Form;
