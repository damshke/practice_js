import React, { ReactNode } from 'react';
import { useForm, FieldValues, UseFormProps, DefaultValues, FormProvider, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AnyObjectSchema } from 'yup';
import { SVGRIcon } from '@greensight/gds/types/src/types/Utils';
import { MEDIA_QUERIES, scale } from '@scripts/gds';
import FormField from './Field';
import Button from '../Button';

export interface FormProps<T extends FieldValues>
    extends Omit<UseFormProps<T>, 'children'>,
        Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'ref' | 'onReset' | 'children' | 'onChange'> {
    initialValues: DefaultValues<T>;
    validationSchema?: AnyObjectSchema;
    onSubmit: SubmitHandler<any>;
    children?: ReactNode;
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

    const isDirty = Object.values(methods.watch())[0] ? true : !!Object.values(methods.watch())[1];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { css: _, ...restProps } = props;

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} {...restProps}>
                {React.Children.map(children, child =>
                    child && React.isValidElement(child) && child.props.name
                        ? React.cloneElement(child, {
                              ...child.props,
                              register: methods.register,
                              control: methods.control,
                              key: child.props.name,
                          })
                        : child
                )}
                {isFilters && isDirty && (
                    <Button
                        css={{
                            marginTop: scale(-4),
                            minWidth: '10%',
                            marginLeft: scale(-13),
                            [MEDIA_QUERIES.md]: {
                                flexDirection: 'column',
                            },
                        }}
                        variant="link"
                        Icon={Icon}
                        onClick={() => {
                            methods.reset();
                        }}
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
