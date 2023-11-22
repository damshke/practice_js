import { Input } from '@components/controls/Input';
import React, { cloneElement, isValidElement } from 'react';
import { useFormContext } from 'react-hook-form';
import { FieldProps } from './types';

const FormField = React.forwardRef<HTMLInputElement, FieldProps>(({ name, children, size = 'md', ...props }) => {
    const { register } = useFormContext();

    return (
        <div css={{ width: '100%' }}>
            {children ? (
                <>
                    {React.Children.map(children, child => {
                        if (isValidElement<any>(child)) {
                            const formProps: FieldProps = {
                                size,
                                register,
                                ...props,
                                name,
                            };
                            return cloneElement(child, { ...formProps });
                        }
                    })}
                </>
            ) : (
                <Input {...props} {...register(name)} name={name} />
            )}
        </div>
    );
});

FormField.displayName = 'FormField';

export default FormField;
