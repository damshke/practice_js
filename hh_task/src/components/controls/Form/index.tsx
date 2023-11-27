import { CSSObject } from '@emotion/core';
import React, { ReactNode } from 'react';
import {
    useForm,
    FieldValues,
    UseFormProps,
    DefaultValues,
    FormProvider,
    SubmitHandler,
    UseFormReturn,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AnyObjectSchema } from 'yup';
import { SVGRIcon } from '@greensight/gds/types/src/types/Utils';
import FormField from './Field';
import Button from '../Button';

export interface FormProps<T extends FieldValues>
    extends Omit<UseFormProps<T>, 'children'>,
        Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'ref' | 'onReset' | 'children' | 'onChange'> {
    initialValues: DefaultValues<T>;
    validationSchema?: AnyObjectSchema;
    onSubmit: SubmitHandler<any>;
    children?: ReactNode | ReactNode[] | ((props: UseFormReturn<T, any>) => ReactNode | ReactNode[]);
    isFilters?: boolean;
    Icon?: SVGRIcon;
    resetText?: string;
}

const Form = <T extends FieldValues>({
    initialValues,
    validationSchema,
    onSubmit,
    isFilters = false,
    children,
    resetText,
    Icon,
    mode = 'all',
    ...props
}: FormProps<T>) => {
    const methods = useForm({
        defaultValues: initialValues,
        mode,
        ...(validationSchema && { resolver: yupResolver(validationSchema) }),
    });

    const isDirty = Object.keys(methods.formState.dirtyFields).length > 0;

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} {...props}>
                {children}
                {isFilters && isDirty && (
                    <Button
                        css={{ margin: '0', width: '10%' }}
                        variant="link"
                        Icon={Icon}
                        onClick={() => methods.reset()}
                    >
                        {resetText}
                    </Button>
                )}
            </form>
        </FormProvider>
    );
};

Form.Field = FormField;

export default Form;
