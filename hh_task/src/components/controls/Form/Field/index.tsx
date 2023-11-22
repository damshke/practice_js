import { Input } from '@components/controls/Input';
import React, { cloneElement, isValidElement } from 'react';
import { useFormContext } from 'react-hook-form';
import { FieldProps } from './types';

const FormField = React.forwardRef<HTMLInputElement, FieldProps>(({ name, error, children, size = 'md', ...props }) => {
    const { register } = useFormContext();

    return (
        <div css={{ width: '100%' }}>
            {children ? (
                <>
                    {React.Children.map(children, child => {
                        if (isValidElement<any>(child)) {
                            const formProps: FieldProps = {
                                size,
                                error,
                                ...props,
                                ...register(name),
                                name,
                            };
                            return cloneElement(child, { ...formProps });
                        }
                    })}
                </>
            ) : (
                <Input id={name} {...register(name)} name={name} error={error} {...props} />
            )}
        </div>
    );
});

FormField.displayName = 'FormField';

export default FormField;
