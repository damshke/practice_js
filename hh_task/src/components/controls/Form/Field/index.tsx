import { Input } from '@components/controls/Input';
import React, { cloneElement, isValidElement } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { FieldProps } from './types';

const FormField = React.forwardRef<HTMLInputElement, FieldProps>(({ name, children, size = 'md', ...props }, ref) => {
    const {
        register,
        control,
        setValue,
        formState: { errors },
    } = useFormContext();

    const { field } = useController({
        name,
        control,
    });

    const inputProps = {
        value: field.value,
        name,
        onChange: field.onChange,
        onBlur: field.onBlur,
    };

    return (
        <div css={{ width: '100%' }}>
            {children ? (
                <>
                    {React.Children.map(children, child => {
                        if (isValidElement<any>(child)) {
                            const formProps = {
                                ...child.props,
                                error: errors[name]?.message,
                                ...register(name),
                                onClick: setValue,
                                ...props,
                                size,
                                ref,
                                ...inputProps,
                            };
                            return cloneElement(child, { ...formProps });
                        }
                    })}
                </>
            ) : (
                <Input
                    id={name}
                    {...register(name)}
                    error={errors[name]?.message}
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
