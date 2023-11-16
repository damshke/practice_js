import React, { FC, HTMLProps, ReactNode, SyntheticEvent, useCallback } from 'react';
import { useForm, SubmitHandler, UseFormReturn, FieldValues } from 'react-hook-form';
import { CSSObject } from '@emotion/core';
import { AnyObjectSchema } from 'yup';

import Field from './Field';
import { FieldProps } from './Field/types';

export interface FormCompositionProps {
    Field: FC<FieldProps>;
}

export interface FormProps<T extends FieldValues>
    extends Omit<HTMLProps<HTMLFormElement>, 'onSubmit' | 'children' | 'onChange'> {
    initialValues: T;
    validationSchema?: AnyObjectSchema;
    onSubmit: SubmitHandler<T>;
    children?: ReactNode | ReactNode[] | ((props: UseFormReturn<T>) => ReactNode | ReactNode[]);
    css?: CSSObject;
}

const Form = <T extends FieldValues>({
    initialValues,
    validationSchema,
    onSubmit,
    children: childrenProp,
    css,
    ...props
}: FormProps<T> & Partial<FormCompositionProps>) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<T>({
        defaultValues: initialValues,
        resolver: validationSchema,
    });

    const onSubmitHandler = useCallback(
        (data: T, event: SyntheticEvent) => {
            event.preventDefault();
            onSubmit(data);
        },
        [onSubmit]
    );

    const children: ReactNode = typeof childrenProp === 'function' ? childrenProp({ register, errors }) : childrenProp;

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)} css={css} {...props}>
            {children}
        </form>
    );
};

Form.Field = Field;

export default Form;
