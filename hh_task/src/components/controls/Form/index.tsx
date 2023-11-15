import React, { FC, HTMLProps, ReactNode, SyntheticEvent, useCallback, useMemo, useRef } from 'react';
import { DefaultValues, FieldValues, UseFormReturn, useForm } from 'react-hook-form';
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
    onSubmit: (values: T, formProps: UseFormReturn<T, any>) => void | Promise<any>;
    children?: ReactNode | ReactNode[] | ((props: any) => ReactNode | ReactNode[]);
}

export interface FormFieldProps<T> {
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
    children: childrenProp,
    ...props
}: FormProps<T> & Partial<FormCompositionProps>) => {
    const form = useForm<T>({
        defaultValues: initialValues,
        resolver: validationSchema,
        onSubmit,
        ...props,
    });

    const children: typeof childrenProp = useMemo(
        () => (typeof childrenProp === 'function' ? childrenProp({ ...form }) : childrenProp),
        [childrenProp, form]
    );

    const formHandlerRef = useRef<any>();
    formHandlerRef.current = form.handleSubmit(onSubmit);

    const onSubmitHandler = useCallback((event: SyntheticEvent) => {
        event.stopPropagation();
        if (formHandlerRef.current) formHandlerRef.current(event);
    }, []);

    return <form onSubmit={onSubmitHandler}>{children}</form>;
};

Form.Field = Field;

export default Form;
