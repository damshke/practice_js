import React, { FC, HTMLProps, ReactNode, SyntheticEvent, useCallback, useMemo, useRef } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, UseFormReturn, FieldValues, DefaultValues } from 'react-hook-form';
import { CSSObject } from '@emotion/core';
import { AnyObjectSchema } from 'yup';

import Field from './Field';
import { FieldProps } from './Field/types';

export interface FormCompositionProps {
    Field: FC<FieldProps>;
}

export interface FormProps<T extends FieldValues>
    extends Omit<HTMLProps<HTMLFormElement>, 'onSubmit' | 'children' | 'onChange'> {
    initialValues: DefaultValues<T>;
    validationSchema?: AnyObjectSchema;
    onSubmit: (values: T, formProps?: UseFormReturn<T, any>) => void | Promise<any>;
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
    const form = useForm<T>({
        defaultValues: initialValues,
        ...(validationSchema && { resolver: yupResolver(validationSchema) }),
        ...props,
    });

    const onSubmitHandler = useCallback(
        (data: T, event: SyntheticEvent) => {
            onSubmit(data);
            event.stopPropagation();
        },
        [onSubmit]
    );

    const children: typeof childrenProp = useMemo(
        () => (typeof childrenProp === 'function' ? childrenProp({ ...form }) : childrenProp),
        [childrenProp, form]
    );

    return (
        <form onSubmit={onSubmitHandler} css={css} {...props}>
            {children}
        </form>
    );
};

Form.Field = Field;

export default Form;
