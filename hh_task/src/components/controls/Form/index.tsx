import { CSSObject } from '@emotion/core';
import React, { ReactNode } from 'react';
import { useForm, FieldValues, UseFormProps, DefaultValues, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AnyObjectSchema } from 'yup';
import FormField from './Field';

export interface FormProps<T extends FieldValues>
    extends Omit<UseFormProps<T>, 'children'>,
        Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'ref' | 'onReset' | 'children' | 'onChange'> {
    initialValues: DefaultValues<T>;
    validationSchema?: AnyObjectSchema;
    onSubmit?: any;
    children?: ReactNode;
    handleSubmit?: any;
    register?: any;
    css?: CSSObject;
}

const Form = <T extends FieldValues>({
    initialValues,
    validationSchema,
    onSubmit,
    handleSubmit,
    children,
    mode,
    css,
    ...props
}: FormProps<T>) => {
    const methods = useForm({
        defaultValues: initialValues,
        mode,
        ...(validationSchema && { resolver: yupResolver(validationSchema) }),
        ...props,
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} css={css} {...props}>
                {children}
            </form>
        </FormProvider>
    );
};

Form.Field = FormField;

export default Form;
