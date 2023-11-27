import { Input } from '@components/controls/Input';
import React, { cloneElement, isValidElement } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { FieldProps } from './types';

const FormField = React.forwardRef<HTMLInputElement, FieldProps>(({ name, children, size = 'md', ...props }) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    const { field } = useController({
        name,
        control,
    });

    const inputProps = { value: field.value, name, onChange: field.onChange, onBlur: field.onBlur };

    return (
        <div css={{ width: '100%' }}>
            {children ? (
                <>
                    {React.Children.map(children, child => {
                        if (isValidElement<any>(child)) {
                            const formProps: FieldProps = {
                                error: errors[name]?.message,
                                ...child.props,
                                ...register(name),
                                ...props,
                                size,
                                ...inputProps,
                            };
                            return cloneElement(child, { ...formProps });
                        }
                    })}
                </>
            ) : (
                <Input
                    error={errors[name]?.message}
                    id={name}
                    {...register(name)}
                    {...inputProps}
                    name={name}
                    {...props}
                />
            )}
        </div>
    );
});

FormField.displayName = 'FormField';

export default FormField;
