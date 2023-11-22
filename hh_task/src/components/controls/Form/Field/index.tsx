import { Input } from '@components/controls/Input';
import React, { cloneElement, isValidElement } from 'react';
import { useFormContext } from 'react-hook-form';
import { FieldProps } from './types';

const FormField = React.forwardRef<HTMLInputElement, FieldProps>(({ name, children, size = 'md', ...props }) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <div css={{ width: '100%' }}>
            {children ? (
                <>
                    {React.Children.map(children, child => {
                        if (isValidElement<any>(child)) {
                            const formProps: FieldProps = {
                                size,
                                error: errors[name]?.message,
                                ...props,
                                ...register(name),
                                name,
                            };
                            return cloneElement(child, { ...formProps });
                        }
                    })}
                </>
            ) : (
                <Input error={errors[name]?.message} id={name} {...register(name)} name={name} {...props} />
            )}
        </div>
    );
});

FormField.displayName = 'FormField';

export default FormField;
